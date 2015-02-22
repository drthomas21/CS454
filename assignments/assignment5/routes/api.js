var config = require("../config.json");
var superagent = require('superagent');
var crypto = require('crypto');

module.exports = function(server) {
	server.get('/api/search',function(req,res) {
		var timestamp = (new Date()).getTime();
		superagent
			.get(config.api.request_url+"/v1/public/characters")
			.query({"nameStartsWith":req.query.name})
			.query({"ts":timestamp})
			.query({"apikey":config.api.public_key})
			.query({"hash":crypto.createHash('md5').update(timestamp+config.api.private_key+config.api.public_key).digest('hex')})
			.end(function(error,result) {
				res.json({
					success: result.statusCode >= 200 && result.statusCode < 400,
					results: result.body
				});
			});
	});
};