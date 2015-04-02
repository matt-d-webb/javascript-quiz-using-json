/*
      Version: 0.0.1
         Date: 11/03/2015
       Author: Matthew D Webb
      Website: http://www.searchlaboratory.com/
  Description: json quiz score calculator
 Dependencies: JQuery 2.1.0 (cdn here: https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js)
 */

;(function ($, undefined) {

    'use strict';

    // GLOBAL:
    var $placeHolder = $('#quiz'),
        loadingGif = './img/loading.gif',
        dataSource = './data/data.json',
        currentQuestion = 0,
        questionCount = 0,
        answerArray = [],
        infoMode = false,
        gotData = false,
        inMemoryData = [{"questions":[{"question":"Are you?","includeInfo":true,"info":"Men take less time to settle into a new house, taking a year and a half on average, compared to the 14.2 months it takes women.","answers":[{"answer":"Female","score":1},{"answer":"Male","score":2}]},{"question":"Are you?","includeInfo":false,"info":"Almost a third of 18-24 year-olds say they do not feel their house is a home. Less than a tenth of people over 55 agree.","answers":[{"answer":"18-24","score":4},{"answer":"25-44","score":3},{"answer":"45-54","score":2},{"answer":"55+","score":1}]},{"question":"You drop a slice of toast on the floor. You...","includeInfo":true,"info":"Men are twice as likely as women to feel that being able to eat food off the floor shows that their house is a home.","answers":[{"answer":"Pick it up straight away and chuck it in the bin ","score":4},{"answer":"Think that anything under 10 seconds is ok, so you still eat it ","score":3},{"answer":"Follow the five-second rule, it’s fair game!","score":2},{"answer":"Blow off the dust and eat it no matter how long it has been there. It’s not going to kill me, is it?! ","score":1}]},{"question":"Your favourite TV show is about to start. You...","includeInfo":true,"info":"Having a set spot on the sofa matters the most to those between 35 and 44, and the least to people over 55.","answers":[{"answer":"See that your friends have taken all the seats. No worries, you’d rather sit on the floor than ask someone to move ","score":4},{"answer":"Sit in the nearest free space, you’re not picky ","score":3},{"answer":"Run to your spot. Everybody knows that’s where you sit and that’s how it will stay. How would watching TV ever be the same sat somewhere different? ","score":1},{"answer":"See that someone is in the spot you like. You try to convince them to move, but give in and sit elsewhere ","score":2}]},{"question":"You are in the house alone at night and hear a weird noise from downstairs. You...","includeInfo":true,"info":"Not being scared of weird noises is a woman’s top indicator that her house is a home","answers":[{"answer":"Freak out and grab the baseball bat at the side of your bed ","score":4},{"answer":"Roll over and go back to sleep. You know it is just the pipes ","score":1},{"answer":"Don’t think there’s anything to worry about, but you sleep with the lamp on just in case ","score":2},{"answer":"Sit up straight away and get your partner or housemate to investigate ","score":3}]},{"question":"You see your neighbour on your way to the front door. You...","includeInfo":true,"info":"this is some content for question 6","answers":[{"answer":"Say hello, you are on first-name terms","score":1},{"answer":"Nod in acknowledgement, as you only know them by the nickname you have assigned them ","score":2},{"answer":"Smile politely, as you have seen them a couple of times before","score":3},{"answer":"Ignore them and go straight in the door without a moment of eye contact","score":4}]},{"question":"You need to find the tape measure for a spot of DIY. You...","includeInfo":true,"info":"People in Cambridge say that knowing their way around the cupboards is the true sign that their house has become a home. Across the country, only 10% of people agreed with this.","answers":[{"answer":"Know exactly where it is straight away ","score":4},{"answer":"Think of a few places it could be and check them all ","score":3},{"answer":"Vaguely remember seeing it, but to find it you need to overturn the house ","score":2},{"answer":"Have absolutely no idea and decide it would be easier to buy a new one ","score":1}]},{"question":"The bins are getting full. You...","includeInfo":true,"info":"Only 6% of people placed any importance on knowing the bin schedule.","answers":[{"answer":"Know when your waste and recycling bins go out. You’ve never missed a collection ","score":1},{"answer":"Know when they are collected, but you always miss them ","score":3},{"answer":"Know your waste bin collection day, but the recycling day is a mystery ","score":2},{"answer":"Just leave them out all the time, in the hope someone will take them one day ","score":4}]},{"question":"Your house smell is...","includeInfo":true,"info":"??","answers":[{"answer":"Warm and comforting like home cooking ","score":1},{"answer":"Sterile like bleach and cleaning products ","score":2},{"answer":"Stale like bin juice","score":4},{"answer":"Non-existent, I don’t know what it smells like ","score":3}]},{"question":"At Christmas you","includeInfo":true,"info":"One in ten think that the best sign that your house has become a home, is when you have spent a Christmas there.","answers":[{"answer":"Spend it elsewhere, from start to finish  ","score":4},{"answer":"Wake up at your house but leave shortly after  ","score":3},{"answer":"Alternate between your house and others each year","score":2},{"answer":"Always spend it at your own house  ","score":1}]}]},{"results":[{"title":"The Exhibitionist","description":"You are the king in your castle, and nothing will make you feel awkward in those four walls! You’re happy to walk around in the buff, go to the toilet with the door open, and you wouldn’t think twice about eating a slice of toast that you dropped on the floor. We congratulate you in your achievement, but advise you keep the curtains closed for your neighbour’s sake!","image":"./img/the-end.jpg","minScore":0},{"title":"The Occasional Strutter","description":"You don’t mind doing the occasional strut in your underwear to retrieve your jeans from the dryer, but you’d rather avoid it. You follow the ten-second rule when food drops on the floor, and you aren’t scared of the weird noises coming from the pipes, but you are still to master going to the toilet with the door open. You are so close to being completely comfortable in your surroundings but there is still as little way to go. To help bridge the gap, take a look at our simple guide to making your house a home.","image":"./img/the-end.jpg","minScore":11},{"title":"The Mad Dasher","description":"You will only ever show flesh in the mad dash between your bathroom and bedroom, when you’re sure nobody is around. You’re likely to have a place reserved on the sofa, but there isn’t a chance you know which draw the Sellotape is in, or what your neighbour’s name is. There is still a lot of work to be done before you’re truly settled. To help you along the way, take a look at our guide to making your house a home.","image":"./img/the-end.jpg","minScore":21},{"title":"The Sock Lover","description":"You really don’t feel at home and you’re likely to feel risky just having your socks off! You don’t have a set spot on the sofa and you certainly don’t leave the door open when you go to the toilet. You have a long way to go before you will be hanging plants outside. Aside from cranking up the underfloor heating, start to feel comfy by checking out our guide to making your house a home.","image":"./img/the-end.jpg","minScore":31}]}];

    // QUIZ LOGIC:
    var quiz = function () {

        // private methods:
        var getQuizData = function (url) {

            var promise = $.getJSON(url);
            return promise;
        };

        var getScore = function () {

            var score = 0;

            $(answerArray).each(function (index, object) {
                score += parseInt(object[0].value, 10);
            });
            return score;
        };

        var updateScore = function (userAnswer) {
            console.log(userAnswer);
            answerArray.push(userAnswer);
        };

        var getHTML = function (data, currentQuestion) {

            var content, complete = true;

            $(data).each(function (index, object) {

                $(object.questions).each(function (index, object) {
                    if (infoMode) {
                        if (currentQuestion === index) {
                            infoMode = false;
                            complete = false;
                            content = infoHTML(object.info);
                        }
                    } else {
                        if (currentQuestion === index) {
                            complete = false;
                            content = questionHTML(object.question, object.answers);
                            if (object.includeInfo) infoMode = true;
                        }
                    }
                });
            });
            if (complete) { 
            	content = resultHTML();
            }
            return content;
        };

        // BIND EVENT:

        var bindSubmit = function () {

            $(document).on('submit', 'form', function (event) {
                event.preventDefault();
                next(this);
                quiz().init();
            });
        };

        // ITERATION LOGIC:

        var next = function ($this) {

            if (infoMode) {
                var userAnswer = $($this).serializeArray();
                updateScore(userAnswer);
            } else {
                currentQuestion += 1;
            }
        };

        // DISPLAY RENDERING:

        // final message
        var resultHTML = function () {

            var score = getScore();
            var message = resultMessage(score);
            var _result = [];

            _result.push('<h3> Quiz Complete </h3>');
            _result.push('<h4>' + message.title + '</h4>');
            _result.push('<p>' + message.description + '</p>');
			if(message.image) {
				_result.push('<div><img src="' + message.image + '"/></div>');
			}
            _result.push('<p>Your score was: ' + score + '</p>');
            _result.push('<p>Total questions: ' + questionCount + '</p>');

            return _result.join('\n');
        };

        var resultMessage = function (score) {

            var message = {};
            $(inMemoryData).each(function (index, object) {
                $(object.results).each(function (index, object) {
                    if (score >= object.minScore){ 
                    	message = object;
                    }
                });
            });
            return message;
        };
        // information rendering (after each question)
        var infoHTML = function (infoStr) {
            var _info = [];

            var _buttonTxt = 'Next Question';
            if (questionCount === (currentQuestion + 1)){
            	_buttonTxt = 'Finish Quiz';
            } 

            _info.push('<form id="quizForm">');
            _info.push('<p>' + infoStr + '</p>');
            _info.push('<button id="nextQuestion" type="submit" class="btn btn-default">' + _buttonTxt + '</button>');
            _info.push('</form>');

            return _info.join('\n');
        };
        // question rendering
        var questionHTML = function (questionStr, $answers) {

            var _form = ['<form id="quizForm">'];
            var _question = '<p>' + questionStr + '</p>';
            var _buttonTxt = 'next';
            if (questionCount === (currentQuestion + 1) && infoMode) {
            	_buttonTxt = "Finish Quiz";
            }
            var _button = '<button id="nextQuestion" type="submit" class="btn btn-default">' + _buttonTxt + '</button>';

            _form.push(_question);

            $.each($answers, function (index, object) {

                var _answer = ['<div class="radio">', '<label>',
                    '<input type="radio" name="quizAnswer" required value="' + object.score + '">',
                object.answer, '</label>', '</div>'];

                _form.push(_answer.join('\n'));
            });

            _form.push(_button);
            _form.push('</form>');

            return _form.join('\n');
        };

        // INITIALISE THE QUIZ:

        var init = function () {

            // show loading
            $placeHolder.html('<img src="' + loadingGif + '"/>');

            // get json
            var requestData = getQuizData(dataSource).then(function (data) {

                // take a count of the number of questions
                questionCount = data[0].questions.length;

                // handles in memory json
                gotData = true;
                inMemoryData = data;

                return data;
            });

            // show question
            if (gotData) {

                setTimeout(function () { // timer NOT required
                    var content = getHTML(inMemoryData, currentQuestion);
                    return $placeHolder.html(content);
                }, 500);

            } else {

                requestData.done(function (data) {
                    var content = getHTML(data, currentQuestion);
                    return $placeHolder.html(content);
                });
            }

            // error handler
            requestData.fail(function (error) {
	
		console.log('Request data error: ' + error);

                //fall back to in memory data:
                if(inMemoryData !== null){
                    console.log('Fall back plan initalised!');
                    questionCount = inMemoryData[0].questions.length;

                    var content = getHTML(inMemoryData, currentQuestion);
                    return $placeHolder.html(content);
                }
                
                return $placeHolder.html("<p>Sorry, we are unable to retrieve the data for this quiz.</p>");
            });

        };

        // EXPOSED API
        return {
            init: init,
            bindSubmit: bindSubmit
        };
    };

    quiz().init();
    quiz().bindSubmit();

}(jQuery));
