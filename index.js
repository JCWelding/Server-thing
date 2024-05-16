require ("dotenv").config()
const fs = require('fs/promises')
const express = require('express')

const app = express()
const port = 8080;

app.use(express.json());


app.post("/formsubmit",async(req, res) => {
    const name = req.body.name
    const email = req.body.email
    const message = req.body.message

    fs.writeFile(`${email}-contactform-${new Date().getTime()}`, JSON.stringify({name,email,message})).then(() => {
        res.json({message: 'OK'})
    }).catch(() => {
        res.json({message: 'FAIL'})
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

