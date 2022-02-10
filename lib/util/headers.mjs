import { Helpers } from "./helpers.mjs";

/**
 * Class for parsing headers
 * @author IlyaDreamix
 */
export class Headers {
    deviceId;
    sid;

    /**
     * Create Headers object
     * @param {String} deviceId ID of the device
     * @param {String} sid Session ID
     */
    constructor (deviceId, sid = null) {
        this.deviceId = deviceId;
        this.sid = sid;
    }

    /**
     * Parse headers with data
     * @param {String} data Data to be sent
     * @param {String} type Type of data
     * @returns {Object} Parsed headers
     */
    parseDataHeaders(data, type = "application/json") {
        let helpers = new Helpers();
        let headers =  {
            "NDC-MSG-SIG": helpers.getSignature(data),
            "NDCDEVICEID": this.deviceId,
            "User-Agent": "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/15.0 Chrome/90.0.4430.210 Mobile Safari/537.36",
            "Content-Type": type
        }
        this.sid !== null ? headers["NDCAUTH"] = this.sid : false;
        return headers;
    }

    /**
     * Parse headers without data
     * @returns {Object} Parsed headers
     */
    parseHeaders() {
        let headers =  {
            "NDCDEVICEID": this.deviceId,
            "User-Agent": "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/15.0 Chrome/90.0.4430.210 Mobile Safari/537.36",
        }
        this.sid !== null ? headers["NDCAUTH"] = this.sid : false;
        return headers;
    }
}