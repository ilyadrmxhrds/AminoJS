import {WebSocket as WSClient} from "ws";
import axios from "axios";
import {Client} from "../client.js";

/**
 * Class for setting Amino WebSocket connection (session)
 * @author IlyaDreamix
 */
export class WebSocketClient {
    url = "wss://ws1.narvii.com";
    urlV2 = "https://aminoapps.com/api/chat/web-socket-url";

    /** @type {Client} */ client;
    /** @type {WebSocket} */ wsc;

    /**
     * Create WebSocketClient object
     * @param {Client} client Amino Client
     */
    constructor (client) {
        this.client = client;
    }

    /**
     * Start Amino WebSocket session
     * @returns {WebSocket} Amino WebSocket connection
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
     * @returns {Promise} Amino WebSocket connection token
     */
    #getWebSocketURL() {
        return axios.get(
            this.urlV2, {
                headers: {
                    "NDCDEVICEID": this.client.deviceId,
                    "Cookie": this.client.sid
                }
            }
        ).then((response) => {
            return response.data.result.url;
        });
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