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
    console.log("Successfully connected to MongoDB using Mongoose!");
})

app.get('/', (req,res)=>{
    res.render('home')
});

app.get("/home", controller.homepage);
app.get("/book/:page", controller.findbook);

app.listen(app.get("port"), ()=>{
    console.log(`Server running at http://localhost:${app.get("port")}`);
});