import MESSAGES from './Messages.graphql'
import MORE_MESSAGES from './MoreMessages.graphql'
import NEW_MESSAGE from './NewMessage.graphql'
import MESSAGE_UPDATED from './MessageUpdated.graphql'
import MESSAGE_DELETED from './MessageDeleted.graphql'
import MESSAGES_BULK_DELETED from './MessagesBulkDeleted.graphql'

import CHAT_MESSAGES from './ChatMessages.graphql'
import NEW_DIRECT_MESSAGE from './NewDirectMessage.graphql'

export { MESSAGES, MORE_MESSAGES, NEW_MESSAGE, MESSAGE_UPDATED, MESSAGE_DELETED, MESSAGES_BULK_DELETED, CHAT_MESSAGES, NEW_DIRECT_MESSAGE }

export * from './useMessages'
