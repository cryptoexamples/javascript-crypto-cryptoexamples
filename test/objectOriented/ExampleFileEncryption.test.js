var testee = require("../../src/objectOriented/ExampleFileEncryption.js");

var chai = require("chai"),
  mocha = require("mocha"),
  crypto = require("crypto"),
  fs = require("fs"),
  chaiFiles = require("chai-files");

let testFile = fs.readFileSync("file.txt", { encoding: "binary" });
let testFileEnc = fs.readFileSync("file.enc.txt", { encoding: "binary" });
let testIv = crypto.randomBytes(16);
let testKey = crypto.randomBytes(32);
let testFileDec = fs.readFileSync("file.dec.txt", { encoding: "binary" });

describe("fileencrypt forge Test runs", function() {
  it("calling function without iv, should throw an error", function() {
    chai
      .expect(() => {
        testee.encryptFile(testFile, testKey);
      })
      .to.throw();
  });

  it("calling function without iv, should throw an error", function() {
    chai
      .expect(() => {
        testee.decryptFile(testFileEnc, testKey);
      })
      .to.throw();
  });
  it("running code, should create a file 'file.enc.txt'", function() {
    chai.expect(chaiFiles.file("file.enc.txt")).to.exist;
  });
  it("running code, should create a file 'file.dec.txt'", function() {
    chai.expect(chaiFiles.file("file.dec.txt")).to.exist;
  });

  it("decrypted file should be equal to original file", function() {
    chai.assert.equal(testFile, testFileDec);
  });
});
