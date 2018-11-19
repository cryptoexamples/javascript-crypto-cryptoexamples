/**
 * An example for signing of a String featuring:
 * - An out of the box working Example
 * - Generation of a RSA keypair
 * - Sha-512 digest and RSA encryption of text with PSS
 * - Utf8 Encoding of Strings
 * - base64 Encoding of byte arrays
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
    var exampleString =
      "Text that should be signed to prevent unknown tampering with its content.";
    // generate a keypair, in asynchronous encryption both keys need to be related
    // and cannot be independently generated keys
    // keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
    // not needed if you already posses public and private key
    var pair = keypair(4096);
    exampleString = exampleString.toString("utf8");

    // SIGN String
    var signerObject = crypto.createSign("RSA-SHA512");
    signerObject.update(exampleString);
    var signature = signerObject.sign(
      {
        key: pair["private"],
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: 128
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
        saltLength: 128
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
