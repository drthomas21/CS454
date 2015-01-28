var fs = require('fs');

module.exports.async = function(files) {
	files.forEach(function(file){
		fs.readFile(file,{encoding: 'utf8'},function(err,data) {
		        if(err) console.log(err);
	        	
			var wc = data.split(' ').length;
			console.log('async ' + file + ': word count: ' + wc );
		});
	});
}
