/*
      Version: 0.5.1-alpha
       Author: Matthew D Webb
  Description: javascript quiz using json
 */
(function (global, document) {

	'use strict';

	const VERSION = '0.5.1-alpha';

	let Quiz;
	let TEST;
	let config;

	// configuration for the plugin, these can be overwritten in the initialisation function:
	let defaultOptions = {
		dataSource: null,
		loadingGif: null,
		seedData: './data/data.json',
		id: 'quiz',
		randomise: false,
		seed: false
	};

  // keeps track of the current state
	let state = {
		question: {
			current: 0,
			count: 0
		},
		answers: [],
		data: {}
	};

	function extend(defaults, options) {
		return Object.assign({}, defaults, options);
	}

	function isValid(data) {
		try {
			JSON.parse(data);
		} catch (e) {
			return false;
		}
		return true;
	}
  // TODO:
	// [1] convert to async / await
	// [2] make function testable (removing annoynmous functions)
	function getQuizData(url) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', url);
			xhr.onload = function onload(data) {
				if (this.status >= 200 && this.status < 300) {
					resolve(xhr.response);
				} else {
					reject({
						status: this.status,
						statusText: xhr.statusText
					});
				}
			};
			xhr.onerror = function onerror() {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			};
			xhr.send();
		});
	}
        // FIXME: error prone.
	function getScore(answers) {
		if (answers && answers.length > -1) {
			return answers.reduce((acc, val) => acc + val);
		} else {
			return 0;
		}
	}
  // TODO: refactor out.
	function updateScore(userAnswer) {
		state.answers.push(userAnswer);
	}

	function getTemplate(questions, currentQuestion) {
		// End of Quiz?
		if (state.question.count === currentQuestion) {
			return end(state);
		// Next Question
		} else {
			let question = questions[currentQuestion];
			return questionTemplate(question.question, question.options);
		}
	}

	function randomiseQuestions(questions) {
		let qs = questions.length;
		let item, temp;
		while (qs) {
			item = Math.floor(Math.random() * qs--);
			temp = questions[qs];
			questions[qs] = questions[item];
			questions[item] = temp;
		}
		return questions;
	}

	function nextQuestion(state, config) {
		const questions = state.data[0].questions;
		const currentQ = state.question.current;
		const template = getTemplate(questions, currentQ);
		// increment current question:
		state.question.current += 1;
		renderTemplate(template, config.id);
	}

	function start(data, config, state) {

	    if (isValid(data) === false) {
				renderTemplate('<p>The JSON data provided is not valid! Please check this and retry</p>', config.id);
				return;
			}
			// should be moved.
	    state.data = JSON.parse(data);
			state.question.count = state.data[0].questions.length;

	    if (config.random === true) {
	     	state.data = randomiseQuestions(state.data);
	    }

	    bindSubmit(document);
	    nextQuestion(state, config);
	}

	function end(state) {
		let score = getScore(state.answers);
		let message = resultMessage(score, state.data[1].results);
		return `<h3>Quiz Complete</h3><h4>${message.title}</h4><p>${message.description}</p>
		  <p>Your score was: ${score} questions: ${state.question.count}</p>`;
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
		return `<form id="quizForm"><p>${infoStr}</p>
				<button id="nextQuestion" type="submit" class="btn btn-default">${isLast ? "Finish Quiz" : "Next Question" }</button>
			</form>`;
	}

	function questionTemplate(questionStr, options) {

		const isLastQuestion = (state.question.count === (state.question.current + 1));
		var template = `<div id="quizForm">
                <div>PROGRESS BAR HERE</div>
								<p>${questionStr}</p>`;

		options ? options.forEach((option, index) => {
			template += `<div class="radio">
					<label>
						<input type="radio" name="quizAnswer" required value="${index + 1}">
						${option}
					</label>
				</div>`;
		}) : template += `<div>Error! No options provided!</div>`;

		template += `<button id="nextQuestion" type="submit" class="btn btn-default">
				${ isLastQuestion ? "Finish Quiz" : "Next" }
				</button>
			</div>`;

		return template;
	}

	// DOM interaction

	function renderTemplate(html, id) {
		const existing = document.getElementById(id);
		if(existing) {
			existing.remove();
		}
	 	const form = document.createElement('form');
		form.setAttribute('id', id);
		form.innerHTML = html;
    document.body.appendChild(form);
	}

	function bindSubmit(document) {
		document.addEventListener('submit', function (event) {
			event.preventDefault();
			if(event.target.id === config.id) {
					const radios = document.getElementsByName('quizAnswer');
					const answer = parseInt(Array.from(radios).find((r, i) => radios[i].checked).value);
					updateScore(answer);
        	nextQuestion(state, config);
			}
		});
	}

	// INITIALISE THE QUIZ:

	function init(options) {

		// extend all default options, (config is internally accessible):
		config = extend(defaultOptions, options);

		// will allow the quiz to be run with seed example data:
		if (config.seed === true) {
			config.dataSource = config.seedData;
		}

		// get json
		getQuizData(config.dataSource).then(success, error);

		function success(data) {
			start(data, config, state);
		}

		function error(err) {
			return renderTemplate(
				`<p>Sorry, we are unable to retrieve the data for this quiz.</p>
					<small>Try checking the dateSource provided: ${config.dataSource}</small>`
        		, config.id);
		}
	}

	// --------------------------------------------------------------------//
	// ----------------- PRIVATE API (TESTING ONLY) -----------------------//
	// --------------------------------------------------------------------//
	TEST = {
		VERSION,
		state,
		init,
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

	Quiz.__TEST__ = TEST;

	return Quiz;

}(window, document));
