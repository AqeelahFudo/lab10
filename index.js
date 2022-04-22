const mongoose = require("mongoose");
const Book = require("./models/book");
const controller = require("./controllers/controllers");
const express = require("express"), 
app= express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
    express.urlencoded({
        extended: false
    })
);

require("dotenv").config();
const uri = process.env.ATLAS_URI;

console.log(uri);

mongoose.connect(uri, { useUnifiedTopology: true });

const db = mongoose.connection;

db.once("open", () => {
    console.log("connected to MongoDB!");
})

app.get('/', controller.getAllBooks, (req,res) => {
    res.render('home', {
        books: req.data
    });
});



app.get("/home", controller.getAllBooks, (req, res) => {
    res.render('home', {
        books: req.data
    });
});

app.get("/views/addbook", controller.addbook);

app.get("/views/delbook", controller.getAllBooks, (req, res, next) => {
    res.render("delBook", {
        books: req.data
    });
});

app.post("/bookCreate", controller.bookCreate);

app.get("/bookDelete", controller.bookDelete);

app.listen(app.get("port"), ()=>{
    console.log(`Server running http://localhost:${app.get("port")}`);
});