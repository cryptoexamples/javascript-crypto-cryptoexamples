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

    // create Streams for file reading, encryption and decryption
    let inputFile = fs.createReadStream("./file.txt");
    let encrypt = crypto.createCipheriv("aes-256-gcm", derivedKey, iv);
    let outputFileEnc = fs.createWriteStream("./file.enc.txt");
    let decrypt = crypto.createDecipheriv("aes-256-gcm", derivedKey, iv);
    let outputFile = fs.createWriteStream("./file.dec.txt");

    // start pipe for encryption with an asynchronous control flow
    inputFile.pipe(encrypt).pipe(outputFileEnc);
    // wait for the encrypted file to be written
    outputFileEnc.on("finish", () => {
      let tag = encrypt.getAuthTag();
      let inputFileEnc = fs.createReadStream("./file.enc.txt");
      // start pipe for decryption
      decrypt.setAuthTag(tag);
      inputFileEnc.pipe(decrypt).pipe(outputFile);
    });

    // wait for all files to be written and read input file and output file for
    // comparison
    outputFile.on("finish", () => {
      let input = fs.readFileSync("file.txt");
      let output = fs.readFileSync("file.dec.txt");

      logger.info(
        "Decrypted file content and original file content are the same: %s",
        Buffer.compare(output, input) === 0 ? "yes" : "no"
      );
    });
  } catch (error) {
    logger.error(error.message);
  }
};

demonstrateFileEncryption();

// for unit testing purposes
module.exports = { demonstrateFileEncryption, logger };
