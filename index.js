const mongoose = require("mongoose");
const bookmodel = require("./models/book");
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

app.get('/', (req,res)=>{
    res.render('home')
});

app.get("/home", controller.homepage);
app.get("/book/:page", controller.findbook);
app.get("/views/addbook", controller.addbook);
app.get("/views/delbook", controller.getAllBooks, (req, res, next) => {
    res.render("delBook", {
        books: req.data
    });
});
app.post("/books/bookcreate", controller.bookcreate);
app.get("/bookDelete/:bookData", controller.bookDelete);


app.listen(app.get("port"), ()=>{
    console.log(`Server running http://localhost:${app.get("port")}`);
});