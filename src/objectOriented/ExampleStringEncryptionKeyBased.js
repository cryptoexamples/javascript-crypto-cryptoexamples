/**
 * An example for synchronous encryption and decryption of a String featuring:
 * - An out of the box working Example
 * - Importable Methods for encryption/decryption
 * - Generation of a random Key
 * - Utf8 Encoding of Strings
 * - Base64 String encoding of byte-Arrays
 */

var crypto = require("crypto"),
  winston = require("winston");

// to enable Logging, having winston logger installed is required
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

/**
 * A method to encrypt a String
 * @param {String} stringToEncrypt The String to encrypt.
 * @param {Buffer} key The key in binary form, which is used for encryption.
 * @param {Buffer} iv The intitalization vector for the block cipher mode
 * @return {String} cryp The encrypted String encoded in base64
 */
const encryptString = (stringToEncrypt, key, iv) => {
  let cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
  let cryp = cipher.update(stringToEncrypt, "utf8", "base64");
  cryp += cipher.final("base64");
  return cryp;
};

/**
 *A method to decrypt a base64 String
 * @param {String} toDecrypt The base64 String representation of a byte array to decrypt.
 * @param {Buffer} key The key in binary form, which is used for decryption.
 * @param {Buffer} iv The intitalization vector for the block cipher mode
 * @return {String} dec The decrypted String
 */
const decryptString = (stringToDecrypt, key, iv) => {
  let decipher = crypto.createDecipheriv("aes-256-ctr", key, iv);
  let dec = decipher.update(stringToDecrypt, "base64", "utf8");
  dec += decipher.final("utf8");
  return dec;
};

// EXAMPLE START
try {
  // the key used for encryption and decryption, assign your key here
  // if none is assigned a random one is generated
  // keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
  let key = null;
  if (key === null) {
    key = crypto.randomBytes(32);
  }
  // create random initialization vector
  let iv = crypto.randomBytes(16);
  // String to make this example work, replace it with the actual String to encrypt/decrypt
  let exampleString = "Secret to the Max";
  // encrypt
  let encrypted = encryptString(exampleString, key, iv);
  // decrypt
  let decrypted = decryptString(encrypted, key, iv);
  logger.info(
    "Decrypted String and original String are the same: %s",
    exampleString.localeCompare(decrypted) === 0 ? "yes" : "no"
  );
} catch (error) {
  logger.error(error.message);
}

// this exports the functions, making them usable in different files by importing them
module.exports = { encryptString, decryptString };
