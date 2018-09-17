import { logger, demonstrateHash } from "../../trans/allinone/ExampleHash";

var chai = require("chai"),
  sinon = require("sinon"),
  mocha = require("mocha"),
  sinonChai = require("sinon-chai");

chai.use(sinonChai);

describe("ExampleHash allInOne crypto Test runs", function() {
  beforeEach(function() {
    sinon.spy(logger, "info");
    sinon.spy(logger, "error");
  });

  afterEach(function() {
    logger.info.restore();
    logger.error.restore();
  });

  it("logger output should confirm that digest was created", function() {
    demonstrateHash();
    chai.expect(logger.error).to.not.be.called;
  });
});
