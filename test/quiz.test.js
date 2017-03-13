require('jsdom-global')();
require('../js/quiz');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

describe('Json Quiz', function() {

  let quiz;

  beforeEach(function() {
    quiz = window.Quiz;
  })

  it('Should be defined', function() {
      console.log(quiz, Quiz);
      expect(quiz).to.be.a('object');
  });

});
