/**
 * An example for signing of a String featuring:
 * - An out of the box working Example
 * - RSA key generation
 * - sha-512 digest and RSA encryption
 * - Utf8 Encoding of Strings
 * - Base64 String encoding of Signature
 * - Logging of exceptions
 */
var crypto = require("crypto"),
  keypair = require("keypair"),
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

const demonstrateSignature = () => {
  try {
    // replace with your actual String
    let exampleString =
      "Text that should be signed to prevent unknown tampering with its content.";
    // generate a keypair, in asynchronous encryption both keys need to be related
    // and cannot be independently generated keys
    // keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
    // not needed if you already posses public and private key
    var pair = keypair(3072);

    // SIGN String
    var signerObject = crypto.createSign("RSA-SHA512");
    signerObject.update(exampleString);
    var signature = signerObject.sign(
      {
        key: pair["private"],
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: 20
      },
      "base64"
    );

    // VERIFY String
    var verifierObject = crypto.createVerify("RSA-SHA512");
    verifierObject.update(exampleString);
    var verified = verifierObject.verify(
      {
        key: pair["public"],
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: 20
      },
      signature,
      "base64"
    );

    logger.info("is signature ok?: %s", verified);
  } catch (error) {
    logger.error(error.message);
  }
};

demonstrateSignature();

// for unit testing purposes
module.exports = { demonstrateSignature, logger };
