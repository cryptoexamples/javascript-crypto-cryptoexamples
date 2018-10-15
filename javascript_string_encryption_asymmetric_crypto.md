---
title: JavaScript Asymmetric String Encryption using Nodes native "Crypto" Library
keywords: sample
summary: "Asymmetric String Encryption in JavaScript"
permalink: javascript_asymmetric_string_encryption.html
folder: JavaScript Crypto
references: [
    # Place a list of references used to create and/or understand this example.
    {
        url: "https://nodejs.org/api/crypto.html",
        description: "Node.js Crypto"

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
tags: [JavaScript, Node.js, node-crypto, RSA, Asymmetric, String, Encryption]
---

## Use cases

- All can encrypt a message using the public key, but only the recipient can decrypt it using the private key
- Encrypt a string using the public key and decrypting it using the private key

## node version

- 8.11.2

## JavaScript Version

- ECMAScript 6 and higher
- In order to run this code, one hast to build it with an ECMAScript 6 compiler like Babel. see "installation".

## Installation

- crypto is is a native node module, no installation is required
- [Babel](https://babeljs.io/)
- [Winston logger](https://github.com/winstonjs/winston)
- [keypair](https://github.com/juliangruber/keypair)

## Example Code for JavaScript Asymmetric String Encryption using RSA 3072

```js
{% include_relative src/allinone/ExampleAsymmetricStringEncryption.js %}
```

{% include links.html %}
