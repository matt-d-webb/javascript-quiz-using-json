var window, document;
var Quiz = require('../js/quiz');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

describe('Json Quiz', function() {

  var quiz;
  var window, document;

  var config = {
    dataSource: './data/valid.questions.json',
    loadingGif: null,
    id: 'quiz',
    randomise: false
  };

  var state = {
    question: {
      current: 0,
      count: 0
    },
    answers: [],
    data: {}
  };

  beforeEach(function() {
    quiz = Quiz.__TEST__;
  })

  it('Should be defined', function() {
      expect(quiz).to.be.a('object');
  });

  it('Should have a 10 methods', function() {

  });

  describe('Templates', function() {

    



  })

});
