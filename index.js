const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const session = require("express-session")

require("dotenv").config()

// Port configuration (Heroku)
const PORT = process.env.PORT || 3000

const app = express()

// Express Session
app.use(
  session({
    secret: "mysecret",
    resave: true,
    saveUninitialized: true,
  })
)

// Bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// EJS
app.use(expressLayouts)
app.set("view engine", "ejs")

// GET Routes
app.use(require("./routes/get.js"))

// POST Routes
app.use(require("./routes/post.js"))

app.listen(PORT, async () => {
  console.log(`Listening to port: ${PORT}`)

  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("Connected to MongoDB")
  } catch (err) {
    console.log(err)
  }
})
