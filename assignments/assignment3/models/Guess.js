module.exports.Guess = function() {
	var missed = 0;
	var maxed = 0;
	
	this.setMax = function(num) {
		maxed = num;
	};
	
	this.incorrectGuess = function() {
		missed += 1;
	};
	
	this.getGuessesLeft = function() {
		return maxed-missed;
	};
	
	this.getMissed = function() {
		return missed;
	}
	
	this.getMaxed = function() {
		return maxed;
	}
};