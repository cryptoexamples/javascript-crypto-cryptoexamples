var testee = require("../../src/allinone/ExampleSignature.js");

var chai = require("chai"),
  sinon = require("sinon"),
  mocha = require("mocha"),
  sinonChai = require("sinon-chai");

chai.use(sinonChai);

describe("ExampleSignature allInOne crypto Test runs", function() {
  beforeEach(function() {
    sinon.spy(testee.logger, "info");
  });

  afterEach(function() {
    testee.logger.info.restore();
  });

  it("logger output should confirm that Signature is ok", function() {
    testee.demonstrateSignature();
    chai.assert.include(testee.logger.info.getCall(0).args, true);
  });
});
