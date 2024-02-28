const express = require("express");
const app = express();
const movies = require("./movies.js");
const categories = require("./categories.js");


app.use("/movies", movies);
app.use("/categories", categories);

app.listen(3000);
