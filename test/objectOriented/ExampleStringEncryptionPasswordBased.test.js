var testee = require("../../src/objectOriented/ExampleStringEncryptionPasswordBased.js");

var chai = require("chai"),
  mocha = require("mocha"),
  crypto = require("crypto");

const testIv = crypto.randomBytes(16);
const testKey = crypto.randomBytes(32);
const testpw = crypto.randomBytes(48);
const testDerivedKey = Buffer.from(testee.deriveKey(testpw, 32), "base64");

describe("objectOriented ExampleStringEncryptionPasswordBased crypto Test runs", function() {
  it("calling encryptString without iv, should throw an error", function() {
    chai
      .expect(() => {
        testee.encryptString("test", testKey);
      })
      .to.throw();
  });

  it("encryptString should return a String", function() {
    chai.should();
    testee.encryptString("test", testKey, testIv).should.be.a("string");
  });

  it("calling decryptString without iv, should throw an error", function() {
    chai
      .expect(() => {
        testee.decryptString("test", testKey);
      })
      .to.throw();
  });

  it("decryptString should retrun a String", function() {
    chai.should();
    testee
      .decryptString("encryptedString", testKey, testIv)
      .should.be.a("string");
  });

  it("decryptString's return should be equal to original String", function() {
    chai.assert.equal(
      "test",
      testee.decryptString(
        testee.encryptString("test", testDerivedKey, testIv),
        testDerivedKey,
        testIv
      )
    );
  });
});
