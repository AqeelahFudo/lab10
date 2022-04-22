const { db } = require("../models/book");
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

exports.bookRequest = (req,res, next) => {
    let bookId = req.params.id;
    books.findById(bookId)
        .then(data => {
            res.render("book1", {
                book: data
            });
        })
        .catch(error => {
            res.redirect ("/home");
        });
},

exports.addbook = (req, res) => {
    res.render("addBook")
}

exports.delbook = (req, res) => {
    res.render("delBook")
}

exports.bookCreate = (req, res, next) => {
   Book.create ( {
        name: req.body.bookName,
        author: req.body.bookAuthor,
        link: req.body.amazonLink
        
    }).then(()=>{
    res.redirect("/home");
    });



    
}

// exports.bookCreate = (req, res) => {
//     const book = new bookData({
//         name: req.body.bookName,
//         author: req.body.bookAuthor,
//         link: req.body.amazonLink
//     });
//     book.save();
//     res.redirect("/home");
// }

exports.bookDelete = (req, res, next) => {
    Book.findOneAndDelete({
        bookId: req.params._id
    }, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted Book: ", docs);
        }
    });
    res.redirect("/home");
}

 /* exports.findbook = (req, res) => {
let pages = req.params.pages;
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
*/