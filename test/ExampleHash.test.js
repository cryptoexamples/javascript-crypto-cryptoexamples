var testee = require("../src/ExampleHash.js");

var chai = require("chai"),
  sinon = require("sinon"),
  mocha = require("mocha"),
  sinonChai = require("sinon-chai");

chai.use(sinonChai);

describe("ExampleHash allInOne crypto Test runs", function() {
  beforeEach(function() {
    sinon.spy(testee.logger, "info");
    sinon.spy(testee.logger, "error");
  });

  afterEach(function() {
    testee.logger.info.restore();
    testee.logger.error.restore();
  });

  it("logger output should confirm that digest was created", function() {
    testee.demonstrateHash();
    chai.expect(testee.logger.error).to.not.be.called;
  });
});
