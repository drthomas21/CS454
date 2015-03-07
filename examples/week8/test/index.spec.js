var app = require('../app');
var chai = require('chai');

var expect = chai.expect;

describe('app.js conversion',function() {
	it('should have defined functions',function(done){
		expect(app).to.have.property('arrayToObject');
		expect(app).to.have.property('toCamelCase');
		done();
	});
	
	describe('arrayToObject()',function() {
		it('should return an object from a 2D array', function(done) {
			var testValue = [
				['social media','facebook'],
				['company','github'],
				['likes',48000]
			];			
			var result = app.arrayToObject(testValue);
			expect(result).to.not.have.property('social media');
			expect(result).have.property('socialMedia','facebook');
			expect(result).have.property('company','github');
			expect(result).have.property('likes',48000);
			
			done();
		});
		
		it('should return an error when given an object', function(done) {
			var testValue = {
				'social media': 'facebook',
				'company': 'github',
				'likes': 48000
			};
			
			var result = app.arrayToObject(testValue);
			expect(result).to.be.instanceof(Error);
			expect(result.message).to.equal('Argument must be an array');
			
			done();
		});
		
		it('should return an object containing only 2D arrays key/values',function(done) {
			var testValue = ['social media','facebook','company','github',['likes',48000]];
			
			var result = app.arrayToObject(testValue);
			expect(result).to.have.property('likes',48000);
			expect(result).to.not.have.property('s');
			
			done();
		});
	});
	
	describe('toCamelCase()',function() {
		it('should return a camel cased string',function(done) {
			var testValue = "hello world_itS_Me";
			
			var result = app.toCamelCase(testValue);
			expect(result).to.equal("helloWorldItsMe");
			
			done();
		});
		
		it('should return an error when given an object',function(done) {
			var testValue = ['hello','world'];
			
			var result = app.toCamelCase(testValue);
			expect(result).to.be.instanceOf(Error);
			expect(result.message).to.equal('Argument must be a string');
			
			done();
		});
	});
});

