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
	var timerID = null;
	var questionCounter = 0;
	var correctAnsCount = 0;
	var incorrectAnsCount = 0;
	var unansweredCount = 0;
	var $triviaQandA = $('#triviaQandA');
	var $question = $('#question');
	var $answerBtn = $('.answerBtn');
	var $timer = $('#timer');
	var $results = $('#results');

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
	});

	$(document).on('click', '.resetBtn', function() {
		resetTrivia();
		$('.startScreen').show();
	});

	function resetTimer() {
		clearInterval(timerID); 

		var time = 10;
		timerID = setInterval(timer, 1000); //1000 will run it every 1 second

		function timer() {

  			if (time <= 0 && questionCounter < 7) {
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
    	if (questionCounter < 7) {
    		$question.show();
			$answerBtn.show();
			$timer.show();
    		$question.text(questionsAndAnswers[questionCounter].question);
    	}
    	else {
    		endTrivia();
    	}
    }

    function displayAnswerChoices() {
    	if (questionCounter < 7) {
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

    	questionCounter++;

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
    		unansweredCount ++;
    		wrongAnsDiv.text('Time ran out! The answer is ' + 
    			questionsAndAnswers[questionCounter].choices[correctAnsIndex]);
    	}
    	else {
    		incorrectAnsCount++;
    		wrongAnsDiv.text('Wrong! The correct answer is ' + 
    			questionsAndAnswers[questionCounter].choices[correctAnsIndex]);
    	}

    	$triviaQandA.append(wrongAnsDiv);

    	timeRanOut = false;
    	questionCounter++;

    	setTimeout(function() {
    		displayQuestion();
    		displayAnswerChoices(); 
    		wrongAnsDiv.remove();
    	}, 2000);

    	setTimeout(function() {
    		resetTimer();
    	}, 1000);
    }

    function endTrivia() {
    	$triviaQandA.hide();
    	$question.hide();
		$answerBtn.hide();
		$timer.hide();

		var resultsDiv = $('<div>');
		resultsDiv.addClass('h1');
		resultsDiv.text("Quiz Over! Here's how you did:");

		var correctAnsDiv = $('<div>');
		correctAnsDiv.text('Correct Answers: ' + correctAnsCount);

		var incorrectAnsDiv = $('<div>');
		incorrectAnsDiv.text('Incorrect Answers: ' + incorrectAnsCount);

		var unansDiv = $('<div>');
		unansDiv.text('Unanswered: ' + unansweredCount);

		$results.append(resultsDiv);
		$results.append(correctAnsDiv);
		$results.append(incorrectAnsDiv);
		$results.append(unansDiv);

		var resetButton = $('<button>').addClass('btn btn-primary btn-lg resetBtn').text('Start Over?');
		$('#reset').append(resetButton);
    }

    function resetTrivia() {
		timeRanOut = false;
		questionCounter = 0;
		correctAnsCount = 0;
		incorrectAnsCount = 0;
		unansweredCount = 0;
		$('#reset').empty();
		$results.empty();
    }
});