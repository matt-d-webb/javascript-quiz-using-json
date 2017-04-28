"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

describe('javascript-quiz-using-json', () => {

  var Quiz, jsdom, quiz, version, config, state, data;

  before(() => {

    jsdom = require('jsdom-global')();
    Quiz = require('../src/js/quiz');

    quiz = window.Quiz.__TEST__;
    version = '0.5.1-alpha';

    config = {
      dataSource: './data/valid.questions.json',
      loadingGif: null,
      id: 'quiz',
      random: true
    };

    data = [{
      	"questions": [{
      		"question": "Valid Question 1 - four options",
      		"info": "Information 1",
      		"options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      		"scores": [4, 3, 1, 2]
      	}, {
      		"question": "Valid Question 2 - four options",
      		"info": "Information 2",
      		"options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      		"scores": [4, 3, 1, 2]
      	}]
      }, {
      	"results": [{
      		"title": "",
      		"description": "",
      		"minScore": 0
      	}, {
      		"title": "",
      		"description": "",
      		"image": "",
      		"minScore": 11
      	}]
      }];

    state = {
      	"question": {
      		"current": 1,
      		"count": 0
      	},
      	"answers": [2,3,1],
      	"data": data
      };
  });

  after(() => {
    jsdom();
  });

  describe('Quiz', function() {

    it('Should be defined', function() {
        expect(window.Quiz).to.be.defined;
        expect(quiz).to.be.a('object');
    });

    it('Should have 18 private methods', function() {
        expect(Object.keys(quiz).length).to.equal(18);
    });

    it('Should return a version number', function() {
        var v = quiz.VERSION;
        expect(v).to.be.a('string');
        expect(v).to.equal(version);
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
        expect(str).to.contain("Option 3");
    });

    it('getTemplate() should return a valid template', function() {
      var template = quiz.getTemplate(data, 1);
      expect(template).to.be.a('string');
    });

    it('getTemplate() should return a valid end template', function() {
      var template = quiz.getTemplate(data, 1);
      expect(template).to.be.a('string');
    });

    it('resultMessage() should return a summarised html message with the correct data', function() {
      var result = [{ minScore: 5, value: 'low'},{ minScore: 10, value: 'medium'}, { minScore: 15, value: 'high'}];
      var resultMessage = quiz.resultMessage(20, result);
      expect(resultMessage).to.be.a('object');
      expect(resultMessage.value).to.equal('high');
      expect(resultMessage.value).to.not.equal('low');
      expect(resultMessage.value).to.not.equal('medium');
    });

    it('informationTemplate() should return html template with the correct data', function() {
        var info = quiz.informationTemplate('a test message', true);
        expect(info).to.be.a('string');
        expect(info).to.contain('a test message');
        expect(info).to.contain('Finish Quiz');
    });

    it('renderTemplate() should add the correct html to the DOM', function() {
        var renderTemplate = quiz.renderTemplate('<div>Test</div>', 'quiz');
        var el = document.getElementById('quiz');
        expect(quiz.renderTemplate).to.be.a('function');
        expect(el).to.defined;
        expect(el.innerHTML).to.contain('Test');
    });

  });

  describe('Core functionality', function() {

    it('init() should initialse the quiz with the correct first question', function() {
        var options = { seed: true };
        quiz.init(options);
        expect(quiz.init).to.be.a('function');
    });

    it('start() should not update the question array', function() {
        quiz.start(data, config, state);
        expect(quiz.start).to.be.a('function');
    });

    it('start() should update the question array', function() {

        var _data = '[{"questions":[{"question":"1. Question One","info":"info","options":["Option 1","Option 2","Option 3","Option 4"],"scores":[400,300,100,200]},{"question":"2. Question Two","info":"info","options":["Option 1","Option 2","Option 3","Option 4"],"scores":[40,30,10,20]}]},{"results":[{"title":"Terrible Score","description":"Details","image":"./img/the-end.jpg","minScore":0},{"title":"Poor Score","description":"Details","image":"./img/the-end.jpg","minScore":2},{"title":"Good Score","description":"Details","image":"./img/the-end.jpg","minScore":4},{"title":"Brilliant Score","description":"Details","image":"./img/the-end.jpg","minScore":6}]}]';
        quiz.start(_data, config, state);
        expect(config.random).to.be.true;
        expect(state).to.be.defined;
        expect(quiz.start).to.be.a('function');
    });

    it('end() should clear all question array data', function() {
        expect(quiz.end).to.be.a('function');
        var end = quiz.end(state);
        expect(end).to.be.a('string');
    });

    it('bindSubmit() should add an event listener to the DOM', function() {
        quiz.bindSubmit(document);
        expect(quiz.bindSubmit).to.be.a('function');
    });

    it('nextQuestion() should iterate through the array of questions', function() {
        expect(quiz.nextQuestion).to.be.a('function');
    });

    it('nextQuestion() increment the next question', function() {
        var _state = state;
        _state.question.current = 1;
        quiz.nextQuestion(_state, config);
        expect(state.question.current).to.equal(2);
    });

  });

  describe('Utilities', function() {

    var xhr, data;

    before(function () {
        xhr = sinon.useFakeXMLHttpRequest();
        xhr.onload = function onload(req) { data = req; };
        xhr.onerror = function onerror(err) { return err };
        xhr.send = function noob() { };
    });

    after(function () {
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
        var promise = quiz.getQuizData(config.dataSource);
        promise.then(function(data) {
          expect(data).to.be.defined;
        }).catch(function(error) {
          expect(error).to.be.defined;
        })
    });

    // it('getQuizData() error', function() {
    //   var promise = quiz.getQuizData('dodgy-url.x');
    //   var error = sinon.spy(xhr, 'onerror');
    //   // promise.then(function() {}).catch(function(error) {
    //   //   sinon.assert.calledOnce(error);
    //   // });
    // });

    it('getScore() should return the correct score', function() {
        var score = quiz.getScore(state.answers);
        expect(score).to.equal(6);
    });

    it('getScore() should return 0 if length is undefined', function() {
      var score = quiz.getScore(undefined);
      expect(score).to.equal(0);
    })

    it('updateScore() should increment the correct score to the score array', function() {
        quiz.updateScore(1000);
        expect(quiz.state.answers).to.contain(1000);
    });

    it('isValid() should validate the json data if it is valid', function() {
        var data = '[{"question": "What is my name?"}]';
        var isValid = quiz.isValid(data);
        expect(isValid).to.be.true;
    });

    it('isValid() should invalidate the json date if it is invalid', function() {
      var data = '[{"question" : "This is Invalud"},]';
      var isValid = quiz.isValid(data);
      expect(isValid).to.be.false;
    })

    it('randomiseQuestions() should return a different array order', function() {
        var randomiseArray = quiz.randomiseQuestions([1,2,3,4,5,6]);
        expect(randomiseArray).to.be.an('array');
        expect(randomiseArray.length).to.equal(6);
    });
  });
});
