var resume = {
	name: 'Cydney Auman',
	email: 'cydneyauman@gmail.com',
	position: 'Software Engineer',
	skills: ['Node.js','Angular.js','MongoDB','SQL'],
	education: {
		school: 'CSULA',
		degree: 'MS',
		field: 'Computer Science'
	}
};

for(var key in resume) {
	console.log(key ,  " is " ,  resume[key]);
}

console.log('');

Object.keys(resume).forEach(function(key) {
	console.log(key , " is ", resume[key]);
});
