/**
 * An example for signing of a String featuring:
 * - An out of the box working Example
 * - RSA key generation
 * - sha-512 digest and RSA encryption
 * - Utf8 Encoding of Strings
 * - Base64 String encoding of Signature
 * - Logging
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

const demonstrateSignature = () => {
	try {
		// replace with your actual String
		let exampleString =
			"Text that should be signed to prevent unknown tampering with its content.";
		// generate keyPair, in asynchronous encryption both keys need to be related
		// and cannot be independently generated keys
		// keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
		var pair = keypair(3072);
		// sign String
		var signerObject = crypto.createSign("RSA-SHA512");
		signerObject.update(exampleString);
		var signature = signerObject.sign(pair["private"], "base64");
		//verify String
		var verifierObject = crypto.createVerify("RSA-SHA512");
		verifierObject.update(exampleString);
		var verified = verifierObject.verify(
			pair["public"],
			signature,
			"base64"
		);

		logger.info("is signature ok?: %s", verified);
	} catch (error) {
		logger.error(error.message);
	}
};

// run the exampleFunction
demonstrateSignature();
