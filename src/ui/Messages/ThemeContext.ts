import { Message } from '@generated'
import styled from '@lib/emotion'
import { Theme } from '@lib/emotion'

export * from '@lib/emotion'

interface Context extends Theme {
  message: Message
}
export default styled
