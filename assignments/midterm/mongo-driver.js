var mongoose = require("mongoose");

module.exports = function() {
	var username = "user";
	var password = "pwd";
	var host = "localhost";
	var port = 27017;
	var database = "";
	var driver = null;
	
	this.setUsername = function(u) {
		username = u;
	};
	
	this.setPassword = function(p) {
		password = p;
	};
	
	this.setHost = function(h) {
		host = h;
	};
	
	this.setPort = function(p) {
		port = p;
	};
	
	this.setDatabase = function(d) {
		database = d;
	};
	
	this.connect = function() {
		if(driver) {
			try {
				driver.disconnect();
			} catch(e) {
				//Do nothing
			}
		}
		driver = mongoose.connect("mongodb://"+username+":"+password+"@"+host+":"+port+"/"+database);
	}
	
	var that = this;
};
