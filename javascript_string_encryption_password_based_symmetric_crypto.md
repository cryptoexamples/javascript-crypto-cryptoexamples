---
title: JavaScript Password Based String Encryption using Nodes native "Crypto" Library
keywords: sample
summary: "Password based string encryption in JavaScript"
permalink: javascript_string_encryption_password_based_symmetric.html
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
last_updated: "2018-10-20"
tags: [JavaScript, Node.js, node-crypto, AES, GCM, PBKDF2, Salt, AEAD]
---

## Use cases

- Usable on server side
- Password based encryption of a String
- Previously shared common secret (password)

## node version

- 8.11.2

## JavaScript Version

- ECMAScript 6 and higher

## Installation

- crypto is is a native node module, no installation is required
- [Winston logger](https://github.com/winstonjs/winston)

## Example Code for JavaScript Password Based String Encryption using AES-GCM and PBKDF2

```js
{% include_relative src/allinone/ExampleStringEncryptionPasswordBased.js %}
```

{% include links.html %}
