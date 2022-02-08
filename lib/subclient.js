const axios = require("axios");

class SubClient {
    client;
    comId;
    
    /**
     * Main class for Amino Community user client
     * @param {Client} client Amino Client
     * @param {String} comId Community ID
     * @author IlyaDreamix
     */
    constructor (client, comId) {
        this.client = client;
        this.comId = comId;
    }

    /**
     * Reply to user's message
     * @param {String} chatId ID of the chat to send message
     * @param {String} messageId Message ID to reply to
     * @param {String} content Message to be sent
     * @param {String} messageType Type of the message
     * @returns {Object} Sent message data
     * @throws ``AminoJSException`` - Message sending
     */
    replyTo(chatId, messageId, content, messageType = 0) {
        let data = JSON.stringify({
            type: messageType,
            content: content,
            replyMessageId: messageId,
            timestamp: Date.now()
        });
        let headers = this.client.headers.parseDataHeaders(data);
        let response = axios.post(
            this.client.api + `/x${this.comId}/s/chat/thread/${chatId}/message`,
            data, {
                headers: headers
            }
        ).then((response) => {
            let data = response.data;
            let message = data.message;
            return message;
        }).catch((error) => {
            let data = error.response.data;
            throw this.client.parseError(data, this.client.parseErrorMessage("sending message"));
        });
        return response;
    }
}

module.exports = {
    SubClient
}