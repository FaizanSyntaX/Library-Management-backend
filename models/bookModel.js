// const { ObjectId } = require("bson");
const  mongoose = require("mongoose");
const Schema = mongoose.Schema;


const bookSchema = new Schema(
    {
        title: { type: String, required: true },
        genre: { type: String, required: true },
        publishedYear: { type: Number },
        authorId: { type: Schema.Types.ObjectId , ref: "authors", required: true },
    },
    { timestamps: true}
);

const BookModel = mongoose.model("books", bookSchema);
module.exports = BookModel;