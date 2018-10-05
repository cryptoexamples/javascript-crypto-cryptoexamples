/**
 * An example for synchronous encryption and decryption of a file
 * with node fileStreams featuring:
 * - an out of the box working Example
 * - generation of a random password
 * - derivation of a key from a password
 * - base64 Encoding of byte arrays
 * - Utf8 Encoding of Plaintext
 * - Logging of exceptions
 */

var crypto = require("crypto"),
  fs = require("fs"),
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

const demonstrateFileEncryption = () => {
  try {
    // the password used for derviation of a key, assign your password here
    // if none is assigned a random one is generated
    let password = null;
    if (password === null) {
      password = crypto.randomBytes(48).toString("utf8");
    }

    // derive key with password and salt
    // keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
    let salt = crypto.randomBytes(128);
    let derivedKey = crypto.pbkdf2Sync(password, salt, 10000, 32, "sha256");

    // create random initialization vector
    let iv = crypto.randomBytes(16);

    // read and ENCRYPT the filecontent and write it to a encrypted file
    let inputFile = fs.readFileSync("file.txt");
    let cipher = crypto.createCipheriv("aes-256-gcm", derivedKey, iv);
    let encrypted = cipher.update(inputFile, "utf8", "base64");
    encrypted += cipher.final("base64");
    let authTag = cipher.getAuthTag();
    fs.writeFileSync("file.enc.txt", Buffer.from(encrypted, "base64"));

    // DECRYPT the filecontent and write it to a decrypted file
    let decipher = crypto.createDecipheriv("aes-256-gcm", derivedKey, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");
    decrypted = Buffer.from(decrypted, "utf8");
    fs.writeFileSync("file.dec.txt", decrypted);

    logger.info(
      "Decrypted file content and original file content are the same: %s",
      Buffer.compare(decrypted, inputFile) === 0 ? "yes" : "no"
    );
  } catch (error) {
    logger.error(error.message);
  }
};

demonstrateFileEncryption();

// for unit testing purposes
module.exports = { demonstrateFileEncryption, logger };
