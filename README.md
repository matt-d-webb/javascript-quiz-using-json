# Javascript quiz using JSON :star:

[![Code Climate](https://codeclimate.com/github/Matt-Webb/javascript-quiz-using-json/badges/gpa.svg?style=flat-square)](https://codeclimate.com/github/Matt-Webb/javascript-quiz-using-json)
[![Build Status](https://travis-ci.org/Matt-Webb/javascript-quiz-using-json.svg?branch=master&style=flat-square)](https://travis-ci.org/Matt-Webb/javascript-quiz-using-json)
[![codecov](https://codecov.io/gh/Matt-Webb/javascript-quiz-using-json/branch/master/graph/badge.svg)](https://codecov.io/gh/Matt-Webb/javascript-quiz-using-json)
[![devDependencies Status](https://david-dm.org/Matt-Webb/javascript-quiz-using-json/dev-status.svg)](https://david-dm.org/Matt-Webb/javascript-quiz-using-json?type=dev)

This simple project which provides a clean API for rendering questions with multiple choice answer. The data is loaded using [valid JSON](http://jsonlint.com/) and gave be retrieved from any end point which can return the data in the desirable format.

Each question can be assigned a score, this allows for a range of scores for each question. The

### ALPHA [v0.5.1](https://github.com/Matt-Webb/javascript-quiz-using-json/tree/v0.5.1-alpha)

This project is currently in ALPHA and activity being worked on. Contributions are welcome!

#### Via NPM

`npm i javascript-quiz-using-json`

#### How to use:

Add the following HTML into your page:

**HTML**

    <!-- dom reference -->
    <div id="quizName"></div>

    <!-- quiz package -->
    <script src="./javascript-quiz-using-json/dist/quiz.umd.min.js"></script>

**JAVASCRIPT**

Basic initialisation.

    Quiz.init({ id: "quizName" });  

_Note: this needs to be done after referencing the script shown above._

**Sample JSON**

Here is a sample of the quiz question data:

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

## CONFIGURATIONS

    var configurations = {
      id: 'quizName',                  // the element reference within the DOM
      dataSource: './data.json',       // the json quiz data location
      randomise: 'false',              // randomise the order of the questions to the user
      loadingGif: './img/loading.gif', // loading image between rendering
    };

    Quiz.init(configurations);


**HOW TO INSTALL**

Pull the package from npm:

`$ npm i javascript-quiz-using-json --save`

Install dev dependancies:

`$ npm install`

Build the package:

`$ npm run build`

This will generate the files in the the `dist` folder, i.e. `dist/quiz.umd.min.js`

### [CONTRIBUTING](./CONTRIBUTE.md)

`$ git clone`

`$ npm install`

`$ npm test`

`$ npm start`

### TO DO

* [ ] Add optional style sheets
* [ ] Add charts to result rendering
* [ ] Add Automated Acceptance Tests
* [ ] Set up semvar
* [ ] Abstract the rendered html question into templates for better customisation
* [ ] Add as npm package
* [x] Add webpack bundler
* [x] Remove jquery dependency
* [x] Move TODOs to issues with need-help flag
* [x] Update Travis Build
* [x] Add module bundler
* [x] Add test coverage badge
* [x] Refactor json data for better clarity e.g "answers" should be "options" etc.
* [x] Configurate as bower package
* [x] Remove Bower, Switch to npm
* [x] Add Unit Tests
