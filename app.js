var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.json());
//app.use(express.static(_dirname + '/client'));
var mongo = require('mongodb'); 
var MongoClient = require('mongodb').MongoClient;

Book = require('./models/book.js')

/*MongoClient.connect('mongodb://localhost/bookstore',
 	function(err, db) {
	if (err) throw err;
  	console.log("Database created!");
  	db.close();
});*/

mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

var fs = require("fs");

var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

// hi ;)
app.get('/', function (req, res) {
       res.send("hi");
})

// display all books
app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});
})

// display a book with a certain ID
app.get('/api/books/:id', function(req, res){
	Book.getBookById(req.params.id, 
		function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
})

// add a new book
app.post('/api/books', function(req, res){
	var book = req.body;
	/*    var book = {
                      title: req.body.title,
                      genre: req.body.genre,
                      description: req.body.description,
                      author: req.body.author,
                      publisher:req.body.publisher,
                      image_url:req.body.image_url
                    };
	*/
	Book.addBook(book, function(err, book){
		if(err){
			throw(err);
			res.send({
                message :'something went wrong'
            });
        } 
        else {
		 	res.json(book);
		}
	});
})

// update a book
app.put('/api/books/:id', function(req, res){
	var id = req.params._id;
	var book = req.body;

	Book.updateBook(id, book, {}, 
		function(err, book){
		if(err){
			throw(err);
			res.send({
                message :'something went wrong'
            });
        } 
        else {
		 	res.json(book);
		}
	});
})

// delete a book
app.delete('/api/books/:id', function(req, res){
	var id = req.params.id;

	Book.deleteBook(id, 
		function(err, book){
		if(err){
			throw(err);
			res.send({
                message :'something went wrong'
            });
        } 
        else {
		 	res.json(book);
		}
	});
})

// TESTING :) 
// _______________________________________________________
//list all users
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8',
   function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.post('/addUser', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', 
   function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

app.get('/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8',
   function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})

var id = 2;

app.delete('/deleteUser', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', 
   function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

var server = app.listen(80, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port)
})