import { createClient } from 'urql';
import { getEnvVar } from '../util';

export const client = createClient({
  url: `https://${getEnvVar('CUSTOM_SERVER_ENDPOINT')}/api/graphql`
  // TODO: Pass auth header when auth is implemented on frontend.
});
