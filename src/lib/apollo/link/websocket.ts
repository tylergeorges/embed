import { WebSocketLink } from 'apollo-link-ws'
import {WS_URL} from "@lib/env";
import { authStore } from "@store";

let ls: Storage
try {
  ls = localStorage
} catch (e) {}

const queryParams = new URLSearchParams(location.search)

const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: authStore.token || '',
      settingsGroup: queryParams.get('settings-group') || ''
    }
  }
});

export default wsLink
