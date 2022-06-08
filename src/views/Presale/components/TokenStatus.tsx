import styled from 'styled-components'
import { Flex, Text } from '@pancakeswap/uikit'

interface Props {
  title: string
  subtitle: string
}

const PresaleInputContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  padding: 24px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

const PresaleInputHeader: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <PresaleInputContainer>
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column" alignItems="center" width="100%">
          <Text color="white" fontSize="17px" fontWeight="600">
            {title}
          </Text>
          <Text color="textSubtle" fontSize="14px">
            {subtitle}
          </Text>
        </Flex>
      </Flex>
    </PresaleInputContainer>
  )
}

export default PresaleInputHeader
