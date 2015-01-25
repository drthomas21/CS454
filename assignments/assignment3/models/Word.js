module.exports.Word = function() {
	this.word = '';
	this.alph = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	var guesses = [];
	var completed = false;
	
	var addToGuesses = function(letter) {
		if(guesses.indexOf(letter) < 0)
			guesses.push(letter);
	};
	
	this.isLetterInWord = function(letter,Guess) {
		if(this.word.indexOf(letter) == -1) {
			Guess.incorrectGuess();
			console.log("Nope!");
		} else {
			console.log("Good Guess...");
		}
		
		addToGuesses(letter);
		return Guess;
	};
	
	this.getGuesses = function() {
		return guesses;
	};
	
	this.userCompletedWord = function() {
		completed = true;
	};
	
	this.isCompleted = function() {
		return completed;
	}
};