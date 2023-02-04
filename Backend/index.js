var express = require('express')
var app = express()
const port = 80
const fs= require('fs')
var cors = require('cors')
// import mongo connection from ./db
const mongo=require('./db')
mongo()

app.use(cors())
// Use json to convert data to json  
app.use(express.json())

// Use urlencoded to cath info 
app.use(express.urlencoded())


// Avalibal Routes. we are not importing him  but we are target endpoint and fetch all data from ./route/auth 
app.use('/api/notes',require("./routes/notes"))
app.use('/api/auth',require("./routes/auth"))

app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })
