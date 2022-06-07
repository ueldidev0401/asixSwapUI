import { Currency, Pair, Token } from '@pancakeswap/sdk'
import { Button, Text, Flex, Box } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { isAddress } from 'utils'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCurrencyBalance } from '../../state/wallet/hooks'

import { Input as NumericalInput } from './NumericalInput'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  padding: 0 0.5rem;
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`
const InputPanel = styled.div`
  display: flex;
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
interface PresaleCurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}
export default function PresaleCurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  otherCurrency,
  id,
  showCommonBases,
}: PresaleCurrencyInputPanelProps) {
  const { account, library } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const {
    t,
    currentLanguage: { locale },
  } = useTranslation()

  const token = pair ? pair.liquidityToken : currency instanceof Token ? currency : null
  const tokenAddress = token ? isAddress(token.address) : null

  return (
    <Box position="relative">
      <Flex mb="6px" alignItems="center" justifyContent="space-between">
        <Flex>
          <Flex alignItems="center" justifyContent="space-between">
            {/* BUSD -> ASIXMUSIC */}
            {id && id === 'swap-currency-input' ? (
              <img src="/asixplus/busd.png" alt="busd" style={{ width: '24px' }} />
            ) : (
              <img src="/asixplus/topbar-logo/logo-mobile.png" alt="one point" style={{ width: '24px' }} />
            )}
            {id && id === 'swap-currency-input' ? (
              <Text id="pair" bold>
                &nbsp;BUSD
              </Text>
            ) : (
              <Text id="pair" bold>
                &nbsp;One Point
              </Text>
            )}
            {/* ------------------- */}
          </Flex>
        </Flex>
        {/* {account && (
          <Text onClick={onMax} color="textSubtle" fontSize="14px" style={{ display: 'inline', cursor: 'pointer' }}>
            {!hideBalance && !!currency
              ? t('Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })
              : ' -'}
          </Text>
        )} */}
      </Flex>
      <InputPanel>
        <Container as="label">
          <LabelRow>
            <NumericalInput
              className="token-amount-input"
              value={value}
              onUserInput={(val) => {
                onUserInput(val)
              }}
            />
          </LabelRow>
          <InputRow selected={disableCurrencySelect}>
            {account && currency && showMaxButton && label !== 'To' && (
              <Button onClick={onMax} scale="xs" variant="secondary">
                {t('Max').toLocaleUpperCase(locale)}
              </Button>
            )}
          </InputRow>
        </Container>
      </InputPanel>
    </Box>
  )
}
