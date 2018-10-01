var testee = require("../../src/objectOriented/ExampleAsymmetricStringEncryption.js");

var chai = require("chai"),
  mocha = require("mocha"),
  keypair = require("keypair");

let pair = keypair(2048);
describe("objectOriented ExampleAsymmetricStringEncryption crypto Test runs", function() {
  it("pubEncryptString should return a String", function() {
    chai.should();
    testee.pubEncryptString("test", pair["public"]).should.be.a("string");
  });

  it("privDecryptString should return a String", function() {
    chai.should();
    testee
      .privDecryptString(
        testee.pubEncryptString("test", pair["public"]),
        pair["private"]
      )
      .should.be.a("string");
  });

  it("privDecryptString's return should be equal to original String", function() {
    chai.assert.equal(
      "test",
      testee.privDecryptString(
        testee.pubEncryptString("test", pair["public"]),
        pair["private"]
      )
    );
  });
});
