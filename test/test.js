/*eslint-env mocha */

////////////
//Imports //
////////////

var chai = require("chai");
var expect = chai.expect;



//////////
//Tests //
//////////

describe("true", () => {
    it("should be true", () => {
        expect(true).to.be.true;
    });
});
