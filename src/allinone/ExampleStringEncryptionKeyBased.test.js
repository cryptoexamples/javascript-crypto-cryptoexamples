/**
 * An example for synchronous encryption and decryption of a String featuring:
 * - An out of the box working Example
 * - Generation of a random Key
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

const demonstrateKeyBasedSymmetricEncryption = () => {
     try {
          // replace with yout actual String
          let exampleString =
               "Text that is going to be sent over an insecure channel and must be encrypted at all costs!";
          // the key used for encryption and decryption, assign your key here
          // if none is assigned a random one is generated
          // keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
          let key = null;
          key === null ? (key = crypto.randomBytes(32)) : (key = key);

          // create random initialization vector
          var iv = crypto.randomBytes(16);

          // encrypt the Text
          var cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
          var encrypted = cipher.update(exampleString, "utf8", "base64");
          encrypted += cipher.final("base64");
          let authTag = cipher.getAuthTag();

          // decrypt the Text
          var decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
          decipher.setAuthTag(authTag);
          var decrypted = decipher.update(encrypted, "base64", "utf8");
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
demonstrateKeyBasedSymmetricEncryption();
