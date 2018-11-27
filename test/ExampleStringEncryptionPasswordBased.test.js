var testee = require("../src/ExampleStringEncryptionPasswordBased.js");

var chai = require("chai"),
  mocha = require("mocha"),
  sinon = require("sinon"),
  sinonChai = require("sinon-chai");

chai.use(sinonChai);

describe("ExampleStringEncryptionPasswordBased allInOne crypto Test runs", function() {
  beforeEach(function() {
    sinon.spy(testee.logger, "info");
  });

  afterEach(function() {
    testee.logger.info.restore();
  });

  it("logger output should confirm that Strings are the same", function() {
    testee.demonstratePasswordBasedSymmetricEncryption();
    chai.assert.include(testee.logger.info.getCall(0).args, "yes");
  });
});
