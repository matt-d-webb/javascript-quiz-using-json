/*
      Version: 0.1.0
       Author: Matthew D Webb
  Description: json quiz score calculator
 Dependencies: JQuery 2.1.0 (cdn here: https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js)
 */

(function(global, $, document) {

    'use strict';

    const VERSION = '0.1.0';

    let Quiz;

    // configuration for the plugin, these can be overwritten in the initialisation function:
    let config = {
        dataSource: '../examples/data/data.json',
        loadingGif: '../examples/img/loading.gif',
        id: 'quiz',
        randomise: false
    }

    let currentQuestion = 0;
    let questionCount = 0;
    let answerArray = [];
    let storedData = {};

    function extend(config, options) {
        for (let i in options) {
            config[i] = options[i];
        }
    }

    function isValid(data) {
        return true;
    }

    function getQuizData(url) {
        return $.getJSON(url);
    }

    function incrementQuestion() {

    }

    function getScore(answers) {
        let score = 0;

        answers.forEach((answer) => {
            score += parseInt(answer[0].value, 10);
        });
        return score;
    }

    function updateScore(userAnswer) {
        // map data to friendlier data set.
        answerArray.push(userAnswer);
    }

    function getTemplate(data, currentQuestion) {
        let question = data[0].questions[currentQuestion];
        if (currentQuestion === questionCount) {
            return end();
        };
        return questionTemplate(question.question, question.options);
    }

    function randomiseQuestions(questions) {
        let m = questions.length,
            t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = questions[m];
            questions[m] = array[i];
            questions[i] = t;
        }
        return questions;
    }

    function start(data) {

        if (!isValid(data)) return;

        if (config.random) {
            randomiseQuestions(data);
        }

        questionCount = data[0].questions.length;

        storedData = data;
        if (config.randomise) {
            randomiseQuestions();
        }

        // dynamic dom element needs a handler to the on click event:
        bindSubmit();

        return nextQuestion(data);
    }

    function nextQuestion(data) {
        let template = getTemplate(storedData, currentQuestion);
        if (currentQuestion) {
            let userAnswer = $(data).serializeArray()[0].value;
            updateScore({
                answer: userAnswer
            });
        }
        currentQuestion += 1;
        renderTemplate(template);
    }

    function end() {
        let score = getScore(answerArray);
        let message = resultMessage(score, storedData[1].results);

        return `<h3>Quiz Complete</h3>
								<h4>${message.title}</h4>
								<p>${message.description}</p>
								<p>Your score was: ${score}</p>
						 		<p>Total questions: ${questionCount}</p>`;
    }

    function resultMessage(score, result) {
        let message = {};

        result.forEach((data) => {
            if (score >= data.minScore) {
                message = data;
            }
        });
        return message;
    }

    function informationTemplate(infoStr, isLast) {
        return `<form id="quizForm">
									<p>${infoStr}</p>
									<button id="nextQuestion" type="submit" class="btn btn-default">${isLast ? "Final Quiz" : "Next Question" }</button>
								</form>`;
    }

    function questionTemplate(questionStr, options) {

        let isLastQuestion = (questionCount === (currentQuestion + 1));
        let template = `<form id="quizForm">
                          <div>PROGRESS BAR HERE</div>
													<p>${questionStr}</p>`;

        // html radio buttons.
        // NOTE: that the index value is the reference used to determine the score:
        options.forEach((option, index) => {
            template += `<div class="radio">
														<label>
															<input type="radio" name="quizAnswer" required value="${index}">
															${option}
														</label>
													</div>`;
        });

        template += `<button id="nextQuestion" type="submit" class="btn btn-default">
											${ isLastQuestion ? "Finish Quiz" : "Next" }
									</button>
								</form>`;

        return template;
    };

    // DOM interaction

    function renderTemplate(html) {
        $(`#${config.id}`).html(html);
    }

    function bindSubmit() {
        $(document).on('submit', 'form', function(event) {
            event.preventDefault();
            nextQuestion(this); // TODO: remove 'this'
        });
    }

    // INITIALISE THE QUIZ:

    function init(options) {

        // extend all default options:
        extend(config, options);

        // get json
        getQuizData(config.dataSource)
            .then(success, error);

        function success(data) {
            start(data, 0);
        }

        function error(err) {
            return renderTemplate(
                `<p>Sorry, we are unable to retrieve the data for this quiz.</p>
																		<small>${err}</small>`
            );
        }
    };

    // --------------------------------------------------------------------//
    // ------------------------------- API --------------------------------//
    // --------------------------------------------------------------------//

    Quiz = global.Quiz = {
        VERSION,
        init
    }

    return Quiz;

}(window, jQuery, document));
