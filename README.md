# jQuery Quiz using JSON

[![Code Climate](https://codeclimate.com/github/Matt-Webb/jquery-quiz-using-json/badges/gpa.svg)](https://codeclimate.com/github/Matt-Webb/jquery-quiz-using-json)

This code enables you to render questions with optional answers using radio buttons. Using [valid JSON](http://jsonlint.com/)
you can provide a list of questions and answers which will render to the user in sequence.

Each question can be assign a score against each option, this allows for a range of score for each question.


### EXAMPLE USE:

__JSON__

    { "question": "What year was the film The Shawshank Redemption released?",
                "info": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                "options": [
                    {
                        "answer": "1995",
                        "score": 0
                    },
                    {
                        "answer": "1994",
                        "score": 0
                    },
                    {
                        "answer": "1993",
                        "score": 5
                    }
                ]
    }

__HTML__

    <div id="quiz"></div>

__JAVASCRIPT__

    Quiz.init();   

__JQUERY__

### TO DO

* [ ] Remove jQuery dependency
* [ ] Abstract the rendered html question into templates for better customisation
* [x] Refactor json data for better clarity e.g "answers" should be "options" etc.
* [x] Add optional style sheets
* [x] Configurate as bower package
* [ ] Remove Bower, Switch to npm
* [ ] Add Tests
