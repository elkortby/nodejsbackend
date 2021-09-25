const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RH = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		min: 8,
		max: 35
	}
})

module.exports = rh = mongoose.model("rh", RH)