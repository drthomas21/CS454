var list = [1,2,3];
console.log(list);
console.log(list[0]);

console.log('');

var greetings = [];
greetings.push('hello');
greetings.push('hey','howdy');
console.log(greetings);

console.log('');

for(i = 0; i < greetings.length; i++) {
	console.log(greetings[i]);
}

console.log('');

greetings.forEach(function(value) {
	console.log(value);
});

console.log('');

console.log(greetings);
console.log(greetings.join('|'));

console.log('');

console.log(greetings.pop());
console.log(greetings);
