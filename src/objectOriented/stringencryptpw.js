/**
 * An example for synchronous encryption and decryption of a String with password derived key featuring:
 * - An out of the box working Example
 * - Importable Methods for encryption/decryption
 * - Generation of a random password
 * - derivation of a key
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
 * A method to derive a key from a password
 * @param {String} password A bytearray in base64 representation.
 * @param {Integer} keyLength The lenght of the derived Key
 * @return {String} derivedKey The derived key  encoded in base64
 */
const deriveKey = (password, keyLength) => {
  let salt = crypto.randomBytes(128);
  //create random key with password and salt
  let derivedKey = crypto
    .pbkdf2Sync(Buffer.from(password, "utf8"), salt, 10000, keyLength, "sha256")
    .toString("base64");

  return derivedKey;
};

/**A method to encrypt a String
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

/**A method to decrypt a base64 byte array
 * @param {String} toDecrypt The base64 representation of a byte array to decrypt.
 * @param {Buffer} key The key in binary form, which is used for decryption.
 * @param {Buffer} iv The intitalization vector for the block cipher mode
 * @return {String} dec The decrypted String
 */
const decryptString = (toDecrypt, key, iv) => {
  let decipher = crypto.createDecipheriv("aes-256-ctr", key, iv);
  let dec = decipher.update(toDecrypt, "base64", "utf8");
  dec += decipher.final("utf8");
  return dec;
};

// EXAMPLE START
try {
  // String to make this example work, replace it with the actual String to encrypt/decrypt
  let exampleString = "Secret to the max";
  // the password used for derviation of a key, assign your password here
  // if none is assigned a random one is generated
  let password = null;
  password === null
    ? (password = crypto.randomBytes(48).toString("utf8"))
    : (password = password);
  // derive key
  // keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
  let key = deriveKey(password, 32);
  // create random initialization vector
  let iv = crypto.randomBytes(16);
  // encrypt the String
  let encrypted = encryptString(exampleString, Buffer.from(key, "base64"), iv);
  // decrypt the String
  let decrypted = decryptString(encrypted, Buffer.from(key, "base64"), iv);

  logger.info(
    "Decrypted String and original String are the same: %s",
    exampleString.localeCompare(decrypted) === 0 ? "yes" : "no"
  );
} catch (error) {
  logger.error(error.message);
}

// this exports the functions, making them usable in different files by importing them
module.exports = { deriveKey, encryptString, decryptString };
