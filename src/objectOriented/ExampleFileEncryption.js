/**
 * An example for encrypting and decrypting of a file featuring:
 * - An out of the box working Example
 * - Importable Method/s for encrypt/decrypt
 * - password generation
 * - key derivation
 * - Utf8 Encoding of Strings
 * - Base64 String encoding of byte-Arrays
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

/**
 * A method to encrypt filecontent with a synchronous key and write the encrypted
 * content to an output file. Note that in order to correctly decrypt the file
 * content, the same key and iv (initialization vector) have to be used
 *
 * @param {String} inputPath The Path to the file with the content to encrypt.
 * @param {String} outputPath The Path to the file where the encrypted contet is written to.
 * @param {Buffer} key The key in binary form, which is used for encryption.
 * @param {Buffer} iv The intitalization vector for the block cipher mode
 */
const encryptFile = (inputPath, outputPath, key, iv) => {
  // input file
  var inputFile = fs.readFileSync(inputPath);
  // encrypt content
  var cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
  var encrypted = cipher.update(inputFile, "utf8", "base64");
  encrypted += cipher.final("base64");
  // write file
  fs.writeFileSync(outputPath, Buffer.from(encrypted, "base64"));
  return null;
};

/**
 * A method to decrypt filecontent with a synchronous key and write the decrypted
 * content to an output file. note that in vorder to correctly decrypt the file
 * content, the key and iv (initialization vector)
 * must be the same as the key and iv used with encryption
 *
 * @param {String} inputPath The Path to the file with the content to decrypt.
 * @param {String} outputPath The Path to the file where the decrypted contet is written to.
 * @param {Buffer} key The key in binary form, which is used for encryption.
 * @param {Buffer} iv The intitalization vector for the block cipher mode
 */
const decryptFile = (inputPath, outputPath, key, iv) => {
  // input file
  var inputFile = fs.readFileSync(inputPath);
  // encrypt content
  var decipher = crypto.createDecipheriv("aes-256-ctr", key, iv);
  var decrypted = decipher.update(inputFile, "base64", "utf8");
  decrypted += decipher.final("utf8");
  decrypted = Buffer.from(decrypted, "utf8");
  // write file
  fs.writeFileSync(outputPath, decrypted);
  return null;
};

try {
  // the password used for derviation of a key, assign your password here
  // if none is assigned a random one is generated
  var password = null;
  if (password === null) {
    password = crypto.randomBytes(48).toString("utf8");
  }

  // create random salt
  var salt = crypto.randomBytes(128);
  //create random key with password and salt
  var key = crypto.pbkdf2Sync(password, salt, 10000, 32, "sha256");
  // create random initialization vector
  var iv = crypto.randomBytes(16);

  // start to encrypt/decrypt file content
  encryptFile("file.txt", "file.enc.txt", key, iv);
  decryptFile("file.enc.txt", "file.dec.txt", key, iv);
  var input = fs.readFileSync("file.txt");
  var output = fs.readFileSync("file.dec.txt");
  logger.info(
    "Decrypted file content and original file content are the same: %s",
    Buffer.compare(output, input) === 0 ? "yes" : "no"
  );
} catch (error) {
  logger.error(error.message);
}
