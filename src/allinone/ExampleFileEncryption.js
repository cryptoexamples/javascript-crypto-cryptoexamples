/**
 * An example for synchronous encryption and decryption of a file
 * with node fileStreams featuring:
 * - an out of the box working Example
 * - generation of a random password
 * - derivation of a key from a password
 * - base64 Encoding of byte arrays
 * - Utf8 Encoding of Plaintext
 * - Logging
 */

var crypto = require("crypto"),
  fs = require("fs"),
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

const demonstrateFileEncryption = () => {
  try {
    // the password used for derviation of a key, assign your password here
    // if none is assigned a random one is generated
    let password = null;
    password === null
      ? (password = crypto.randomBytes(48).toString("utf8"))
      : (password = password);

    // create random salt
    let salt = crypto.randomBytes(128);

    // derive key with password and salt
    let derivedKey = crypto.pbkdf2Sync(password, salt, 10000, 32, "sha256");

    // create random initialization vector
    let iv = crypto.randomBytes(16);

    // create read stream for the input file
    let inputFile = fs.createReadStream("./file.txt");
    // create cipher
    let encrypt = crypto.createCipheriv("aes-256-gcm", derivedKey, iv);
    // create write stream for the encrypted file
    let outputFileEnc = fs.createWriteStream("./file.enc.txt");
    // create decipher
    let decrypt = crypto.createDecipheriv("aes-256-gcm", derivedKey, iv);
    // // create write stream for the decrypted file
    let outputFile = fs.createWriteStream("./file.dec.txt");

    // start pipe for encrypt with an asynchronous control flow
    inputFile.pipe(encrypt).pipe(outputFileEnc);
    // wait for the encrypted file to be written
    outputFileEnc.on("finish", () => {
      let tag = encrypt.getAuthTag();
      // create read stream for the encrypted file
      let inputFileEnc = fs.createReadStream("./file.enc.txt");
      // start pipe for decrypt
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

// run the exampleFunction
demonstrateFileEncryption();
