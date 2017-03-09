# jQuery Quiz using JSON

[![Code Climate](https://codeclimate.com/github/Matt-Webb/jquery-quiz-using-json/badges/gpa.svg)](https://codeclimate.com/github/Matt-Webb/jquery-quiz-using-json)

This code enables you to render questions with optional answers using radio buttons. Using [valid JSON](http://jsonlint.com/)
you can provide a list of questions and answers which will render to the user in sequence.

Each question can be assign a score against each option, this allows for a range of score for each question.


### EXAMPLE USE:

__JSON__

      {
          "question": "What year was the film The Terminator released?",
          "info": "The Terminator is a 1984 American science fiction action film directed by James Cameron. It stars Arnold Schwarzenegger as the Terminator, a cyborg assassin sent back in time from 2029 to 1984 to kill Sarah Connor (Linda Hamilton), whose son will one day become a savior against machines in a post-apocalyptic future.",
          "options":
            [
              "1982",
              "1983",
              "1984",
              "1984"
            ],
          "scores":
            [0,3,1,2]
      }

__HTML__

    <div id="quizName"></div>

__JAVASCRIPT__

    Quiz.init({ id: "quizName" });   


### TO DO

* [ ] Remove jQuery dependency
* [ ] Abstract the rendered html question into templates for better customisation
* [x] Refactor json data for better clarity e.g "answers" should be "options" etc.
* [x] Add optional style sheets
* [x] Configurate as bower package
* [ ] Remove Bower, Switch to npm
* [ ] Add Tests
