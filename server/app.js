const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')

app.use(bodyParser.json())
const Employee = mongoose.model("employee")

const mongoUri = "mongodb+srv://abrahag:n8usjdiuC8eLLdPp@cluster0.gkhzs.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("--connected to mongo--")
})

mongoose.connection.on("error", () => {
    console.log("error", err)
})

app.get('/', (req, res) => {
    Employee.find({}).then(data => {
        res.send(data)
    }).catch(error => log(error))
})

app.post('/send-data', (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        picture: req.body.picture,
        salary: req.body.salary,
        position: req.body.position
    })
    employee.save()
        .then(data => {
            console.log(data);
            res.send("--success--")
        }).catch(error => log(error))
})

app.post('/delete', (req,res) => {
    Employee.findByIdAndRemove(req.body.id)
    .then(data => {
        console.log(data)
        res.send("deleted")
    }).catch(error => log(error))
})

app.post('/upload', (req, res) => {
    Employee.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        picture: req.body.picture,
        salary: req.body.salary,
        position: req.body.position
    }).then(data => {
        console.log(data);
        res.send("Updated")
    }).catch(err => console.log(err))
})

app.listen(3000, () => {
    console.log("server running")
})