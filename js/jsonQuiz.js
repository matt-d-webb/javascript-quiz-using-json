/*
      Version: 0.0.1
         Date: 11/03/2015
       Author: Matthew D Webb
      Website: http://www.searchlaboratory.com/
  Description: json quiz score calculator
 Dependencies: JQuery 2.1.0 (cdn here: https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js)
         Demo: https://jsfiddle.net/Webby2014/t4p8x02b/
 */

( function ( $, undefined ) {

	'use strict';

	// GLOBAL:
	var $placeHolder = $( '#quiz' );
	var loadingGif = 'loading.gif';
	var dataSource = 'data.json';
	var currentQuestion = 0;
	var questionCount = 0;
	var answerArray = [];
	var infoMode = false;
	var gotData = false;
	var inMemoryData = {};

	// QUIZ LOGIC:
	var quiz = function () {

		// private methods:
		var getQuizData = function ( url ) {

			var promise = $.getJSON( url );
			return promise;
		};

		var getScore = function () {

			var score = 0;

			$( answerArray ).each( function ( index, object ) {
				score += parseInt( object[ 0 ].value, 10 );
			} );
			return score;
		};

		var updateScore = function ( userAnswer ) {
			answerArray.push( userAnswer );
		};

		var getHTML = function ( data, currentQuestion ) {

			var content = '';
			var complete = true;

			// FIXME: surely nested each loops are not required here?!
			$( data ).each( function ( index, object ) {

				$( object.questions ).each( function ( index, object ) {
					if ( infoMode ) {
						if ( currentQuestion === index ) {
							infoMode = false;
							complete = false;
							content = infoHTML( object.info );
						}
					} else {
						if ( currentQuestion === index ) {
							complete = false;
							content = questionHTML( object.question, object.answers );
							if ( object.includeInfo ) {
								infoMode = true;
							}
						}
					}
				} );
			} );

			// if we have reached the end of the quiz, render the final page:
			if ( complete ) {
				content = resultHTML();
			}

			return content;
		};

		// BIND EVENT:

		var bindSubmit = function () {

			$( document ).on( 'submit', 'form', function ( event ) {

				event.preventDefault();

				next( this );

				// FIXME: re initialising the quiz plugin seems incorrect here:
				quiz().init();
			} );
		};

		// ITERATION LOGIC:

		var next = function ( data ) {

			if ( infoMode ) {
				var userAnswer = $( data ).serializeArray();
				updateScore( userAnswer );
			} else {
				currentQuestion += 1;
			}
		};

		// DISPLAY RENDERING:

		// final message
		var resultHTML = function () {
			// TODO: need a better way to render the HTML.
			var score = getScore();
			var message = resultMessage( score );
			var template = [];

			template.push( '<h3> Quiz Complete </h3>' );
			template.push( '<h4>' + message.title + '</h4>' );
			template.push( '<p>' + message.description + '</p>' );

			if ( message && message.image ) {
				template.push( '<div><img src="' + message.image + '"/></div>' );
			}

			template.push( '<p>Your score was: ' + score + '</p>' );
			template.push( '<p>Total questions: ' + questionCount + '</p>' );

			return template.join( '\n' );
		};

		var resultMessage = function ( score ) {

			var message = {};

			// FIXME: nested each statements surely not required here?
			$( inMemoryData ).each( function ( index, object ) {
				$( object.results ).each( function ( index, object ) {
					if ( score >= object.minScore ) {
						message = object;
					}
				} );
			} );
			return message;
		};

		// information rendering (after each question)
		var infoHTML = function ( infoStr ) {

			var _info = [];
			var _buttonTxt = 'Next Question';

			if ( questionCount === ( currentQuestion + 1 ) ) {
				_buttonTxt = 'Finish Quiz';
			}

			_info.push( '<form id="quizForm">' );
			_info.push( '<p>' + infoStr + '</p>' );
			_info.push( '<button id="nextQuestion" type="submit" class="btn btn-default">' + _buttonTxt + '</button>' );
			_info.push( '</form>' );

			return _info.join( '\n' );
		};


		// question rendering
		var questionHTML = function ( questionStr, $answers ) {

			var _form = [ '<form id="quizForm">' ];
			var _question = '<p>' + questionStr + '</p>';
			var _buttonTxt = 'next';
			if ( questionCount === ( currentQuestion + 1 ) && infoMode ) {
				_buttonTxt = "Finish Quiz";
			}

			var _button = '<button id="nextQuestion" type="submit" class="btn btn-default">' + _buttonTxt + '</button>';

			_form.push( _question );

			$.each( $answers, function ( index, object ) {

				var _answer = [ '<div class="radio">', '<label>',
                    '<input type="radio" name="quizAnswer" required value="' + object.score + '">',
                object.answer, '</label>', '</div>' ];

				_form.push( _answer.join( '\n' ) );
			} );

			_form.push( _button );
			_form.push( '</form>' );

			return _form.join( '\n' );
		};

		// INITIALISE THE QUIZ:

		var init = function () {

			// show loading
			$placeHolder.html( '<img src="' + loadingGif + '"/>' );

			// get json
			var requestData = getQuizData( dataSource ).then( function ( data ) {

				// take a count of the number of questions
				questionCount = data[ 0 ].questions.length;

				// handles in memory json
				gotData = true;
				inMemoryData = data;

				return data;
			} );

			// show question
			if ( gotData ) {

				setTimeout( function () { // timer NOT required
					var content = getHTML( inMemoryData, currentQuestion );
					return $placeHolder.html( content );
				}, 500 );

			} else {

				requestData.done( function ( data ) {
					var content = getHTML( data, currentQuestion );
					return $placeHolder.html( content );
				} );
			}

			// error handler
			requestData.fail( function ( error ) {
				console.log( 'Request data error: ' + error );
				return $placeHolder.html( "<p>Sorry, we are unable to retrieve the data for this quiz.</p>" );
			} );

		};

		// EXPOSED API
		return {
			init: init,
			bindSubmit: bindSubmit
		};
	};

	quiz().init();
	quiz().bindSubmit();

}( jQuery ) );
