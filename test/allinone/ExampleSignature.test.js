import {
  logger,
  demonstrateSignature
} from "../../trans/allinone/ExampleSignature";

var chai = require("chai"),
  sinon = require("sinon"),
  mocha = require("mocha"),
  sinonChai = require("sinon-chai");

chai.use(sinonChai);

describe("ExampleSignature allInOne crypto Test runs", function() {
  beforeEach(function() {
    sinon.spy(logger, "info");
  });

  afterEach(function() {
    logger.info.restore();
  });

  it("logger output should confirm that Signature is ok", function() {
    demonstrateSignature();
    chai.assert.include(logger.info.getCall(0).args, true);
  });
});
