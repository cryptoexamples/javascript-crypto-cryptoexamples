/**
 * This Example shows how to encrypt und decrypt a file with a password derived key and file Streams.
 * The whole Process is asynchronous
 */

var crypto = require("crypto"),
  fs = require("fs"),
  testString = "secret to the max",
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

const encryptFile = (err, derivedKey, iv) => {
  // input file
  let inputFile = fs.createReadStream("./file.txt");
  // encrypt content
  let encrypt = crypto.createCipheriv("aes-256-ctr", derivedKey, iv);
  // write file
  let outputFile = fs.createWriteStream("./file.enc.txt");
  // start pipe
  inputFile.pipe(encrypt).pipe(outputFile);
};

const decryptFile = (err, derivedKey, iv) => {
  // input file
  let inputFile = fs.createReadStream("./file.enc.txt");
  // encrypt content
  let decrypt = crypto.createDecipheriv("aes-256-ctr", derivedKey, iv);
  // write file
  let outputFile = fs.createWriteStream("./file.dec.txt");
  // start pipe
  inputFile.pipe(decrypt).pipe(outputFile);
};

try {
  // the password used for derviation of a key, assign your password here
  // if none is assigned a random one is generated
  let password = null;
  password === null
    ? (password = crypto.randomBytes(48).toString("utf8"))
    : (password = password);

  // create random salt
  let salt = crypto.randomBytes(128);
  //create random key with password and salt
  let key = crypto.pbkdf2Sync(password, salt, 10000, 32, "sha256");
  // create random initialization vector
  let iv = crypto.randomBytes(16);

  // stream file content to a decipher and afterwards to an output file
  decryptFile(err, derivedKey, iv);

  logger.info(
    "Decrypted file content and original file content are the same: %s",
    Buffer.compare(output, input) === 0 ? "yes" : "no"
  );
} catch (error) {
  logger.error(error.message);
}
