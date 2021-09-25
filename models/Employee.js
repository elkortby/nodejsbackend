const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Employee = new Schema({
	fullName: String,
	age: Number,
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		// required: true,
		min: 8,
		max: 35
	},
	phone: String,
	job: String,
	startDate: Date,
	exp: Number,
	certificates: [String]
})

module.exports = employee = mongoose.model("employee", Employee)