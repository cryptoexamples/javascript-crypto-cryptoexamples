/**
 * An example for asynchronous encryption and decryption of a String featuring:
 * - An out of the box working Example
 * - Importable Methods for encryption/decryption
 * - Generation of a RSA 2048 bit keypair
 * - Utf8 Encoding of Strings
 * - Base64 String encoding of byte-Arrays
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
// TODO: Problem mit encoding wenn ich Strings als input in die Methoden nehmen Möchte

/**
 * A Method to encrypt a String with a Public key. Note that to decrypt the String,
 * a related private key is necessary.
 * @param {String} stringToEncrypt The String to encrypt.
 * @param {String} publicKey The public key in binary form, which is used for encryption.
 * @return {String} cryp The encrypted String encoded in base64
 */
const pubEncryptString = (stringToEncrypt, publicKey) => {
	let toEncrypt = Buffer.from(stringToEncrypt, "utf8");
	let encrypted = crypto.publicEncrypt(publicKey, toEncrypt);
	let cryp = encrypted.toString("base64");
	return cryp;
};
/**
 * A Method to decrypt a String with a Public key. Note that to decrypt the String,
 * a related private key is necessary.
 * @param {String} stringToDecrypt The base64 representation of a byte array to decrypt.
 * @param {String} privateKey The private key in binary form, which is used for decryption.
 * @return {String} dec The decrypted String
 */
const privDecryptString = (stringToDecrypt, privateKey) => {
	let toDecrypt = Buffer.from(stringToDecrypt, "base64");
	let decrypted = crypto.privateDecrypt(privateKey, toDecrypt);
	let dec = decrypted.toString("utf8");
	return dec;
};

// EXAMPLE START
try {
	// generate keypair, in asynchronous encryption both keys need to be related
	// and cannot be independently generated keys
	// keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
	// TODO: es ist suboptimal eine andere Lib benutzen zu müssen, eine Schwäche von crypto
	let pair = keypair(2048);
	// String to make this example work, replace it with the actual String to encrypt/decrypt
	let exampleString = "Secret to the max";
	// encrypt utf8 string with public key
	let encrypted = pubEncryptString(exampleString, pair["public"]);
	// decrypt base 64 String with private key
	let decrypted = privDecryptString(encrypted, pair["private"]);

	logger.info(
		"Decrypted String and original String are the same: %s",
		exampleString.localeCompare(decrypted) === 0 ? "yes" : "no"
	);
} catch (error) {
	logger.error(error.message);
}

// this exports the functions, making them usable in different files by importing them
module.exports = { pubEncryptString, privDecryptString };
