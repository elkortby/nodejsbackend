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
							token: "Barrer " + token
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

server.post("/handleRating", async (req, res) => {
	try {
		const user = await Rh.findOne({ _id: req.body._id })
		if (user.rating) {
			console.log(user.rating)
			// user.rating = user.rating + (req.body.rating / user.raters)
		} else user.rating = req.body.rating
		if (user.raters) {
			user.raters = user.raters + 1
		} else user.raters = 1
		await user.save()
		res.send("Success")
		// new rating = old + req rating / rater
	} catch (error) {
		console.log(error)
	}
})

server.post("/getRating", async (req, res) => {
	try {
		const user = await Rh.findOne({ _id: req.body._id })
		if (user) {
			const rating = user.rating
			console.log(rating)
			res.status(200).send({ rating: rating})
		} else {
			res.status(400).send("error")
		}
		// new rating = old + req rating / rater
	} catch (error) {
		console.log(error)
	}
})

module.exports = server;