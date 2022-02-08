const crypto = require("crypto");

/**
 * Class that parses different service data
 * @author IlyaDreamix
 */
class Helpers {
    /**
     * Get randomly generated device ID
     * @returns {String} Device ID
     */
    getDeviceId() {
        let id = crypto.randomBytes(20).toString('binary');
        let hmac = crypto.createHmac(
            "sha1",
            Buffer.from(
                "76b4a156aaccade137b8b1e77b435a81971fbd3e",
                "hex"
            )
        );
        hmac.update(Buffer.from(Buffer.from("32", 'hex') + id, 'binary'));
        return "32" + Buffer.from(id, 'binary').toString('hex') + hmac.digest('hex');
    }

    /**
     * Get Amino SIG for string data
     * @param {String} data Data that needs signature
     * @returns {String} SID for data
     */
    getSignature(data) {
        let hmac = crypto.createHmac(
            "sha1",
            Buffer.from(
                "fbf98eb3a07a9042ee5593b10ce9f3286a69d4e2",
                "hex"
            )
        );
        hmac.update(data);
        return Buffer.from(
            Buffer.from("32", "hex") + hmac.digest('binary'),
            'binary'
        ).toString('base64');
    }
}

module.exports = {
    Helpers
}