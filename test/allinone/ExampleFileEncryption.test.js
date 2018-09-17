import {
  logger,
  demonstrateFileEncryption
} from "../../trans/allinone/ExampleFileEncryption";

var chai = require("chai"),
  sinon = require("sinon"),
  mocha = require("mocha"),
  sinonChai = require("sinon-chai");

chai.use(sinonChai);

describe("ExampleFileEncryption allInOne crypto Test runs", function() {
  beforeEach(function() {
    sinon.spy(logger, "error");
    sinon.spy(logger, "info");
  });

  afterEach(function() {
    logger.error.restore();
    logger.info.restore();
  });

  it("logger output should confirm that files are the same", function() {
    demonstrateFileEncryption();
    chai.expect(logger.error).to.not.be.called;
    // chai.assert.include(logger.info.getCall(0).args, "yes");
  });
});
