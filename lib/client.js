import axios from "axios";
import { Headers } from "./util/headers.js";
import { Helpers } from "./util/helpers.js";
import { WebSocketClient } from "./util/wsclient.js";

/**
 * Class representing Amino Client
 * @author IlyaDreamix
 */
export class Client {
    api = "https://service.narvii.com/api/v1";
    authStatus = false;

    /** @type {String} */ deviceId;
    /** @type {Helpers} */ helpers;
    /** @type {Headers} */ headers;
    /** @type {Object} */ profile;
    /** @type {Boolean} */ debug;
    /** @type {String} */ sid;
    /** @type {WebSocket} */ ws;

    /**
     * Default library exception
     * @param {String} message Error message
     */
    AminoJSException = class extends Error {
        constructor (message) {
            super(message);
            this.message = message;
            this.name = "AminoJSException";
        }
    }

    /**
     * Create Amino Global user client
     * @param {String} deviceId Client's device ID (can be set automatically)
     * @param {Boolean} [debug = true] Log client's stack messages?
     */
    constructor (deviceId = null, debug = true) {
        this.helpers = new Helpers();
        if (deviceId === null) {
            this.deviceId = this.helpers.getDeviceId();
        } else {
            this.deviceId = deviceId;
        }
        this.debug = debug;
        this.headers = new Headers(this.deviceId);
    }

    /**
     * Set ``this.ws``
     */
    startListeningMessages() {
        this.ws = new WebSocketClient(this).startClientSession();
    }

    /**
     * Login and set ``this.profile``
     * @param {String} email
     * @param {String} password
     * @returns {Object} Bots user profile
     * @throws ``AminoJSException`` - Login
     */
    login(email, password) {
        let data = JSON.stringify({
            "email": email,
            "v": 2,
            "secret": `0 ${password}`,
            "deviceID": this.deviceId,
            "clientType": 100,
            "action": "normal",
            "timestamp": Date.now()
        });
        let headers = this.headers.parseDataHeaders(data);
        return axios.post(
            this.api + "/g/s/auth/login",
            data, {
                headers: headers
            }
        ).then((response) => {
            let data = response.data;
            this.profile = data["userProfile"];
            this.sid = "sid=" + data.sid;
            this.headers = new Headers(this.deviceId, this.sid);
            this.authStatus = true;
            return this.profile;
        }).catch((error) => {
            let data = error.response.data;
            throw this.parseError(data, this.parseErrorMessage("login"));
        });
    }

    /**
     * Get Client's SubClients
     * @param {Number} [start = 0] Where to start
     * @param {Number} [size = 25] Size of total SubClients (25 max)
     * @returns {Object} SubClients
     */
    getSubClients(start = 0, size = 25) {
        return axios.get(
            this.api + `/g/s/community/joined?v=1&start=${start}&size=${size}`, {
                headers: this.headers.parseHeaders()
            }
        ).then((response) => {
            let data = response.data;
            return data["communityList"];
        }).catch((error) => {
            let data = error.response.data;
            throw this.parseError(data, this.parseErrorMessage("getting subclients"));
        });
    }

    /**
     * Get parsed error message
     * @param {String} process Process to parse
     * @returns {String} Parsed error message
     */
    parseErrorMessage(process) {
        return `Error while ${process} is occurred`;
    }

    /**
     * Return parsed ``AminoJSException``
     * @param {Object} response Amino server response
     * @param {String} message Error message
     * @returns ``AminoJSException``
     */
    parseError(response, message) {
        let code = response["api:statuscode"];
        let msg = response["api:message"];
        let duration = response["api:duration"];
        let timestamp = response["api:timestamp"];

        return new this.AminoJSException(
            `${message}.\n    ${msg} (${code})\n    Duration: ${duration}\n    ` +
            `Timestamp: ${timestamp}\n\n    Full data:\n    ${JSON.stringify(response)}\n`
        );
    }
}