require('jsdom-global')()

var Quiz = require('../js/quiz');
var mocha = require('mocha');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

describe('Json Quiz', function() {

  var quiz, config, state, data;

  beforeEach(function() {
    quiz = window.Quiz.__TEST__;

    config = {
      dataSource: './data/valid.questions.json',
      loadingGif: null,
      id: 'quiz',
      randomise: false
    };

    state = {
      question: {
        current: 0,
        count: 0
      },
      answers: [2,3,1],
      data: {}
    };

    data = [{ questions: [{
      question: "Valid Question 1 - four options",
      info: "Information 1",
      options:["Option 1","Option 2","Option 3","Option 4"],
      scores:[4,3,1,2]
    },{
      question: "Valid Question 2 - four options",
      info: "Information 2",
      options:["Option 1","Option 2","Option 3","Option 4"],
      scores:[4,3,1,2]
    }]}];

  });

  describe('Quiz', function() {

    it('Should be defined', function() {
        expect(quiz).to.be.a('object');
    });

    it('Should have 16 private methods', function() {
        expect(Object.keys(quiz).length).to.equal(17);
    });

  });

  describe('Templates', function() {

    it('questionTemplate() should return a string from', function() {

        var questions = {
          question: "Valid Question 1 - four options",
          info: "Information 1",
          options:["Option 1","Option 2","Option 3","Option 4"],
          scores:[4,3,1,2]
        };

        var str = quiz.questionTemplate(questions.question, questions.options);

        expect(str).to.be.a('string');
    });

    it('getTemplate() should return a valid template', function() {

      var template = quiz.getTemplate(data, 1);

      expect(template).to.be.a('string');
    });

    it('resultMessage() should return a summarised html message with the correct data', function() {

      var result = [{ minScore: 5, value: 'low'},{ minScore: 10, value: 'medium'}, { minScore: 15, value: 'high'}];

      var resultMessage = quiz.resultMessage([20,11,20,4], result);

      expect(resultMessage).to.be.a('string');
      expect(resultMessage.indexOf('low') > -1).to.be.false;
      expect(resultMessage.indexOf('high') > -1).to.be.true
    });

    it('informationTemplate() should return html template with the correct data', function() {

    });

    it('renderTemplate() should add the correct html to the DOM', function() {

    });

  });

  describe('Core functionality', function() {

    it('init() should initialse the quiz with the correct first question', function() {

    });

    it('start() should update the question array', function() {

    });

    it('end() should clear all question array data', function() {

    });

    it('bindSubmit() should add an event listener to the DOM', function() {

    });

    it('nextQuestion() should iterate through the array of questions', function() {

    });

  });

  describe('Utilities', function() {

    var xhr, data;

    before(function () {
        xhr = sinon.useFakeXMLHttpRequest();
        data = {};
        xhr.onload = function (req) { data = req; };
    });

    after(function () {
        // Like before we must clean up when tampering with globals.
        xhr.restore();
    });


    it('extend() should return an object with merged properties', function() {

        var obj1 = { name: 'test', val: 2 };
        var obj2 = { name: 'test 2', other: 4 };

        var extended = quiz.extend(obj1, obj2);

        expect(extended).to.be.a('object');
        expect(extended.name).to.equal('test 2');
        expect(extended.val).to.equal(2);
        expect(extended.other).to.equal(4);
    });

    it('getQuizData() should return a array for JSON data from a HTTP request', function() {

    });

    it('getScore() should return the correct score', function() {
        var score = quiz.getScore(state.answers);

        expect(score).to.equal(6);
    });

    it('updateScore() should increment the correct score to the score array', function() {
        quiz.updateScore(1000);

        expect(quiz.state.answers).to.contain(1000);
    });

    it('isValid() should valid the json data', function() {
        var isValid = quiz.isValid();

        expect(isValid).to.be.true;
    });

  });

});
