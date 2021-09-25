const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Condidat = new Schema({
	fullName: String,
	age: {
		type: Number,
		min: 23,
	},
	email: String,
	phone: String,
	job: String,
	registerDate: String,
	exp: Number,
	certificates: [String]
})

module.exports = condidat = mongoose.model("condidat", Condidat)