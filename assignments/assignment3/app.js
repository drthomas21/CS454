var fs = require('fs');
var yargs = require('yargs');
var inquirer = require('inquirer');
var Word = require('./models/Word');
var Guess = require('./models/Guess');
var snowmanWidget = require('./graphing/widget-snowman');
var wordWidget = require('./graphing/widget-word');

var args = yargs.usage("Usage node app.js <arguments>")
				.options('help',{
					alias: 'h',
					describe: 'Display this help message'
				})
				.options('dict',{
					alias: 'd',
					describe: 'Use another dictionary besides the default one'
				})
				.options('nogui',{
					alias: 'n',
					describe: 'Disables the graphing portion of the GUI'
				})
				.argv;

var SnowMan = function() {
	/**
	 * Class Variables
	 */
	var dictPath = "./dictionaries/word-list.dic";
	var showGui = true;
	var words = [];
	var usedWords = [];
	var word = null;
	var maxGuesses = 5;
	
	/**
	 * Private Functions
	 */
	var loadWords = function() {
		var data = fs.readFileSync(dictPath,{encoding: 'utf8'});
		data = data.replace(/[\r\n\s]+/g,'|');
		words = data.split('|');
	};
	
	var getWord = function() {		
		var index = -1;
		while(!words[index] || (words[index] && usedWords.indexOf(words[index]) >= 0)) {
			index =  Math.floor((Math.random() * words.length));
		}
		
		var word = words[index];
		usedWords.push(word);
		if(usedWords.length > (words.length/1.5)) {
			usedWords = [];
		}
		return word;
	};
	
	var welcomeMessage = function() {
		console.log("Welcome to the game: SNOWMAN!!!!");
		console.log("          -- created by dathomas");
		console.log("--------------------------------");
		console.log("");
	};
	
	var autoLoop = function() {
		word = new Word.Word();
		word.word = getWord();
		word.word = word.word.toLowerCase();
		
		var guess = new Guess.Guess();
		guess.setMax(maxGuesses);
		
		console.log("Let us begin....");		
		
		receiveGuesses(word,guess);
	};
	
	var roundEndMessage = function(message) {
		inquirer.prompt([{
			type: "confirm",
			name: "confirm",
			message: message + "  Play again?",
		}], function(input){
			if(input.confirm) {
				autoLoop();
			} else {
				console.log("Good Bye!");
			}
		});
	}
	
	var receiveGuesses = function(word,guess) {
		var lines = []
		lines.push(wordWidget.drawWords(word,guess));
		
		if(snowmanWidget) {
			lines.push(snowmanWidget.drawSnowMan(guess));
		}
		
		console.log(formatWidgets(lines));
		if(guess.getMissed() >= guess.getMaxed()) {
			//User lost
			roundEndMessage("You lose!!! The word was ["+word.word+"]");
		} else if(word.isCompleted()) {
			//User won
			roundEndMessage("You win!!!");
		} else {
			inquirer.prompt([{
				type: "input",
				name: "letter",
				message: "Which letter to guess...",
				validate: function(input) {
					if(typeof(input.charAt) != "function" || input.replace(/[A-Za-z]+/,'').length > 0 || input.length > 1 || input.length == 0) {
						return "Please input a single letter";
					} else if(word.getGuesses().join('').indexOf(input) >= 0) {
						return "You have already guess that letter, try again";						
					}
					return true;
				}
			}], function(input){
				word.isLetterInWord(input.letter,guess);
				receiveGuesses(word,guess);
			});
		}
	}
	
	var formatWidgets = function(lines) {
		var maxedRow = 0;
		var maxedCol = 0;
		lines.forEach(function(arr) {
			if(arr.length > maxedRow) {
				maxedRow = arr.length;
			}
			
			arr.forEach(function(str) {
				if(str.length > maxedCol) {
					maxedCol = str.length;
				}
			});
		});
		
		var arr = [];
		for(var i = 0; i < lines.length; i++) {
			arr[i] = [];
			var offset = maxedRow - lines[i].length;
			for(var j = 0; j < maxedRow; j++) {
				if(j >= offset) {
					arr[i][j] = lines[i][j-offset];
					for(var k = arr[i][j].length; k < maxedCol; k++) {
						arr[i][j] += " ";
					}
				} else {
					arr[i][j] = "";
					for(var k = 0; k < maxedCol; k++) {
						arr[i][j] += " ";
					}
				}
			}
		}
		
		var str = "";
		for(var i = 0; i < arr[0].length; i++) {
			str += arr[0][i];
			if(arr[1]) {
				str += " | " + arr[1][i];
			}
			str += "\r\n";
		}
		
		return str;
	};

	
	/**
	 * Public Functions
	 */
	this.configure = function(path,gui) {
		dictPath = (path && typeof(path.charAt) == "function") ? path : dictPath;
		showGui = (typeof(gui) == "boolean") ? gui : showGui;
	};
	
	this.run = function() {
		loadWords();
		if(!showGui) {
			snowmanWidget = null; 
		}
		
		welcomeMessage();
		autoLoop();
	};
};

var app = new SnowMan();
app.configure(args.path,args.nogui);
app.run();