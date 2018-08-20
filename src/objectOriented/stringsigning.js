/**
 * An example for signing of a String featuring:
 * - An out of the box working Example
 * - Importable Method/s for signing and verifying
 * - RSA key generation
 * - sha-512 digest and RSA encryption
 * - Utf8 Encoding of Strings
 * - Base64 String encoding of Signature
 */

var crypto = require("crypto"),
	// TODO: eine schwäche von krypto es muss ein besserer keypair generator her
	keypair = require("keypair"),
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
 * A method to create a signature for a String
 * @param {String} privateKey The privateKey for creating the signature
 * @param {String} string The Strings to create a signature for
 * @return {String} signature The signature encoded in base64
 */
const signString = (privateKey, string) => {
	let signerObject = crypto.createSign("RSA-SHA512");
	signerObject.update(string);
	let signature = signerObject.sign(privateKey, "base64");
	return signature;
};

/**
 * A method to verify the signature of a String
 * @param {String} publicKey The publicKey for verifying the signature
 * @param {String} signature The signature encoded in base64
 * @param {String} string The string for which the signature will be verified
 * @return {Boolean} verfied Returns if the String has been tampered with
 */
const verifyString = (publicKey, signature, string) => {
	let verifierObject = crypto.createVerify("RSA-SHA512");
	verifierObject.update(string);
	let verfied = verifierObject.verify(publicKey, signature, "base64");
	return verfied;
};

// EXAMPLE START
try {
	// generate keypair, in asynchronous encryption both keys need to be related
	// and cannot be independently generated keys
	// keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
	let pair = keypair(2048);
	// String to make this example work, replace it with the actual String to encrypt/decrypt
	let exampleString = "secret. So do not tamper with it!";
	// create sign for string
	let signature = signString(pair["private"], exampleString);
	// Verify sign for string
	let verified = verifyString(pair["public"], signature, exampleString);

	logger.info("is signature ok?: %s", verified);
} catch (error) {
	logger.error(error.message);
}

// this exports the function/s, making them usable in different files by importing them
module.exports = { signString, verifyString };
