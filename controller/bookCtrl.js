const BookModel = require("../models/bookModel");

const addBook = async (req, res) => {
  try {
    const newBook = new BookModel(req.body);
    await newBook.save();
    res
      .status(201)
      .json({ message: "Book added successfully!", data: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    //sorting
    const sort = req.query.sort;
    const dir = req.query.dir;
    let sortObj = {};
    if (sort && dir) {
        sortObj[sort] = dir;
    }
    //searching
    const search = req.query.search;

    let filter = {};
    if (search) {
      filter = {
        $or: [{ title: { $regex: search, $options: "i" } }, { genre: { $regex: search, $options: "i" } }]
      };
    }

    const books = await BookModel.find(filter).sort(sortObj).populate("authorId");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id).populate("authorId");
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("authorId");
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json({ message: "Book updated successfully!", data: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await BookModel.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(4e4).json({ message: "Book not found." });
    }
    res.status(200).json({ message: "Book deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = { addBook, getAllBooks, getSingleBook, updateBook, deleteBook, };
