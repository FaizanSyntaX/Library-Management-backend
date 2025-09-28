const AuthorModel = require("../models/authorModel");
const BookModel = require("../models/bookModel");

const createAuthor = async (req, res) => {
  try {
    const author = new AuthorModel(req.body);
    const savedAuthor = await author.save();
    res
      .status(201)
      .json({
        message: "Author Added Successfully!",
        success: true,
        data: savedAuthor,
      });
  } catch (err) {
    if (err.message.includes("E11000")) {
      res
        .status(400)
        .json({ success: false, message: "Author Already Exists!" });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await AuthorModel.find();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await AuthorModel.findById(req.params.id);
    if (!author) return res.status(404).json({ error: "Author not found!" });
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAuthor = async (req, res) => {
    try{
        const updatedAuthor = await AuthorModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedAuthor) return res.status(404).json({ error: "Author not found!" });
        res.status(200).json(updatedAuthor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteAuthor = async (req, res) => {
    try{
        await BookModel.deleteMany({ authorId: req.params.id});
        const deletedAuthor = await AuthorModel.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) return res.status(404).json({ error: "Author not found!" });
        res.status(200).json({ message: "Author and all his books are successfully deleted!!"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor };
