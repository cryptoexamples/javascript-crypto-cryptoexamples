import { hashStrings } from "../../trans/objectOriented/stringhash";
var chai = require("chai"),
  mocha = require("mocha"),
  crypto = require("crypto");

let testArray = ["test", "test1", "test2", "test3"];

describe("Stringhash crypto Test runs", function() {
  it("hashString shoud work with an array", function() {
    chai
      .expect(() => {
        hashStrings(testArray);
      })
      .to.not.throw();
  });
});
