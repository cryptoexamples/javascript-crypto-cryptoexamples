/**
 * An example for asynchronous encryption and decryption of a String featuring:
 * - An out of the box working Example
 * - Generation of a RSA keypair
 * - RSA encryption and decryption of text using OAEP padding
 * - Utf8 Encoding of Strings
 * - base64 Encoding of byte arrays
 * - Logging of exceptions
 */

var crypto = require("crypto"),
  winston = require("winston");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
      handleExceptions: true
    })
  ]
});

const demonstrateKeyBasedAsymmetricEncryption = () => {
  try {
    // replace with your actual String
    var exampleString =
      "Text that is going to be sent over an insecure channel and must be encrypted at all costs!";
    // generate a keypair, in asynchronous encryption both keys need to be related
    // and cannot be independently generated keys
    // keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
    // not needed if you already posses public and private key
    var pair = crypto.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicExponent: 0x10001,
      publicKeyEncoding: {
        type: "spki",
        format: "pem"
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem"
      }
    });
    exampleString = exampleString.toString("utf8");

    // ENCRYPT String
    var toEncrypt = Buffer.from(exampleString, "utf8");
    var encrypted = crypto.publicEncrypt(
      {
        key: pair.publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
      },
      toEncrypt
    );
    encrypted = encrypted.toString("base64");

    // DECRYPT String
    var toDecrypt = Buffer.from(encrypted, "base64");
    var decrypted = crypto.privateDecrypt(
      {
        key: pair.privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
      },
      toDecrypt
    );
    decrypted = decrypted.toString("utf8");

    logger.info(
      "Decrypted String and original String are the same: %s",
      exampleString.localeCompare(decrypted) === 0 ? "yes" : "no"
    );
  } catch (error) {
    logger.error(error.message);
  }
};

// run the exampleFunction
demonstrateKeyBasedAsymmetricEncryption();

// for unit testing purposes
module.exports = { demonstrateKeyBasedAsymmetricEncryption, logger };
