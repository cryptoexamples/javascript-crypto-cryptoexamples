var testee = require("../../src/objectOriented/ExampleHash.js");

var chai = require("chai"),
  mocha = require("mocha"),
  crypto = require("crypto");

let testArray = ["test", "test1", "test2", "test3"];

describe("objectOriented ExampleHash crypto Test runs", function() {
  it("hashString shoud work with an array", function() {
    chai
      .expect(() => {
        testee.hashStrings(testArray);
      })
      .to.not.throw();
  });
});
