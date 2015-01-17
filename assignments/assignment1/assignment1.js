//Question 1
/**
 * @param string string
 */
var reflection = function(string) {
	if(typeof(string) != "string") {
		if(string && typeof(string) == "object") {
			string = string.toString();
		} else if(string) {
			string = string + "";
		} else {
			console.log("Please pass in a string only");
			console.log('');
			return;
		}
	}
	var response = string + " ";
	for(var index = string.length-1; index >= 0; index--) {
		response += string.charAt(index);
	}
	
	console.log("Question 1: " + response);
	console.log('');
};
reflection('loop');

//Question 2
/**
 * @param number start
 * @param number end
 * @param number spread
 */
var pattern = function(start, end, spread) {
	/**
	 * Lets make sure that we are dealing with only numbers
	 */
	if(isNaN(start) || isNaN(end) || isNaN(spread)) {
		console.log('Please pass in numbers only');
		console.log('');
		return;
	}
	var response = [];
	while(start <= end) {
		response.push(start);
		start += spread;
	}
	
	console.log("Question 2: " + response.join(', '));
	console.log('');
};
pattern(10,100,5);

//Question 3
/**
 * @param Array list
 */
var addAll = function(list) {
	/**
	 * Lets make sure that we are dealing with an Array
	 */
	if(typeof(list.length) == "undefined") {
		console.log('Please pass in an Array');
		console.log('');
	}
	var response = 0;
	list.forEach(function(value) {
		response += value;
	});
	
	console.log("Question 3: " + response);
	console.log('');
};
addAll([1,32,53,2,455,2,31,45,56,6,88,34]);

//Question 4
var fooBar = function() {
	var response = [];
	for(var i = 1; i <= 100; i++) {
		response[i] = ""
		if(i % 3 == 0 && i % 7 == 0) {
			response[i] = "FooBar";
		} else if(i % 7 == 0) {
			response[i] = "Bar";
		} else if(i % 3 == 0) {
			response[i] = "Foo";
		} else {
			response[i] = i
		}
	}
	
	console.log("Question 4: " + response.join(', '));
	console.log('');
};
fooBar();

//Question 5
/**
 * @param Object object
 */
var objectSize = function(object) {
	/**
	 * Lets make sure that we are dealing with an Object
	 */
	if(typeof(object) != "object") {
		console.log("Please pass an object");
	} else {
		console.log("Question 5: " + Object.keys(object).length);
	}
	console.log('');
} 
var dog = {
		name: 'Snoopy',
		owner: 'Charlie Brown',
		friend: 'Woodstock'
};
objectSize(dog);

//Question 6
/**
 * @param Array list
 * @param number tip
 */
var tipCalculator = function(list,tip) {
	var response = [];
	response.totalPaid = 0;
	/**
	 * Lets make sure we have the correct arguments
	 */
	if(typeof(list.forEach) == "undefined" || isNaN(tip)) {
		console.log("Please pass the proper arguments");
		console.log('');
		return
	}
	
	list.forEach(function(Item) {
		/**
		 * Lets make sure we have the correct properties
		 */
		if(typeof(Item.name) == "string" && !isNaN(Item.bill)) {
			var paid = Math.round(Item.bill * (1+(tip/100))).toFixed(2) ;
			response.push({name: Item.name, paid: paid});
			response.totalPaid = (parseFloat(response.totalPaid) + parseFloat(paid)).toFixed(2);
		} else {
			console.log("The list is missing properties(s)");
			console.log('');
			return;
		}
	});
	
	console.log("Question 6: ", response);
	console.log('');
};

var dinner = [
  { name: 'Cyd', bill: 22.54 },
  { name: 'Andrea', bill: 18.39 },
  { name: 'Andy', bill: 15.29 },
  { name: 'Stevi', bill: 25.11 }
];
tipCalculator(dinner,20);

//Question 7
/**
 * @param number number
 */
var getFibonacci = function(maxLength) {
	var response=[];
	var fib = [1,1];
	var helper = function(list,maxLength) {
		var num = list[list.length-1] + list[list.length-2];
		list.push(num);
		if(list.length < maxLength) {
			list = helper(list,maxLength);
		}
		
		return list;
	};
	/**
	 * Lets make sure we have the correct argument
	 */
	if(isNaN(maxLength)) {
		console.log("Please pass in the proper argument");
		console.log('');
		return;
	}
	
	if(fib.length <= maxLength) {
		fib = helper(fib,maxLength);
	}
	
	fib.slice(0,maxLength).forEach(function(value) {
		response.push(value);
	});	
	
	console.log("Question 7: ", response);
	console.log('');
};
getFibonacci(10);
