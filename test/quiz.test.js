
const Quiz = require('../js/quiz');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

describe('Json Quiz', function() {

  let quiz;

  let config = {
    dataSource: './data/valid.questions.json',
    loadingGif: null,
    id: 'quiz',
    randomise: false
  };

  let state = {
    question: {
      current: 0,
      count: 0
    },
    answers: [],
    data: {}
  };

  beforeEach(function() {
    quiz = window.Quiz;
  })

  it('Should be defined', function() {
      console.log(quiz, Quiz);
      expect(quiz).to.be.a('object');
  });

});
