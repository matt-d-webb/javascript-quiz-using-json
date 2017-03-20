require('jsdom-global')()

var Quiz = require('../js/quiz');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

describe('Json Quiz', function() {

  var quiz;

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
    quiz = window.Quiz.__TEST__;
  })

  it('Should be defined', function() {
      expect(quiz).to.be.a('object');
  });

  it('Should have 16 private methods', function() {
      expect(Object.keys(quiz).length).to.equal(16);
  });

  describe('Templates', function() {
    it('questionTemplate() should return a string from', function() {

        var data = { "question": "Valid Question 1 - four options",
                        "info": "Information 1",
                        "options":["Option 1","Option 2","Option 3","Option 4"],
                        "scores":[4,3,1,2]};

        var str = quiz.questionTemplate(data.question,data.options);

        expect(str).to.be.a('string');
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
  });


});
