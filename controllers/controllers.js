const Book = require("../models/book");
exports.homepage = (req,res) => {
    res.render("home");
};
exports.getAllBooks = (req, res, next) => {
    Book.find({}, (error, books) => {
        if (error) next(error);
        req.data = books;
        next();
    });
};

exports.findbook = (req, res) => {

let pages = req.params.page;
    if (pages == 1) {
        var bookQuery = Book.findOne({
            name: "Dog Days",
        });
        bookQuery.exec((error, data) => {
            if (data) res.render("book1", {book: data});
        });
    }
    else if (pages == 2) {
        var bookQuery = Book.findOne({
            name: "Diary of Wimpy Kid",
        });
        bookQuery.exec((error, data) => {
            if (data) res.render("book2", {book: data});
        });
    }
    else if (pages == 3) {
        var bookQuery = Book.findOne({
            name: "Rodrick Rules",
        });
        bookQuery.exec((error, data) => {
            if (data) res.render("book3", {book: data});
        });
    }
 
    };