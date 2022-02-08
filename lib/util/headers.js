const { Helpers } = require("./helpers");

class Headers {
    deviceId;
    sid;

    constructor (deviceId, sid = null) {
        this.deviceId = deviceId;
        this.sid = sid;
    }

    parseDataHeaders(data) {
        let helpers = new Helpers();
        let headers =  {
            "NDC-MSG-SIG": helpers.getSignature(data),
            "NDCDEVICEID": this.deviceId,
            "User-Agent": "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/15.0 Chrome/90.0.4430.210 Mobile Safari/537.36",
            "Content-Type": "application/json"
        }
        if (this.sid !== null) {
            headers["NDCAUTH"] = this.sid;
        }
        return headers;
    }

    parseHeaders() {
        let headers =  {
            "NDCDEVICEID": this.deviceId,
            "User-Agent": "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/15.0 Chrome/90.0.4430.210 Mobile Safari/537.36",
        }
        if (this.sid !== null) {
            headers["NDCAUTH"] = this.sid;
        }
        return headers;
    }
}

module.exports = {
    Headers
}