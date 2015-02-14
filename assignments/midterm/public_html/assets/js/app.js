'use strict';
var app = angular.module('app', ['ui.bootstrap']);

app.controller('Controller',['$scope','$sce',function($scope,$sce) {
	$scope.tabs = [
           {
        	   header: 'Pablo',
        	   content: "<h2>1. Explain what is your node module</h2><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mongoose is the Node module that we are presenting. MongoDB is the database, which is a NoSQL database that stores data in BSON documents. (like JSON, where you have a key and value). NoSQL means it’s not a traditional relational database. You can think of these documents as rows in an SQL database. According to their website 30 of the world's 100 largest organizations use it.</p>" +
        	   			"<h2>2. What problem or problems does your node module solve when using it inside a node application?</h2><p>It can manage data of any structure, no matter how often it changes or it where it comes from. It is best for applications with unstructured, semi-structured and polymorphic data, as well as applications with large scalability requirements.</p>",
           }, {
        	   header: 'David',
        	   content: "<h2>3. Are there any competitor modules - meaning modules that do the same thing or something very similar? If so what are they? How are they different? Are they better or worse?</h2>" +
        	   		"<ul>" +
        	   		"	<li><strong>node-mongodb-native <small>(by MongoDB)</small></strong>" +
        	   		"		<ul>" +
        	   		"			<li><a href='http://docs.mongodb.org/ecosystem/drivers/node-js/'>http://docs.mongodb.org/ecosystem/drivers/node-js/</a></li>" +
        	   		"			<li>Core library of Mongoose and many other packages that are used to connect to a MongoDB, but this package can be used outside of Mongoose and therefore it is a competitor</li>" +
        	   		"			<li>Very simplistic (as in complex) CRUD controls (relies more on callbacks)</li><li>can connect to multiple MongoDB (Replication Sets)</li>" +
        	   		"			<li><code><pre>" +
        	   		"var MongoClient = require('mongodb').MongoClient\r\n" +
        	   		"	, assert = require('assert');\r\n\r\n" +
        	   		"// Connection URL\r\n" +
					"var url = 'mongodb://localhost:27017/myproject';\r\n\r\n" +
					"// Use connect method to connect to the Server\r\n" +
					"MongoClient.connect(url, function(err, db) {\r\n" +
					"  assert.equal(null, err);\r\n" +
					"  console.log(\"Connected correctly to server\");\r\n" +
					"  insertDocuments(db, function() {\r\n" +
					"    db.close();\r\n" +
					"  });\r\n" +
					"});</pre></code></li>" +
					"			<li><code><pre>" +
					"var insertDocuments = function(db, callback) {\r\n" +
					"  // Get the documents collection\r\n" +
					"  var collection = db.collection('documents');\r\n" +
					"  // Insert some documents\r\n" +
					"  collection.insert([\r\n" +
					"    {a : 1}, {a : 2}, {a : 3}\r\n" +
					"  ], function(err, result) {\r\n" +
					"    assert.equal(err, null);\r\n" +
					"    assert.equal(3, result.result.n);\r\n" +
					"    assert.equal(3, result.ops.length);\r\n" +
					"    console.log(\"Inserted 3 documents into the document collection\");\r\n" +
					"    callback(result);\r\n" +
					"  });\r\n" +
					"}</pre></code></li>" +
					"		</ul>" +
					"	</li>" +
					"	<li><strong>node-mongoskin <small>(by KISS JS Team)</small></strong>" +
					"		<ul>" +
					"			<li><a href='https://github.com/kissjs/node-mongoskin'>https://github.com/kissjs/node-mongoskin</a></li>" +
					"			<li>can connect to multiple MongoDBs (Replication Sets)</li>" +
					"			<li>Collection-like interaction (ex. <strong>db.[collection/schema/model].[function]</strong>)</li>" +
					"			<li>more user friendly controls - some functions returns promises</li>" +
					"			<li>no longer being maintained (last release was more than 10 months ago)</li>" +
					"			<li><code><pre>" +
					"var mongo = require('mongoskin');\r\n"+
					"var db = mongo.db(\"mongodb://localhost:27017/integration_tests\", {native_parser:true});\r\n"+
					"db.bind('article');\r\n"+
					"db.article.find().toArray(function(err, items) {\r\n"+
					"        db.close();\r\n"+
					"});" +
					"			</pre></code></li>" +
					"		</ul>" +
					"	</li>" +
					"	<li><strong>mongosmash <small>(by Bryan English)</small></strong>" +
					"		<ul>" +
					"			<li><a href='https://github.com/bengl/mongosmash'>https://github.com/bengl/mongosmash</a></li>" +
					"			<li>Model-Record Blend - Object.observe</li>" +
					"			<li>It is not fully functional, but is designed to be faster than Mongoose</li>" +
					"			<li>Uses namespacing to add visibility to data, Typecasting for data, Event hooks" +
					"				<ul>" +
					"					<li>new(modelName, obj)</li>" +
					"					<li>save(obj, callback)</li>" +
					"					<li>create(modelName, obj, callback)</li>" +
					"					<li>find(query, callback)</li>" +
					"					<li>delete(obj, callback)</li>" +
					"				</ul>" +
					"			</li>" +
					"		</ul>" +
					"	</li>" +
					"	<li><strong>mongojs <small>(by Mathias Buus)</small></strong>" +
					"		<ul>" +
					"			<li><a href='https://github.com/mafintosh/mongojs'>https://github.com/mafintosh/mongojs</a></li>" +
					"			<li>can connect to multiple MongoDBs (Replication Sets)</li>" +
					"			<li>Collection-based interaction</li>" +
					"			<li>simplifies the interactions with the MongoDB (similar to mongoskin)</li>" +
					"			<li>can set up event listeners (no additional requirements) and streaming objects (requires JSONStream)</li>" +
					"			<li><code><pre>" +
					"var db = mongojs('username:password@example.com/mydb', ['mycollection']);\r\n" +
					"// find everything\r\n\r\n" +
				    " db.mycollection.find(function(err, docs) {\r\n" +
				    "		// docs is an array of all the documents in mycollection\r\n" +
				 	"});\r\n" +
					"			</pre></code></li>" +
					"		</ul>" +
					"	</li>" +
					"	<li><strong>mongolia <small>(by Pau Ramon Revilla)</small></strong></li>" +
					"		<ul>" +
					"			<li><a href='https://github.com/masylum/mongolia'>https://github.com/masylum/mongolia</a>" +
					"			<li>can connect to multiple MongoDBs (Replication Sets)</li>" +
					"			<li>Model-Record interaction (like Mongoose) - <small>Models are attached to collections. Models don't map data from the db, they just define the logic</small></li>" +
					"			<li>Uses namespacing to add visibility to data, Typecasting for data, Event hooks</li>" +
					"			<li><code><pre>" +
					"var COMMENT = require('mongolia').model(db, 'comments'),\r\n" +
					"    Post = require('./post');\r\n\r\n" +
					"COMMENT.beforeInsert = function (documents, callback) {\r\n" +
					"  documents.forEach(function (doc) {\r\n" +
					"    doc.created_at = new Date();\r\n" +
					"  });\r\n" +
					"  callback(null, documents);\r\n" +
					"};\r\n\r\n" +
					"COMMENT.afterInsert = function (documents, callback) {\r\n" +
					"  documents.forEach(function (doc) {\r\n" +
					"    Post(db).mongo('update', {_id: doc.post._id}, {'$inc': {num_posts: 1}}); // fire and forget\r\n" +
					"  });\r\n" +
					"  callback(null, documents);\r\n" +
					"};\r\n\r\n" +
					"USER.mongo('insert', {email: 'foo@bar.com'});\r\n" +
					"// stored => {email: 'foo@bar.com', created_at: Thu, 14 Jul 2011 12:13:39 GMT}\r\n" +
					"// Post#num_posts is increased\r\n" +
					"			</pre></code></li>" +
					"		</ul>",
           }, {
        	   header: 'Ali',
        	   id: 'ali',
        	   content: 'Test',
           }, {
        	   header: 'Cliff',
        	   id: 'cliff',
        	   content: 'Test',
           }
    ];
	
	$scope.getContent = function(tab) {
		return $sce.trustAsHtml(tab.content);
	}
}]);