var yargs = require('yargs');
var inquirer = require('inquirer');
var mongoose = require("mongoose");
var express = require("express");

var args = yargs.usage("Usage:\r\nnode app.js -e\r\nnode app.js --user [user] --pwd [pwd] [--host [localhost]] [--port [1207]] ")
				.options('help',{
						alias: 'h',
						describe: 'Display this help message'
				})
				.options('express',{
						alias: 'e',
						describe: 'Launch the application as a web app'
				})
				.options('host',{
						describe: 'The host of the Mongo DB'
				})
				.options('port',{
						describe: 'The port of the Mongo DB'
				})
				.options('user',{
						describe: 'The username of the Mongo DB'
				})
				.options('pwd',{
						describe: 'The password of the Mongo DB'
				})
				.argv;

if(args.express) {
	//Launch Express
} else if(args.username && args.pwd) {
	//Launch Connection
} else {
	yargs.showHelp();
	process.exit(0);
}
