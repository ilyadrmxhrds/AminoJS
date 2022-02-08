<p align="center">
  <a href="" rel="noopener">
  <img height=auto width=250px src="https://coollogo.net/wp-content/uploads/2021/02/Amino-logo-1.svg" alt="Project logo"></a>
</p>

<h3 align="center">AminoJS</h3>
<p align="center">
  Library for access to the Amino API (AminoApps)
  <br> 
</p>
<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/bitbucket/issues/lyadrmxhrds/AminoJS)](https://github.com/ilyadrmxhrds/AminoJS/issues)
[![License](https://img.shields.io/badge/license-GPL-blue)](/LICENSE)

</div>

---

## 📝 Table of Contents

- [About](#about)
- [Usage](#usage)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

This library easily allows you to use [Amino](https://aminoapps.com) API.
Notice that this library is not official AND according to [Narvii's TOS](https://narvii.com/tos.html) it is prohibited. You can get banned if you use this library.
The author is not responsible for the use of AminoJS.

## 🎈 Usage <a name="usage"></a>

Here will be some notes how to use AminoJS.

### Prerequisites

Firstly, you should have up-to-date [Node JS](https://nodejs.org/en/) version. Do not forget to install [NPM manager](https://www.npmjs.com/).

### Installing

After installing Node JS and NPM, you should create your project. Just make a folder for your bot.
For example, we will create folder named "AminoJSBot".
Then you should open your CMD or Terminal and open this folder.

Open terminal and type

```bash
cd PATH_TO_YOUR_FOLDER
```

And then you need to install AminoJS package.

```bash
npm install @ilyadrmx/aminojs
```

NPM manager will download all files that you need.

### Setting bot folder

I recommend that you create a folder named "bot" inside of our "AminoJSBot" folder.
Then, inside of "bot" folder you should create two files:

- main.js
- config.js

So, we have a project structure like this:

```
AminoJSBot
¦    package-lock.json
¦    package.json
¦
+--- bot
¦       config.js
¦       main.js
¦       
L--- node_modules
     ...
```

### Creating simple bot

Firstly, let's login our bot. Open "main.js" file (/AminoJSBot/bot).
Now, let's import AminoJS library.

```js
const { Client, SubClient } = require("@ilyadrmx/aminojs");
```

So, we've imported library and now we need to make an instance of **Client** class.
It allows us to use Amino's global user features.

```js
const client = new Client(null, false); // Don't change if you don't know what is this
client.login("YOUR_EMAIL", "YOUR_PASSWORD"); // Here you should replace text
```

Lines that we've added above allows our bot to login.
Now we should to make an instance of **SubClient** class.
It allows us to use Amino's community user features.

```js
const client = new Client(null, false);
client.login("YOUR_EMAIL", "YOUR_PASSWORD")
    .then(() => { // .then() is necessary
        const subClient = new SubClient(client, "COM_ID");
    });
```

Com ID is an ID that allows you to enter in community. You can easily get a list of communities by this code:

```js
const client = new Client(null, true);
client.login("YOUR_EMAIL", "YOUR_PASSWORD")
    .then(() => {
        client.getSubClients()
            .then((communities) => { // .then() is necessary
                for (let community in communities) {
                    let com = communities[community];
                    console.log(`${com.name}: ${com.ndcId}`);
                }
            });
    });
```

Copy the id of the current community and paste it in "COM_ID" field.
Now, let's create a message listener. You should make a WebSocket listener for amino by using

```js
client.startListeningMessages();
```

But if you don't know how to do it, just get code [here](https://raw.githubusercontent.com/ilyadrmxhrds/ImageStorage/main/config.js).
Paste this code in "config.js" (/AminoJSBot/bot).
Now your "config.js" code structure is

```js
function customSocketListening(client, subClient) {
    client.startListeningMessages();
    client.ws.then((webSocket) => {
        /**
         * It's when everyting works
         */
         webSocket.on(
            "open", () => {
                // ...
            }
        );

        /**
         * It's when client got Amino message
         */
        webSocket.on(
            "message", (message) => {
                // ... 
            }
        );

        /**
         * It's when something does not work and it needs to restart
         */
        webSocket.on(
            // ... 
        );
    });
}
```

We are going to create a bot, that replies user the message after command.
How it will work:

**User:**<br>
/say Hello!

**Bot:**<br>
Reply to: **User**<br>
Hello!

So, we need to take user's text after "/say" word. In JavaScript, we use 

```js
String.substring()
```

Now, let's implement this to our code

```js
// ...

webSocket.on(
    "message", (message) => {
        let data = client.toJson(message).o; // This is necessary
        data = data.chatMessage;
        /**
         * Empty text check
         */
        if (typeof data.content !== "undefined" && data.author.uid !== client.profile.uid) {
            /**
             * Command "/say" check
             */
            if (data.content.toLowerCase().startsWith("/say ")) {
                try {
                    subClient.replyTo(
                        data.threadId,
                        data.messageId,
                        data.content.substring(5)
                    );
                } catch (e) {
                    console.log("Noncritical error. " + e.toString());
                }
            }
        }
    }
);

// ...
```

We created the main logic for our command. Let's add it to **Client**.

```js
const { Client, SubClient } = require("../index");
const customSocketListening = require("./config").customSocketListening; // Import our function above from config file

const client = new Client(null, true);
client.login("YOUR_EMAIL", "YOUR_PASSWORD")
    .then(() => {
        const subClient = new SubClient(client, "COM_ID");
        customSocketListening(client, subClient);
    });
```

And that's all!

## ✍️ Authors <a name = "authors"></a>

- [@ilyadrmxhrds](https://github.com/ilyadrmxhrds) - Idea & Initial work
- [@whoeevee](https://github.com/whoeevee) - Help with some functions
