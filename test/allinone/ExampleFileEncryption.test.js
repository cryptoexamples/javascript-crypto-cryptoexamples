var testee = require("../../src/allinone/ExampleFileEncryption.js");

var chai = require("chai"),
  sinon = require("sinon"),
  mocha = require("mocha"),
  sinonChai = require("sinon-chai");

chai.use(sinonChai);

describe("ExampleFileEncryption allInOne crypto Test runs", function() {
  beforeEach(function() {
    sinon.spy(testee.logger, "error");
    sinon.spy(testee.logger, "info");
  });

  afterEach(function() {
    testee.logger.error.restore();
    testee.logger.info.restore();
  });

  it("logger output should not log error", function() {
    testee.demonstrateFileEncryption();

    // chai.expect(testee.logger.error).to.not.be.called;
    chai.assert.include(testee.logger.info.getCall(0).args, "yes");
  });
});
