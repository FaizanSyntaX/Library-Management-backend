const express = require("express");
const { createAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor } = require("../controller/authorCtrl.js");


const router = express.Router();

router.post("/addAuthor", createAuthor);
router.get("/allAuthors", getAllAuthors);
router.get("/:id", getAuthorById);
router.patch("/updateAuthor/:id", updateAuthor);
router.delete("/deleteAuthor/:id", deleteAuthor);
module.exports = router;