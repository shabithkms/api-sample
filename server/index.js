const { application } = require('express')
const express = require('express')

const app = express()

require('dotenv').config()

const PORT = process.env.PORT
app.get('/', (req, res) => {
    res.send("In home page")
})

app.get('/api', (req, res) => {
    console.log("helloooooo");
    try {
        res.json({ message: "Sample from server" })
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})

app.listen(PORT, () => {
    console.log(`sever running on ${PORT}`);
})

