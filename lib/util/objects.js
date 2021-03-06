/** Class for creating objects for sub/client */
export class Objects {
    /** Class for creating an embed content for message */
    EmbedContent = class {
        /**
         * Create EmbedContent object
         * @param {String} title 
         * @param {String} content 
         * @param {String} link 
         */
        constructor(title = null, content = null, link = null) {
            this.title = title;
            this.content = content;
            this.link = link;
        }
    }
}