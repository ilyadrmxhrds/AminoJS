import { Client } from "./lib/client.js";
import { SubClient } from "./lib/subclient.js";
import { Headers } from "./lib/util/headers.js";
import { Helpers } from "./lib/util/helpers.js";
import { WebSocketClient } from "./lib/util/wsclient.js";
import { Objects } from "./lib/util/objects.js"

export {
    Client, SubClient, Headers, Helpers, WebSocketClient, Objects
}

/**
 * "dependencies": {
    "axios": "^0.25.0",
    "reconnecting-websocket": "^4.4.0",
    "websocket": "^1.0.34",
    "websocket-reconnect": "^1.0.6",
    "ws": "^8.5.0"
  }
 */