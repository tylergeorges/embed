import { graphql } from '@graphql/gql';

export const messagesQuery = graphql(`
  query messagesQuery($guild: String!, $channel: String!, $threadId: String, $before: String) {
    channelV2(guild: $guild, id: $channel) {
      id
      ... on TextChannel {
        messageBunch(threadId: $threadId, before: $before) {
          messages {
            ...BaseMessage
          }
        }
      }
      ... on ThreadChannel {
        # This is not currently used but it resolves type issues
        messageBunch(threadId: $threadId, before: $before) {
          messages {
            ...BaseMessage
          }
        }
      }
    }
  }
`);

// TODO: Copy fragments from old codebase for this.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateMessageSubscription = graphql(`
  subscription updateMessageSubscription($guild: String!, $channel: String!, $threadId: String) {
    messageUpdateV2(guild: $guild, channels: [$channel], threadId: $threadId) {
      ...UpdatedMessage
    }
  }
`);

export const newMessageSubscription = graphql(`
  subscription newMessageSubscription($guild: String!, $channel: String!, $threadId: String) {
    messageV2(channels: [$channel], guild: $guild, threadId: $threadId) {
      ...BaseMessage
    }
  }
`);

export const deletedMessageSubscription = graphql(`
  subscription MessageDeleted($guild: String!, $channel: String!, $threadId: String) {
    messageDeleteV2(channels: [$channel], guild: $guild, threadId: $threadId) {
      id
    }
  }
`);
