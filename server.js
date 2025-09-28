const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./router/bookRouter");
const authorRouter = require("./router/authorRouter");

const app = express();

app.listen(5000, () => console.log("Server is up & Running!"));

mongoose
  .connect("mongodb://localhost:27017/cgc2")
  .then(() => console.log("Connected to the DB successfully"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/books", bookRouter);
app.use("/authors", authorRouter);
