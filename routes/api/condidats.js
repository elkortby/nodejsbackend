const express = require("express");
const mongoose = require("mongoose");
const server = express.Router();

const Condidat = require("../../models/Condidat")

server.post("/register", (req, res) => {
	const condidat = new Condidat({
		fullName: req.body.fullName,
		age: req.body.age,
		email: req.body.email.toLowerCase(),
		phone: req.body.phone,
		job: req.body.job,
		registerDate: new Date().toLocaleDateString(), // now
		exp: req.body.exp,
		certificates: req.body.certificates,
	})
	condidat
	.save()
	.then(() => res.send("success"))
	.catch(console.error)
})

module.exports = server;