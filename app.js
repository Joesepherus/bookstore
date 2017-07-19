var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

Book = require('./models/book.js')

mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

var fs = require("fs");

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
    var x = "";

    for (i in book.author) {
        x += book.author[i];
            console.log(x);
    }
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
	var id = req.params.id;
	var book = req.body;

    console.log("ID = " + id);
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

// get books from a file WIP
app.get('/listBooks', function (req, res) {
    fs.readFile( __dirname + "/" + "books.json", 'utf8',
    function (err, data) {
        console.log(data);
        res.end(data);
    });
})

var server = app.listen(100, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
})
