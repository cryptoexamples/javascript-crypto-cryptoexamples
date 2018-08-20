/**
 * An example for hashing of a String featuring:
 * - An out of the box working Example
 * - Importable Method/s for hashing
 * - sha-512 digest
 * - Utf8 Encoding of Strings
 * - Base64 String encoding of digest
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

/**A method to hash a number of Strings
 * @param {Array} stringArray The Strings to hash.
 * @return {String} digest The hashed Strings encoded in base64
 */
const hashStrings = stringArray => {
	//create a hash object
	let hashObject = crypto.createHash("sha512");
	//update the hash object with data as often as required
	for (let i = 0; i < stringArray.length; i++) {
		hashObject.update(stringArray[i]);
	}
	// create the hash values
	let digest = hashObject.digest("base64");
	return digest;
};

// EXAMPLE START
try {
	// example Strings, replace them with your actual used Strings.
	// if theres only one String, use a size one array
	let stringArray = ["test", "test1", "test2", "test3"];
	// hash Strings in the Array
	let digest = hashStrings(stringArray);

	logger.info("Digest of the Strings: %s", digest);
} catch (error) {
	logger.error(error.message);
}

// this exports the function/s, making them usable in different files by importing them
module.exports = { hashStrings };
