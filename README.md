<p align="center">
  <a href="" rel="noopener">
  <img height=auto width=250px src="https://coollogo.net/wp-content/uploads/2021/02/Amino-logo-1.svg" alt="Project logo"></a>
</p>

<h3 align="center">AminoJS</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/bitbucket/issues/lyadrmxhrds/AminoJS)](https://github.com/ilyadrmxhrds/AminoJS/issues)
[![Build](https://img.shields.io/bitbucket/issues/lyadrmxhrds/AminoJS)](https://github.com/ilyadrmxhrds/AminoJS/issues)
[![License](https://img.shields.io/badge/license-GPL-blue)](/LICENSE)

</div>

---

<p align="center">
  Library for access to the Amino API (AminoApps)
  <br> 
</p>

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
client.login("YOUR_EMAIL", "YOUR_PASSWORD");
    .then(() => { // .then() is necessary
        const subClient = new SubClient(client, "COM_ID");
    });
```

## ✍️ Authors <a name = "authors"></a>

- [@ilyadrmxhrds](https://github.com/ilyadrmxhrds) - Idea & Initial work
