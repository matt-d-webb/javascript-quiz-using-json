var Quiz = require('../js/jsonQuiz');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

decrible('Json Quiz', function() {

  let quiz;

  beforeEach(function() {
    quiz = new Quiz();
  })

  it('Should be defined', function() {
      expect(quiz).to.be.a('function');
  });

  it('Should have an init function', function() {
      expect(quiz).to.have.a('function').called('init');
  });

});
