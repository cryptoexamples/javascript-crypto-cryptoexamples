import {
  logger,
  demonstrateKeyBasedAsymmetricEncryption
} from "../../trans/allinone/ExampleAsymmetricStringEncryption";

var chai = require("chai"),
  mocha = require("mocha"),
  sinon = require("sinon"),
  sinonChai = require("sinon-chai");

chai.use(sinonChai);

describe("ExampleAsymmetricStringEncryption allInOne crypto Test runs", function() {
  beforeEach(function() {
    sinon.spy(logger, "info");
  });

  afterEach(function() {
    logger.info.restore();
  });

  it("logger output should confirm that Strings are the same", function() {
    demonstrateKeyBasedAsymmetricEncryption();
    chai.assert.include(logger.info.getCall(0).args, "yes");
  });
});
