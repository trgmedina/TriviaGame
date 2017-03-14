$(document).ready( function() {

	var timer;
	var questionsAndAnswers = [{
		question: "What is Hermione's middle name?",
		choices: ["Anne", "Jean", "Mary", "Kat"], 
		correctAnswer: 1 
	}, {
		question: "What is the name of the sport that all wizards love?",
		choices: ["Quidditch", "Gobstones ", "Wizard Chess", "Soccer"],
		correctAnswer: 0 
	}, {
		question: "Who does Harry Potter marry?",
		choices: ["Hermione Granger", "Luna Lovegood", "Cho Chang", "Ginny Weasley"],
		correctAnswer: 3 
	}, {
		question: "What is Mr. Malfoy's first name?",
		choices: ["Scorpius", "Albus", "Lucius", "Peter"],
		correctAnswer: 2 
	}, {
		question: "Who was the half-blood prince?",
		choices: ["Prof. Snape", "Harry Potter", "Ron Weasley", "Neville Longbottom"],
		correctAnswer: 0
	}, {
		question: "What was the former name of Lord Voldemort?",
		choices: ["Sirius Black", "Tom Riddle", "Remus Lupin", "Peter Pettigrew"],
		correctAnswer: 1
	}, {
		question: "What is the name of the wizards prison?",
		choices: ["Azkaban", "Inferi", "Peverell", "Humbdinger"],
		correctAnswer: 0
	}];

	var triviaEnd = false;
	var timeRanOut = false;
	var userWrong = false;
	var timerID = null;
	var questionCounter = 0;
	var correctAnsCount = 0;
	var incorrectAnsCount = 0;
	var unansweredCount = 0;
	var $triviaQandA = $('#triviaQandA');
	var $question = $('#question');
	var $answerBtn = $('.answerBtn');
	var $timer = $('#timer');

	//console.log(questionCounter);

	$triviaQandA.hide();

    $(document).on('click', '.startButton', function() {
    	$('.startScreen').hide();

    	resetTimer();

		setTimeout (function() {
			displayQuestion();
			displayAnswerChoices();
			$triviaQandA.show();
		}, 1000);
	});

	$(document).on('click', '.answerBtn', function(e) {

		var inputId = this.id;
		var userGuess = 0;

		//console.log(inputId);

		if (inputId === 'choice0') {
			userGuess = 0;
		}
		else if (inputId === 'choice1') {
			userGuess = 1;
		}
		else if (inputId === 'choice2') {
			userGuess = 2;
		} 
		else {
			userGuess = 3;
		}

		//console.log(userGuess);

		if (userGuess === questionsAndAnswers[questionCounter].correctAnswer) {
			showUserCorrect();
		}
		else {
			showWrongOrUnans();
		}

		questionCounter++;
	});

	function resetTimer() {
		clearInterval(timerID); 

		var time = 10;
		
		timerID = setInterval(timer, 1000); //1000 will run it every 1 second

		function timer() {

  			if (time <= 0) {
  				clearInterval(timerID);
    			timeRanOut = true;
    			showWrongOrUnans();
     			return;
  			}

  			$timer.text('Time Remaining: ' + time + ' Seconds');
  			time = time - 1;
		}
	}

    function displayQuestion() {
    	$question.show();
		$answerBtn.show();
		$timer.show();

    	if (questionCounter < 8) {
    		$question.text(questionsAndAnswers[questionCounter].question);
    	}
    }

    function displayAnswerChoices() {
    	if (questionCounter < 8) {
    		for (var i=0; i < 4; i++) {
    			$('#choice' + i).text(questionsAndAnswers[questionCounter].choices[i]);
    		}
    	}
    }

    function showUserCorrect() {
    	//console.log('Correct');
    	$question.hide();
		$answerBtn.hide();
		$timer.hide();

    	correctAnsCount++;

    	var correctAnsDiv = $('<div>');
    	correctAnsDiv.addClass('h1');
    	correctAnsDiv.text('Hooray! You are correct!');
    	$triviaQandA.append(correctAnsDiv);

    	setTimeout(function() {
    		displayQuestion();
    		displayAnswerChoices(); 
    		correctAnsDiv.remove();
    	}, 2000);

    	setTimeout(function() {
    		resetTimer();
    	}, 1000);
    }

    function showWrongOrUnans() {
    	//console.log('Incorrect')
    	$question.hide();
		$answerBtn.hide();
		$timer.hide();

    	var correctAnsIndex = questionsAndAnswers[questionCounter].correctAnswer;

    	var wrongAnsDiv = $('<div>');
    	wrongAnsDiv.addClass('h1');

    	if (timeRanOut === true) {
    		wrongAnsDiv.text('Time ran out! The answer is ' + 
    			questionsAndAnswers[questionCounter].choices[correctAnsIndex]);
    	}
    	else {
    		wrongAnsDiv.text('Wrong! The correct answer is ' + 
    			questionsAndAnswers[questionCounter].choices[correctAnsIndex]);
    	}

    	$triviaQandA.append(wrongAnsDiv);

    	setTimeout(function() {
    		displayQuestion();
    		displayAnswerChoices(); 
    		wrongAnsDiv.remove();
    	}, 2000);

    	setTimeout(function() {
    		resetTimer();
    	}, 1000);
    }


});