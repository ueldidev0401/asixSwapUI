import styled from 'styled-components'
import { Flex, Heading, NotificationDot, Text } from '@pancakeswap/uikit'
import GlobalSettings from 'components/Menu/GlobalSettings'
import { useExpertModeManager } from 'state/user/hooks'

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
  const [expertMode] = useExpertModeManager()

  return (
    <PresaleInputContainer>
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column" alignItems="flex-end" width="100%" mr={75}>
          <Heading as="h2">{title}</Heading>
        </Flex>
        <Flex>
          <NotificationDot show={expertMode}>
            <GlobalSettings color="textSubtle" mr="0" />
          </NotificationDot>
        </Flex>
      </Flex>
      <Flex alignItems="center">
        <Text color="textSubtle" fontSize="14px">
          {subtitle}
        </Text>
      </Flex>
    </PresaleInputContainer>
  )
}

export default PresaleInputHeader
