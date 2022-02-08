const { Client } = require("./lib/client");
const { SubClient } = require("./lib/subclient");
const { Headers } = require("./lib/util/headers");
const { Helpers } = require("./lib/util/helpers");
const { WebSocketClient } = require("./lib/util/wsclient");

module.exports = {
    Client, SubClient, Headers, Helpers, WebSocketClient
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