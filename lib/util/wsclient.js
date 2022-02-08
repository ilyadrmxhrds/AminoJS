const WSClient = require("ws").WebSocket;
const axios = require("axios");
const { Client } = require("../client");

class WebSocketClient {
    url = "wss://ws1.narvii.com";
    urlV2 = "https://aminoapps.com/api/chat/web-socket-url";
    client;
    wsc;

    /**
     * Class for setting Amino WebSocket connection (session)
     * @param {Client} client Amino Client
     * @author IlyaDreamix
     */
    constructor (client) {
        this.client = client;
    }

    /**
     * Start Amino WebSocket session
     * @returns {String} Amino WebSocket connection token
     */
    startClientSession() {
        return this.#getWebSocketURL()
            .then((url) => {
                this.wsc = new WSClient(url);
                return this.wsc;
            });
    }

    /**
     * Get Amino WebSocket connection data (token)
     * @returns {String} Amino WebSocket connection token
     */
    #getWebSocketURL() {
        let response = axios.get(
            this.urlV2, {
                headers: {
                    "NDCDEVICEID": this.client.deviceId,
                    "Cookie": this.client.sid
                }
            }
        ).then((response) => {
            return response.data.result.url;
        });
        return response;
    }
    
    /**
     * Get Amino WebSocket connection data (not token)
     * @deprecated Use ``getWebSocketURL()``
     * @returns {Array} Amino WebSocket connection data
     */
    #getWebSocketData() {
        let data = `${this.client.deviceId}|${Date.now()}`
        let headers = {
            "NDCDEVICEID": this.client.deviceId,
            "NDCAUTH": "sid=" + this.client.sid,
            "NDC-MSG-SIG": this.client.helpers.getSignature(data)
        }
        return [this.url + `${this.url}/?signbody=${data.replace("|", "%7C")}`, headers];
    } 
}

module.exports = {
    WebSocketClient
}