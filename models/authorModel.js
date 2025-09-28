const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authorSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        bio: { type: String },
        birthYear: { type: Number },
    },
    { timestamps: true }
);

const AuthorModel = mongoose.model("authors", authorSchema);
// AuthorModel.createIndexes({ name: 1 });
module.exports = AuthorModel;