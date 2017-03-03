import {expect} from 'chai';
import Quiz from '../src/index';

describe('javascript quiz', function() {

  let quiz;

  beforeEach(()=> {
    quiz = new Quiz({name: 'Test'});
  });

  describe('all', ()=> {
    it('should be defined', ()=> {
      expect(quiz).to.be.defined;
    });
    it('should be an object', ()=> {
      expect(quiz).to.be.a('object');
    });
    it('should have a name called "test"', ()=> {
      expect(quiz.name).to.equal('Test');
    });
  });
});
