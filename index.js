require('dotenv').config();
const fs = require('fs/promises');
const express = require('express');
const cors = require('cors'); // Import the cors package
const path = require('path');

const app = express();
const port = 8080;

app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.post('/formsubmit', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    try {
        await fs.writeFile(`submissions/${email}-contactform-${new Date().getTime()}.json`, JSON.stringify({ name, email, message }));
        res.json({ message: 'OK' });
    } catch (err) {
        res.json({ message: 'FAIL' });
    }
});

app.get('/submissions', async (req, res) => {
    try {
        const submissions = await fs.readdir('./submissions');

        const jsonfiles = submissions.filter(f => path.extname(f) == '.json');

        const content = (await Promise.all(jsonfiles.map(async (f) => fs.readFile(path.join('./submissions', f), 'utf-8')))).map(f => JSON.parse(f));

        return res.json({message: 'OK', content});
    }catch(e) {
        console.log(e)
        return res.json({message: 'FAIL'});
    }
    
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
