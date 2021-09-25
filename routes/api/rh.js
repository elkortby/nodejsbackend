const express = require("express")
const mongoose = require("mongoose")
const server = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Rh = require("../../models/RH")
const Condidat = require("../../models/Condidat")
const Employee = require("../../models/Employee")

server.post("/view", (req, res) => {
	Condidat
	.find({}, {
		_id: 0,
        fullName: 0,
        __v: 0,
	})
	.then(condidates => res.send(condidates))
	.catch(console.error)
})

server.post("/accept", (req, res) => {
	Condidat
	.findOne({ email: req.body.email })
	.then(condidat => {
		const newEmp = new Employee({
			fullName: condidat.fullName,
			age: condidat.age,
			email: condidat.email,
			phone: condidat.phone,
			job: condidat.job,
			registerDate: condidat.registerDate,
			exp: condidat.exp,
			certificates: condidat.certificates,
		})
		newEmp.save()
		.then(() => res.send("success"))
		.catch(console.error)
	})
	.catch(console.error)
})

server.post("/login", (req, res) => {
	Rh.findOne({ email: req.body.email })
	.then(user => {
		if (!user) {
			res.send("user not exist")
		} else {
			bcrypt.compare(req.body.password, user.password)
			.then(correct => {
				if (correct) {
					// send token
					const response = {
						_id: user._id,
						email: user.email
					}
					jwt.sign(response, "webapp", {
						expiresIn: 86400
					}, (err, token) => {
						res.send({
							login: true,
							token: token
						})
					})
					
				}
				else res.send("Password incorrect")
			})
			.catch(console.error)
		}
	})
	.catch(console.error)
})

server.post("/register", (req, res) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(req.body.password, salt, (err, hash) => {
			const newUser = new RH({
				email: req.body.email.toLowerCase(),
				password: hash
			})
			newUser.save()
			.then(() => res.send("success"))
			.catch(console.error)
		})
	})
})

module.exports = server;