const mongoose = require("mongoose");
const { Schema } = mongoose;

const BooksSchema = new Schema({
  title: String,
  description: String,
  image: String,
  price: Number
});

const Books = mongoose.model("book", BooksSchema);
module.exports = Books;
