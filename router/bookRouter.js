const express = require("express");
const { addBook, getAllBooks, getSingleBook, updateBook, deleteBook } = require("../controller/bookCtrl.js");

const router = express.Router();

router.post("/addBook", addBook);
router.get("/allBooks", getAllBooks);
router.get("/:id", getSingleBook);
router.patch("/updateBook/:id", updateBook);
router.delete("/deleteBook/:id", deleteBook);


module.exports = router;
