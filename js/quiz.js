/*
      Version: 0.2.0-alpha
       Author: Matthew D Webb
  Description: json quiz score calculator
 */
(function(global, document) {

    'use strict';

    const VERSION = '0.2.0-alpha';

    let Quiz;
    let TEST;

    // configuration for the plugin, these can be overwritten in the initialisation function:
    let config = {
        dataSource: null,
        loadingGif: null,
        seedData: './data/data.json',
        id: 'quiz',
        randomise: false,
        seed: true
    };

    let state = {
        question: {
            current: 0,
            count: 0
        },
        answers: [],
        data: {}
    };

    // TODO: update with ES6 Symbol! :-)
    function extend(defaults, options) {
        for (let i in options) {
            defaults[i] = options[i];
        }
        return defaults;
    }

    // TODO: validate JSON and provide user friendly messages.
    function isValid(data) {
        return true;
    }

    function getQuizData(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function onload() {
                if (this.status >= 200 && this.status < 300) {
                    console.log('resolved!');
                    resolve(xhr.response);
                } else {
                    console.log('rejected!');
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function onerror() {
                console.log('error!');
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }

    function getScore(answers) {
        return answers.reduce((acc, val) => acc + val);
    }

    function updateScore(userAnswer) {
        // map data to friendlier data set.
        state.answers.push(userAnswer);
    }

    function getTemplate(data, currentQuestion) {
        let question = data[0].questions[currentQuestion];
        if (currentQuestion === state.question.count) {
            end();
        };
        return questionTemplate(question.question, question.options);
    }

    function randomiseQuestions(questions) {
        let qs = questions.length,
            t, i;
        while (qs) {
            i = Math.floor(Math.random() * qs--);
            t = questions[qs];
            questions[qs] = questions[i];
            questions[i] = t;
        }
        return questions;
    }

    function start(data) {

        if (!isValid(data)) return;

        //
        state.data = JSON.parse(data);

        if (config.random === true) {
            state.data = randomiseQuestions(data);
        }

        state.question.count = state.data[0].questions.length;

        // dynamic dom element needs a handler to the on click event:
        bindSubmit();

        nextQuestion(data);
    }

    function nextQuestion(data) {
        let template = getTemplate(state.data, state.question.count);
        if (state.question.current) {
            let userAnswer = data; // $(data).serializeArray()[0].value;
            // updateScore({
            //     answer: userAnswer
            // });
						console.log(data);
        }
        state.question.current += 1;
        renderTemplate(template, config.id);
    }

    function end(stat) {
        let score = getScore(state.answers);
        let message = resultMessage(score, state.data[1].results);

        return `<h3>Quiz Complete</h3>
								<h4>${message.title}</h4>
								<p>${message.description}</p>
								<p>Your score was: ${score}</p>
						 		<p>Total questions: ${state.question.count}</p>`;
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
									<button id="nextQuestion" type="submit" class="btn btn-default">${isLast ? "Finish Quiz" : "Next Question" }</button>
								</form>`;
    }

    function questionTemplate(questionStr, options) {

        let isLastQuestion = (state.question.count === (state.question.current + 1));
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

    function renderTemplate(html, id) {
        document.getElementById(id).innerHTML = html;
    }

    // FIXME: needs to dynamically bind a form submit event on the document:
    function bindSubmit() {
        document.addEventListener('click', function(event) {
            if (event) {
                // let data = new FormData(document.getElementById('quizForm'));
                console.log(event);
            }
        });
    }

    // INITIALISE THE QUIZ:

    function init(options) {

        // extend all default options:
        extend(config, options);

        // will allow the quiz to be run with seed example data:
        if (config.seed === true) {
            config.dataSource = config.seedData;
        }

        // get json
        getQuizData(config.dataSource)
            .then(success, error);

        function success(data) {
            start(data, 0);
        }

        function error(err) {
            return renderTemplate(
                `
				<p>Sorry, we are unable to retrieve the data for this quiz.</p>
				<small>${err}</small>
				 `
            , config.id);
        }
    };

    // --------------------------------------------------------------------//
    // ------------------------------- PRIVATE API ------------------------//
    // --------------------------------------------------------------------//

    TEST = {
				state,
        init,
        VERSION,
        bindSubmit,
        renderTemplate,
        questionTemplate,
        informationTemplate,
        resultMessage,
        end,
        start,
        nextQuestion,
        randomiseQuestions,
        getTemplate,
        updateScore,
        getScore,
        getQuizData,
        isValid,
        extend
    };

    // --------------------------------------------------------------------//
    // ------------------------------- PUBLIC API -------------------------//
    // --------------------------------------------------------------------//
    Quiz = global.Quiz = {
        VERSION,
        init
    };

    // --- test-only ---------
    Quiz.__TEST__ = TEST;
    // --- end-test-only --------

    return Quiz;

}(window, document));
