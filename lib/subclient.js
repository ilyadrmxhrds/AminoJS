import axios from "axios";

/**
 * Class representing Amino SubClient
 * @author IlyaDreamix
 */
export class SubClient {
    /** @type {Client} */ client;
    /** @type {String} */ comId;

    /**
     * Create Amino Community user client
     * @param {Client} client Amino Client
     * @param {String} comId Community ID
     */
    constructor (client, comId) {
        this.client = client;
        this.comId = comId;
    }

    /**
     * Reply to user's message
     * @deprecated Use ``sendTextMessage()``
     * @param {String} chatId ID of the chat to send message
     * @param {String} messageId Message ID to reply to
     * @param {String} content Message to be sent
     * @param {Number} [messageType = 0] Type of the message
     * @returns {Object} Sent message data
     * @throws ``AminoJSException`` - Reply message sending
     */
    replyTo(chatId, messageId, content, messageType = 0) {
        let data = JSON.stringify({
            type: messageType,
            content: content,
            replyMessageId: messageId,
            timestamp: Date.now()
        });
        let headers = this.client.headers.parseDataHeaders(data);
        return axios.post(
            this.client.api + `/x${this.comId}/s/chat/thread/${chatId}/message`,
            data, {
                headers: headers
            }
        ).then((response) => {
            let data = response.data;
            return data.message;
        }).catch((error) => {
            let data = error.response.data;
            throw this.client.parseError(data, this.client.parseErrorMessage("sending reply message"));
        });
    }

    /**
     * Send audio message
     * @param {String} chatId ID of the chat to send message
     * @param {Buffer} binary Audio file to be sent
     * @returns {Object} Sent message data
     * @throws ``AminoJSException`` - Audio message sending
     */
    sendAudio(chatId, binary) {
        let type = 2;
        let mediaType = 110;
        let b64Encoded = binary.toString("base64");
        let data = JSON.stringify({
            type: type,
            content: null,
            timestamp: Date.now(),
            mediaType: mediaType,
            mediaUploadValue: b64Encoded
        });
        let headers = this.client.headers.parseDataHeaders(data);
        return axios.post(
            this.client.api + `/x${this.comId}/s/chat/thread/${chatId}/message`,
            data, {
                headers: headers
            }
        ).then((response) => {
            let data = response.data;
            return data.message;
        }).catch((error) => {
            let data = error.response.data;
            throw this.client.parseError(data, this.client.parseErrorMessage("sending audio message"));
        });
    }

    /**
     * Send text message
     * @param {String} chatId ID of the chat to send message
     * @param {String} content Content of the message
     * @param {EmbedContent} embed Embed content of the message
     * @param {String} replyTo Reply to message ID
     * @param {Object[]} mentionedArray Users to mention. ``{"uid": mentionId}``
     * @param {Number} [type = 0] Type of the message
     * @returns {Object} Sent message data
     * @throws ``AminoJSException`` - Text message sending
     */
    sendTextMessage(
        chatId,
        content,
        embed = null,
        replyTo = null,
        mentionedArray = null,
        type = 0
    ) {
        let data = {
            type: type,
            content: content,
            timestamp: Date.now()
        }

        if (embed) {
            data.attachedObject = {
                link: embed["link"],
                title: embed["title"],
                content: embed["content"]
            };
        }
        if (replyTo) {
            data.replyMessageId = replyTo;
        }
        if (mentionedArray) {
            data.extensions = { mentionedArray: mentionedArray };
        }

        data = JSON.stringify(data);
        let headers = this.client.headers.parseDataHeaders(data);
        return axios.post(
            this.client.api + `/x${this.comId}/s/chat/thread/${chatId}/message`,
            data, {
                headers: headers
            }
        ).then((response) => {
            let data = response.data;
            return data.message;
        }).catch((error) => {
            let data = error.response.data;
            throw this.client.parseError(data, this.client.parseErrorMessage("sending text message"));
        });
    }

    /**
     * Delete message as admin
     * @param {String} chatId ID of the chat to send message
     * @param {String} messageId ID of the message to be deleted
     * @param {String} reason
     * @returns {Object} Request data
     * @throws ``AminoJSException`` - Deleting message as admin
     */
    deleteMessageAsStaff(chatId, messageId, reason = null) {
        let data = {
            adminOpName: 102,
            timestamp: Date.now()
        }

        if (reason) {
            data.adminOpNote = { content: reason };
        }

        data = JSON.stringify(data);
        let headers = this.client.headers.parseDataHeaders(data);
        return axios.post(
            this.client.api + `/x${this.comId}/s/chat/thread/${chatId}/message/${messageId}/admin`,
            data, {
                headers: headers
            }
        ).then((response) => {
            return response.data;
        }).catch((error) => {
            let data = error.response.data;
            throw this.client.parseError(data, this.client.parseErrorMessage("deleting message (admin)"));
        });
    }

    /**
     * Get chat messages
     * @param {String} chatId ID of the chat
     * @param {Number} start Where to start
     * @param {Number} size Size of total messages (25 max)
     * @returns {Object} Messages list
     * @throws ``AminoJSException`` - Getting messages
     */
    getChatMessages(chatId, start = 0, size = 25) {
        return axios.get(
            this.client.api + `/x${this.comId}/s/chat/thread/${chatId}/message?v=2&pagingType=o&size=${size}&start=${start}`, {
                headers: this.client.headers.parseHeaders()
            }
        ).then((response) => {
            let data = response.data;
            return data["messageList"];
        }).catch((error) => {
            let data = error.response.data;
            throw this.client.parseError(data, this.client.parseErrorMessage("getting chats"));
        });
    }

    /**
     * Get chat members
     * @param {String} chatId ID of the chat
     * @param {Number} start Where to start
     * @param {Number} size Size of total members (25 max)
     * @returns {Object} Members list
     * @throws ``AminoJSException`` - Getting chat members
     */
    getChatMembers(chatId, start = 0, size = 25) {
        return axios.get(
            this.client.api + `/x${this.comId}/s/chat/thread/${chatId}/member?start=${start}&size=${size}&type=default&cv=1.2`, {
                headers: this.client.headers.parseHeaders()
            }
        ).then((response) => {
            let data = response.data;
            return data["memberList"];
        }).catch((error) => {
            let data = error.response.data;
            throw this.client.parseError(data, this.client.parseErrorMessage("getting chat members"));
        });
    }

    /**
     * Get chat members
     * @param {String} chatId ID of the chat
     * @returns {Object} Chat info
     * @throws ``AminoJSException`` - Getting chat info
     */
    getChatInfo(chatId) {
        return axios.get(
            this.client.api + `/x${this.comId}/s/chat/thread/${chatId}`, {
                headers: this.client.headers.parseHeaders()
            }
        ).then((response) => {
            let data = response.data;
            return data["thread"];
        }).catch((error) => {
            let data = error.response.data;
            throw this.client.parseError(data, this.client.parseErrorMessage("getting chat info"));
        });
    }

    /**
     * Delete user from chat
     * @param {String} userId ID of the user
     * @param {String} chatId ID of the chat
     * @param {Boolean} allowRejoin Ban user or not
     * @returns {Object} Request info
     * @throws ``AminoJSException`` - Deleting user from chat
     */
    deleteUserFromChat(userId, chatId, allowRejoin = true) {
        let _ = allowRejoin ? 1 : 0;
        return axios.delete(
            this.client.api + `/x${this.comId}/s/chat/thread/${chatId}/member/${userId}?allowRejoin=${_}`, {
                headers: this.client.headers.parseHeaders()
            }
        ).then((response) => {
            return response.data;
        }).catch((error) => {
            let data = error.response.data;
            throw this.client.parseError(data, this.client.parseErrorMessage("deleting user from chat"));
        });
    }
}