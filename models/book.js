var mongoose = require('mongoose');

var schema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	genre:{
		type: String,
	},
	description:{
		type: String,
		required: true
	},
	author:{
		type: String,
		required: true
	},
	publisher:{
		type: String,
	},
	pages:{
		type: String,
	},
	image_url:{
		type: String,
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Book = module.exports = mongoose.model('Book', schema);

module.exports.getBooks = function(callback, limit){
	Book.find(callback).limit(limit);
}

module.exports.getBookById = function(bookId, callback){
	Book.findById(bookId, callback);
}

module.exports.addBook = function(book, callback){
	var json = {
		title: book.title,
        genre: book.genre,
        description: book.description,
        author: JSON.stringify(book.author),
        publisher: book.publisher,
        pages: book.pages,
        image_url: book.image_url
	}
	Book.create(json, callback);
}

module.exports.updateBook = function(id, book, options, callback){
	var query = {_id: id};
	var update = {
		title: book.title,
        genre: book.genre,
        description: book.description,
        author: JSON.stringify(book.author),
        publisher: book.publisher,
        pages: book.pages,
        image_url: book.image_url
	}
	Book.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteBook = function(id, callback){
	var query = {_id: id};
	Book.deleteOne(query, callback);
}