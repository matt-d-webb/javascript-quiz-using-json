
var mocha = require('mocha');
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;


describe('javascript-quiz-using-json', function() {

  var Quiz, jsdom, quiz, version, config, state, data;

  before(function() {

    jsdom = require('jsdom-global')();
    Quiz = require('../js/quiz');

    quiz = window.Quiz.__TEST__;
    version = '0.2.0-alpha';

    config = {
      dataSource: './data/valid.questions.json',
      loadingGif: null,
      id: 'quiz',
      randomise: false
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
      		"current": 0,
      		"count": 0
      	},
      	"answers": [2, 3, 1],
      	"data": data
      };

      // this.xhr = sinon.useFakeXMLHttpRequest();
      // this.requests = [];
      // this.xhr.onCreate = function(xhr) {
      //       this.requests.push(xhr);
      // }.bind(this);

  });

  after(function () {
    jsdom();
    // this.xhr.restore();
  });

  describe('Quiz', function() {

    it('Should be defined', function() {
        expect(quiz).to.be.a('object');
    });

    it('Should have 16 private methods', function() {
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
    });

    it('getTemplate() should return a valid template', function() {

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
        // var renderTemplate = quiz.renderTemplate('<div>Test</div>');
        // var data = document.getElementById(config.id);
        // console.log(global.document);
        expect(quiz.renderTemplate).to.be.a('function');
        // expect(data).to.contain('Test');
    });

  });

  describe('Core functionality', function() {

    it('init() should initialse the quiz with the correct first question', function() {
        expect(quiz.init).to.be.a('function');
    });

    it('start() should update the question array', function() {
        
        quiz.start(data);
        expect(quiz.start).to.be.a('function');

    });

    it('end() should clear all question array data', function() {
        expect(quiz.end).to.be.a('function');

        var end = quiz.end(state);

        expect(end).to.be.a('string');
    });

    it('bindSubmit() should add an event listener to the DOM', function() {
        expect(quiz.bindSubmit).to.be.a('function');
    });

    it('nextQuestion() should iterate through the array of questions', function() {
        expect(quiz.nextQuestion).to.be.a('function');
    });

  });

  describe('Utilities', function() {

    var xhr, data;

    before(function () {
        xhr = sinon.useFakeXMLHttpRequest();
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
        var promise = quiz.getQuizData(config.dataSource);
        // TODO: needs to test a promise and xhr request!

        promise.then(function(data) {

        }).catch(function(error) {
          expect(error).to.be.defined;
        })
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

    it('randomiseQuestions() should return a different array order', function() {
        var randomiseArray = quiz.randomiseQuestions([1,2,3,4,5,6]);

        expect(randomiseArray).to.be.an('array');
        expect(randomiseArray.length).to.equal(6);
    });

  });

});
