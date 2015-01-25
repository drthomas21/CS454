module.exports.drawWords = function(Word,Guess) {
	var list = [];
	var word = Word.word;
	var guesses = Word.getGuesses();
	var alph = Word.alph;
	console.log("Your guesses: " + guesses.join(' '));
	guesses.forEach(function(letter) {
		var index = alph.join('').indexOf(letter);
		alph[index] = '|';		
	});
	word = word.replace(new RegExp("["+alph.join('')+"]",'g'),'_').split('').join(' ');
	if(word.indexOf('_') == -1) {
		Word.userCompletedWord();
	}
	list[0] = word;
	list[1] = "Misses left " + Guess.getMissed() + " out of " + Guess.getMaxed();
	
	return list;
}