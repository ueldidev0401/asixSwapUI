import { useState } from 'react'
import styled from 'styled-components'
import { Button, Text, ArrowDownIcon, Box, Flex } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { AutoColumn } from '../../components/Layout/Column'
import { AutoRow } from '../../components/Layout/Row'
import { Wrapper } from './components/styleds'
import { AppBody } from '../../components/App'
import ConnectWalletButton from '../../components/ConnectWalletButton'
import PresaleInputHeader from './components/PresaleInputHeader'

import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import Page from '../Page'
import { StyledInputCurrencyWrapper } from './styles'

const InputPanel = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  position: relative;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  z-index: 1;
`
const Container = styled.div`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0.75rem 1rem;
`
const StyledInput = styled.input<{ error?: boolean; fontSize?: string; align?: string }>`
  color: ${({ error, theme }) => (error ? theme.colors.failure : theme.colors.text)};
  position: relative;
  width: 100%;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: transparent;
  font-size: 16px;
  text-align: ${({ align }) => align ?? 'right'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }
`
const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

export default function Presale() {
  const maxAmountToken = 500000
  const minAmountToken = 50000
  const OnePointPrice = 0.003

  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()
  const { account } = useActiveWeb3React()

  const [amount_busd, setAmountBUSD] = useState(0)
  const [amount_OnePoint, setAmountOnePoint] = useState(0)
  const handleAmountBUSDChange = (e) => {
    setAmountBUSD(e.target.value)
    const onePointAmount = e.target.value / OnePointPrice
    setAmountOnePoint(Math.round(onePointAmount * 1000) / 1000)
  }
  const handleAmountOnePointChange = (e) => {
    setAmountBUSD(e.target.value * OnePointPrice)
    setAmountOnePoint(e.target.value)
  }
  const handleClickMinButton = () => {
    setAmountOnePoint(minAmountToken)
    setAmountBUSD(minAmountToken * OnePointPrice)
  }
  const handleClickMaxButton = () => {
    setAmountOnePoint(maxAmountToken)
    setAmountBUSD(maxAmountToken * OnePointPrice)
  }

  return (
    <Page>
      <Flex width="100%" justifyContent="center" position="relative">
        <Flex flexDirection="column">
          <StyledInputCurrencyWrapper mt="24px">
            <AppBody>
              <PresaleInputHeader title={t('Presale')} subtitle={t('Buy One Point TOKEN')} />
              <Wrapper id="presale-page">
                {/* BUSD input */}
                <AutoColumn gap="sm">
                  <Box position="relative">
                    <Flex mb="6px" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
                      <Flex alignItems="center" justifyContent="space-between">
                        <img src="/asixplus/busd.png" alt="busd" style={{ width: '24px' }} />
                        <Text id="pair" bold>
                          &nbsp;BUSD
                        </Text>
                      </Flex>
                      <InputPanel style={{ marginTop: '5px' }}>
                        <Container as="label">
                          <LabelRow>
                            <StyledInput
                              value={amount_busd}
                              onChange={handleAmountBUSDChange}
                              title={t('Token Amount')}
                              autoComplete="off"
                              autoCorrect="off"
                              // text-specific options
                              type="text"
                              pattern="^[0-9]*[.,]?[0-9]*$"
                              placeholder="0.0"
                              minLength={1}
                              maxLength={79}
                              spellCheck="false"
                            />
                          </LabelRow>
                          <InputRow selected>
                            <Button onClick={handleClickMinButton} scale="xs" variant="danger">
                              {t('Min').toLocaleUpperCase(locale)}
                            </Button>
                            <Button
                              onClick={handleClickMaxButton}
                              scale="xs"
                              variant="secondary"
                              style={{ marginLeft: '10px' }}
                            >
                              {t('Max').toLocaleUpperCase(locale)}
                            </Button>
                          </InputRow>
                        </Container>
                      </InputPanel>
                    </Flex>
                  </Box>
                </AutoColumn>
                {/* ------------------- */}
                {/* Arrow down Icon */}
                <AutoColumn justify="space-between">
                  <AutoRow justify="center" style={{ padding: '0 1rem' }}>
                    <ArrowDownIcon className="icon-down" color="primary" />
                  </AutoRow>
                </AutoColumn>
                {/* ------------------- */}
                {/* One Point Output */}
                <AutoColumn gap="sm" style={{ marginTop: '20px' }}>
                  <Box position="relative">
                    <Flex mb="6px" flexDirection="column" alignItems="flex-start" justifyContent="space-between">
                      <Flex alignItems="center" justifyContent="space-between">
                        <img src="/asixplus/onepoint.png" alt="onepoint" style={{ width: '24px' }} />
                        <Text id="pair" bold>
                          &nbsp;One Point
                        </Text>
                      </Flex>
                      <InputPanel style={{ marginTop: '5px' }}>
                        <Container as="label">
                          <LabelRow>
                            <StyledInput
                              value={amount_OnePoint}
                              onChange={handleAmountOnePointChange}
                              title={t('Token Amount')}
                              autoComplete="off"
                              autoCorrect="off"
                              // text-specific options
                              type="text"
                              pattern="^[0-9]*[.,]?[0-9]*$"
                              placeholder="0.0"
                              minLength={1}
                              maxLength={79}
                              spellCheck="false"
                            />
                          </LabelRow>
                        </Container>
                      </InputPanel>
                    </Flex>
                  </Box>
                </AutoColumn>
                {/* ------------------- */}
                {/* Buy & Connect Wallet Button */}
                <Box mt="0.25rem">
                  {!account ? (
                    <ConnectWalletButton width="100%" />
                  ) : amount_busd ? (
                    <Button variant="primary" width="100%">
                      {t('Buy')}
                    </Button>
                  ) : (
                    <Text color="textSubtle" width="100%" textAlign="center">
                      {t('Insufficient liquidity for this trade')}.
                    </Text>
                  )}
                </Box>
                {/* --------------------------- */}
              </Wrapper>
            </AppBody>
          </StyledInputCurrencyWrapper>
        </Flex>
      </Flex>
    </Page>
  )
}
