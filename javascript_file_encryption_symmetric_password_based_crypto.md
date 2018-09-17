---
title: JavaScript Password based symmetric file encryption using Nodes native "Crypto" Library 
keywords: sample
summary: "Password based symmetric file encryption in JavaScript"
permalink: javascript_file_encryption_symmetric_password_based.html
folder: JavaScript Crypto
references: [
    # Place a list of references used to create and/or understand this example.
    {
        url: "https://nodejs.org/api/crypto.html",
        description: "Node.js Crypto",
        url: "https://nodejs.org/api/stream.html",
        description: "Node.js Stream",
        url: "https://nodejs.org/api/fs.html",
        description: "Node.js filesystem"
       
    }
]
authors: [
    {
        name: "Tobias Hirzel",
        url: ""
    }
]
# List all reviewers that reviewed this version of the example. When the example is updated all old reviews
# must be removed from the list below and the code has to be reviewed again. The complete review process
# is documented in the main repository of CryptoExamples
current_reviews: [

]
# Indicates when this example was last updated/created. Reviews don't change this.
last_updated: "2018-09-017"
tags: [JavaScript, Node.js, node-crypto, AES, GCM, PBKDF2, Salt, AEAD] A
---

## Use cases

- Password based encryption of a file
- Previously shared common secret (password)

## node version

- 8.11.2

## JavaScript Version

- ECMAScript 6 and higher
- In order to run this code, one hast to build it with an ECMAScript 6 compiler like Babel. see "installation".

## Installation

- crypto is is a native node module, no installation is required
- [Babel](https://babeljs.io/)
- [Winston logger](https://github.com/winstonjs/winston)

## Example Code for JavaScript Password based symmetric file encryption using AES-GCM and PBKDF2

```js
{% include_relative src/allinone/crypto/ExampleFileEncryption.js %}
```

{% include links.html %}
