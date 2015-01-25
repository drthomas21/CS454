var yargs = require('yargs');
var app = require('./app');

var flags = yargs.usage('Usage node cli.js --file [file.txt]')
	.boolean('file', {
		describe: 'List of files to word count'
	})
	.argv;

if(flags.file && flags._) {
	app.async(flags._);
}
