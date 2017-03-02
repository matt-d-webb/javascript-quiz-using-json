const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const Quiz = require('../src/js/quiz');

describe("JavaScript Quiz Using Json", () => {

  console.log('Quiz', Quiz)
  var quiz;

  beforeEach(() => {
    quiz = new Quiz();
  })

  it("Should have a defined Quiz object", () => {

  });

});
