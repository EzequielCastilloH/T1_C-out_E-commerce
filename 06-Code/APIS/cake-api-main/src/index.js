var express = require('express')
var app = express()
var mongoose = require('mongoose')
const portParameter =  3001
const bodyParser = require('body-parser')
const EndPoints = require('../api/EndPoints')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/api/endpoints",EndPoints)

mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.f3d2d.mongodb.net/Bakery?retryWrites=true&w=majority",
    {useNewUrlParser: true},
    (err,res) => {
        err && console.log("Error conectado a la base de datos")
        app.listen(portParameter, () => {
            console.log(`Server is running at http://localhost:${portParameter}`)
        })
    }
)
