const functions = require("firebase-functions");
const express = require('express');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const path = require('path');
const app = express();

// const parser = promisify(parse);

app.use(express.json());


app.get('/', (req, res, next) => {
    return res.send("hello from express");
})

app.post('/', (req, res, next) => {
    let readFile = fs.readFileSync(path.join(__dirname, 'file.csv'));
    let records = parse(readFile, { columns : true });
    res.send(records)
    // parser(path.join(__dirname, 'file.csv'), { columns : true })
    //     .then((result) => {
    //         return res.json(result);
    //     })
    //     .catch(err => next(err));
})

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

app.listen(4000, () => console.log('server is running and listening at 4000'));
exports.expressAPI = functions.https.onRequest(app);
