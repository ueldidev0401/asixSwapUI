import { useState, useEffect } from 'react'
import { Flex } from '@pancakeswap/uikit'
import { Button, Dropdown, Form, Icon, Input, Message, Image } from 'semantic-ui-react'
import { ParaSwap, APIError, Token, Transaction, Address, NetworkID } from 'paraswap'
import { OptimalRate } from 'paraswap-core'
import C3Chart from 'react-c3js'

import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import Page from '../Page'

declare let web3: any

const apiURL = process.env.API_URL || 'https://paraswap.io/api/v1'
const PAIR = { from: 'ETH', to: 'DAI', amount: '1' }
const DEFAULT_ALLOWED_SLIPPAGE = 0.005

interface User {
  address: Address
  network: NetworkID
}

const ParaswapComponent = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [tokens, setTokens] = useState<Token[]>([])
  const [srcAmount, setSrcAmount] = useState<string>('')
  const [priceRoute, setPriceRoute] = useState<OptimalRate>()
  const [user, setUser] = useState<User>({ address: '', network: 56 })
  const [transactionHash, setTransactionHash] = useState<string>('')
  const [payTo, setPayTo] = useState()

  const [tokenFrom, setTokenFrom] = useState<Token>(null)
  const [tokenTo, setTokenTo] = useState<Token>(null)

  const [paraSwap, setParaSwap] = useState<ParaSwap>(null)
  const [provider, setProvider] = useState<Web3>(null)

  const bestRoute = (priceRoute && priceRoute.bestRoute.filter((pr: any) => !!Number(pr.srcAmount))) || []
  const c3Data = { columns: bestRoute.map((br: any) => [br.exchange, br.percent]) || [], type: 'gauge' }

  useEffect(() => {
    if (typeof web3 !== 'undefined') {
      const addresses = web3.currentProvider.enable()
      const { networkVersion } = web3.currentProvider
      setUser({ address: addresses[0], network: networkVersion })

      setParaSwap(new ParaSwap(networkVersion, apiURL))
      setProvider(new Web3(web3.currentProvider))
    } else {
      setParaSwap(new ParaSwap(1, apiURL))
    }

    getTokens().then(() => {
      return getBestPrice(srcAmount)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isValidAddress = (address: string) => {
    return provider.utils.isAddress(address)
  }

  const getDestAmount = () => {
    if (!priceRoute) {
      return ''
    }
    const destAmount = new BigNumber(priceRoute.srcAmount).dividedBy(10 ** tokenTo!.decimals)
    if (destAmount.isNaN()) {
      return ''
    }

    return destAmount.toFixed()
  }

  const getSrcAmount = (value: string) => {
    if (Number.isNaN(Number(value))) {
      return srcAmount
    }
    return value
  }

  const setSrcAmountHandler = (value: string) => {
    const sAmount = getSrcAmount(value)
    setSrcAmount(sAmount)
    setPriceRoute(undefined)
    getBestPrice(sAmount)
  }

  const switched = () => {
    setTokenFrom(tokenTo)
    setTokenTo(tokenFrom)
  }

  const getAllowance = async (token: Token) => {
    try {
      setLoading(true)
      const allowance = await paraSwap!.getAllowance(user!.address, token.address)
      const tokenWithAllowance = new Token(token.address, token.decimals, token.symbol, allowance as any)
      setTokenFrom(tokenWithAllowance)
      setLoading(false)
    } catch (e) {
      setError(e.toString())
      setLoading(false)
    }
  }

  const needsAllowance = () => {
    if (tokenFrom!.symbol === 'ETH') {
      return false
    }
    return new BigNumber(priceRoute!.srcAmount).isGreaterThan(new BigNumber(tokenFrom!.allowance!))
  }

  const updatePair = (fromOrTo: 'from' | 'to', symbol: string) => {
    if (fromOrTo === 'from') {
      if (symbol === tokenTo!.symbol) {
        switched()
      }
      const token_From = tokens.find((t) => t.symbol === symbol)
      setTokenFrom(token_From)
      setPriceRoute(undefined)
      getBestPrice(srcAmount)
      if (symbol.toUpperCase() !== 'ETH') {
        getAllowance(token_From!)
      }
    } else {
      if (symbol === tokenFrom!.symbol) {
        switched()
      }
      setPriceRoute(undefined)
      setTokenTo(tokenTo)
      getBestPrice(srcAmount)
    }
  }

  const onPayToChanged = (e: any) => {
    const payToV = e.target.value
    setPayTo(payToV)
    if (payToV && !isValidAddress(payToV)) {
      setError('Invalid pay address')
    } else {
      setError('')
    }
  }

  const getTokens = async () => {
    try {
      setLoading(true)
      const tokensOrError = await paraSwap!.getTokens()
      if ((tokensOrError as APIError).message) {
        setError((tokensOrError as APIError).message)
        setLoading(false)
        return
      }
      const tokensy: Token[] = tokensOrError as Token[]
      const token_From = tokensy.find((t) => t.symbol === PAIR.from)
      const token_To = tokensy.find((t) => t.symbol === PAIR.to)
      setTokens(tokensy)
      setTokenFrom(token_From)
      setTokenTo(token_To)
      setLoading(false)
    } catch (e) {
      console.error(e)
      setError(e.toString())
      setLoading(false)
    }
  }

  const getBestPrice = async (Amount: string) => {
    try {
      setError('')
      setPriceRoute(undefined)
      const _srcAmount = new BigNumber(Amount).times(10 ** tokenFrom!.decimals)
      if (_srcAmount.isNaN() || _srcAmount.isLessThanOrEqualTo(0)) {
        return
      }
      setLoading(true)
      const priceRouteOrError = await paraSwap!.getRate(tokenFrom!.address, tokenTo!.address, _srcAmount.toFixed(0))
      if ((priceRouteOrError as APIError).message) {
        setError((priceRouteOrError as APIError).message)
        setLoading(false)
      }
      const priceRouter = priceRouteOrError as OptimalRate
      setLoading(false)
      setPriceRoute(priceRouter)
    } catch (e) {
      setError('Price Feed Error')
      setLoading(false)
    }
  }

  const setAllowance = async () => {
    try {
      const amount = new BigNumber(srcAmount).times(10 ** tokenFrom!.decimals).toFixed(0)
      const transactionHashs = await paraSwap!.approveToken(amount, user!.address, tokenFrom!.address, user!.network)
      setTransactionHash(transactionHashs)
    } catch (e) {
      setError(e.toString())
      setLoading(false)
    }
  }

  const swapOrPay = async () => {
    try {
      setLoading(true)
      setError('')
      const _srcAmount = new BigNumber(srcAmount).times(10 ** tokenFrom!.decimals).toFixed(0)
      const minDestinationAmount = new BigNumber(priceRoute!.destAmount).multipliedBy(1 - DEFAULT_ALLOWED_SLIPPAGE)
      const txParams = await paraSwap!.buildTx(
        tokenFrom!.address,
        tokenTo!.address,
        _srcAmount,
        minDestinationAmount.toFixed(),
        priceRoute!,
        user!.address,
        'paraswap demo',
        payTo,
      )
      if ((txParams as APIError).message) {
        setError((txParams as APIError).message)
        setLoading(false)
      }
      await provider.eth.sendTransaction(txParams as Transaction, async (err: any, transactionHashs: string) => {
        if (err) {
          setError(err.toString())
          setLoading(false)
        }
        setTransactionHash(transactionHashs)
      })
      setLoading(false)
    } catch (e: any) {
      setError(e)
      setLoading(false)
      console.error('ERROR', e)
    }
  }

  const options = tokens.map((t: Token) => ({
    key: t.symbol,
    text: t.symbol,
    value: t.symbol,
  }))

  return (
    <Page className="app">
      <Flex width="50%" justifyContent="center" position="relative">
        <Flex flexDirection="column">
          <Image src="asixplus/paraswap.png" alt="paraswap" />
          {error === '' ? (
            <Message negative icon>
              <Icon name="exclamation" />
              <Message.Content>
                <Message.Content>{error}</Message.Content>
              </Message.Content>
            </Message>
          ) : null}
          {user?.address ? (
            <Message info>
              <Message.Header>Connected</Message.Header>
              <Message.Content>{user.address}</Message.Content>
            </Message>
          ) : null}
          {transactionHash ? (
            <Message info>
              <a target="_blank" rel="noopener noreferrer" href={`https://etherscan.io/tx/${transactionHash}`}>
                Track transaction
              </a>
            </Message>
          ) : null}
          <Form>
            <Form.Field>
              <Input
                autoFocus="true"
                onChange={(e: any) => setSrcAmountHandler(e.target.value)}
                value={srcAmount}
                placeholder="Amount"
              />
            </Form.Field>
            <Form.Field>
              <Dropdown
                placeholder="From"
                search
                fluid
                selection
                options={options}
                value={tokenFrom && tokenFrom.symbol}
                onChange={(_: any, data: any) => updatePair('from', data.value)}
              />
            </Form.Field>
            <Form.Field>
              <Dropdown
                placeholder="To"
                search
                fluid
                selection
                options={options}
                value={tokenTo && tokenTo.symbol}
                onChange={(_: any, data: any) => updatePair('to', data.value)}
              />
            </Form.Field>
            <Form.Field>
              <Input value={getDestAmount()} placeholder="Amount" />
            </Form.Field>
            <Form.Field>{priceRoute ? <C3Chart className="distribution-chart" data={c3Data} /> : null}</Form.Field>
            <Form.Field>
              <Input className="pay-to" onChange={onPayToChanged} value={payTo} placeholder="Pay To" />
            </Form.Field>
            <Form.Field>
              <Button loading={loading} onClick={() => getBestPrice(srcAmount)} primary fluid>
                GET RATES
              </Button>
            </Form.Field>
            <Form.Field>
              {tokenFrom && priceRoute && needsAllowance() ? (
                <Button positive disabled={loading || !priceRoute} onClick={() => setAllowance()} primary fluid>
                  APPROVE TOKEN
                </Button>
              ) : (
                <Button positive disabled={loading || !priceRoute} onClick={() => swapOrPay()} primary fluid>
                  {payTo ? 'PAY' : 'SWAP'}
                </Button>
              )}
            </Form.Field>
          </Form>
        </Flex>
      </Flex>
    </Page>
  )
}

export default ParaswapComponent
