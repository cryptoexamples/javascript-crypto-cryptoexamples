/**
 * An example for synchronous encryption and decryption of a String with password derived key featuring:
 * - An out of the box working Example
 * - Generation of a random password
 * - derivation of a key
 * - Utf8 Encoding of Strings
 * - Base64 String encoding of byte-Arrays
 * - Logging
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

const demonstratePasswordBasedSymmetricEncryption = () => {
  try {
    // replace with your actual String
    let exampleString =
      "Text that is going to be sent over an insecure channel and must be encrypted at all costs!";

    // the password used for derviation of a key, assign your password here
    // if none is assigned a random one is generated
    let password = null;
    password === null
      ? (password = crypto.randomBytes(48).toString("utf8"))
      : (password = password);

    // create random salt
    let salt = crypto.randomBytes(128);

    // derive key with password and salt
    // keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
    let derivedKey = crypto.pbkdf2Sync(password, salt, 10000, 32, "sha256");

    // create random initialization vector
    let iv = crypto.randomBytes(16);

    // encrypt the Text
    let cipher = crypto.createCipheriv("aes-256-gcm", derivedKey, iv);
    let encrypted = cipher.update(exampleString, "utf8", "base64");
    encrypted += cipher.final("base64");
    let authTag = cipher.getAuthTag();

    // decrypt the Text
    let decipher = crypto.createDecipheriv("aes-256-gcm", derivedKey, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");

    logger.info(
      "Decrypted String and original String are the same: %s",
      exampleString.localeCompare(decrypted) === 0 ? "yes" : "no"
    );
  } catch (error) {
    logger.error(error.message);
  }
};

// run the exampleFunction
demonstratePasswordBasedSymmetricEncryption();
