---
title: JavaScript String Signing using Nodes native "Crypto" Library
keywords: sample
summary: "JavaScript based string signing"
permalink: javascript_string_sign.html
folder: JavaScript Crypto
references: [
    # Place a list of references used to create and/or understand this example.
    {
       
        url: "https://nodejs.org/api/crypto.html",
        description: "Node.js Crypto",  
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
last_updated: "2018-09-17"
tags: [JavaScript, Node.js, node-crypto, hash, SHA, SHA-512]
---

## Use cases

- verifying if a string has been changed

## node version

- 8.11.2

## JavaScript Version

- ECMAScript 6
- In order to run this code, one hast to build it with an ECMAScript 6 compiler like Babel. see "installation".

## Installation

- crypto is is a native node module, no installation is required
- [Babel](https://babeljs.io/)
- [Winston logger](https://github.com/winstonjs/winston)
- [keypair](https://github.com/juliangruber/keypair)

## Example Code for JavaScript String Signing using SHA-512, RSA 3072, BASE64 and UTF-8 encoding

```js
{% include_relative src/allinone/crypto/ExampleSignature.js %}
```

{% include links.html %}
