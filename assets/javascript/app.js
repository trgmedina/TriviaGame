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
	var questionCounter = 0;
	var correctAnswerCount = 0;
	var incorrectAnswerCount = 0;
	var unansweredCount = 0;

	console.log(questionCounter);

    $(document).on('click', '.startButton', function() {
    	$('.startScreen').css('visibility', 'hidden');

    	var time = 30;
		var timerID = setInterval(timer, 1000); //1000 will run it every 1 second

		function timer() {
  			if (time <= 0) {
    			clearInterval(time);
     			return;
  			}

  			$('#timer').text('Time Remaining: ' + time + ' Seconds');
  			time = time - 1;
		}

		setTimeout (function() {
			displayQuestion();
			displayAnswerChoices();
			$('#triviaQandA').css('visibility', 'visible');
		}, 1000);
	});

    function displayQuestion() {
    	if (questionCounter < 8) {
    		$('#question').text(questionsAndAnswers[questionCounter].question);
    	}
    }

    function displayAnswerChoices() {
    	if (questionCounter < 8) {
    		for (var i=0; i < 4; i++) {
    			$('#choice' + i).text(questionsAndAnswers[questionCounter].choices[i]);
    		}
    		questionCounter++;
    	}
    }
});