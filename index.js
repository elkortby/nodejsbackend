const express = require("express")
const mongoose = require("mongoose")
const server = express()
const cors = require("cors")
const port = process.env.PORT || 5000

require("dotenv").config()

const condidats = require("./routes/api/condidats")
const employees = require("./routes/api/employees")
const rh = require("./routes/api/rh")

server.use(cors({
  origin: 'http://localhost:3000'
}))

server.use(express.json({limit: '25mb'}));
server.use(express.urlencoded({ limit: '25mb', extended: true }));

// Connect to MongoDB
mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => console.log("Datebase successfully connected"))
.catch(err => console.log(err))

server.use("/api/rh", rh)
server.use("/api/condidats", condidats)
server.use("/api/employees", employees)

server.listen(port | 5000, () => console.log("Server Working on port: " + port))