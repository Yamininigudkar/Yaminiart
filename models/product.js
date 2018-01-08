const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: { type: String, required: true },
	category: { type: String, required: true },
	description:{ type: String, required: true },
	price:{type: Number, required: true},
	img: {contentType: String,data:Buffer},
	date: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
