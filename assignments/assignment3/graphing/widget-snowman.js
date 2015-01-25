var art = [
   "   ___   ",
   "  _|_|_  ",
   "  (• •)  ",
   " (     ) ",
   "(       )"
];

module.exports.drawSnowMan = function(Guess) {
	var list = [];
	var levels = Guess.getMissed();
	for(var i = 0; i < art.length; i++) {
		if(i > art.length-1-levels) {
			list.push(art[i]);
		} else {
			list.push("");
		}
	}
	
	return list;
}