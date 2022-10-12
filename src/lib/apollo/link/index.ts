import {ApolloLink, split} from '@apollo/client';
import httpLink from './http'
import wsLink from './websocket'
import {RetryLink} from "@apollo/client/link/retry";
import {
  createPersistedQueryLink,
  PersistedQueryLink
} from "@apollo/client/link/persisted-queries";
import {getMainDefinition} from "@apollo/client/utilities";

const DEVELOPMENT = process.env.NODE_ENV === 'development';

const link = ApolloLink.from(
  [
    // apolloLogger,
    new RetryLink({
      attempts: {
        max: 300
      },
      delay: {
        initial: 200
      }
    }),
    // !DEVELOPMENT && createPersistedQueryLink(new Options()),
    split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as any;

        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      httpLink
    )
  ].filter(Boolean)
);

export default link
