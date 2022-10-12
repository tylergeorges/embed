import {WS_URL} from "@lib/env";
import {WebSocketLink} from "@apollo/client/link/ws";

let ls: Storage
try {
  ls = localStorage
} catch (e) {}

const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: ls?.getItem('token') || ''
    }
  }
});

export default wsLink
