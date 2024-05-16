require ("dotenv").config()
const {Connection} = require('postgresql-client');
const express = require('express')

const app = express()
const port = 8080;

app.use(express.json());


app.post("/formsubmit",async(req, res) => {
    const connection= new Connection(`postgres:${process.env.PASSWORD}@postgres://jakedatabase.c34cs8gmaypg.us-east-2.rds.amazonaws.com`)
    await connection.connect()
    const name = req.body.name
    const email = req.body.email
    const message = req.body.message
    await connection.query(`insert into form (name, email, message) values(${name}, ${email}, ${message})`)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

