// exports
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const uniqueID = require("uniqid");
const {data} = require('../db/db.json');


// Get route
router.get('/notes', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db/db.json'))
    res.send(data)
});


// Post route
router.post('/notes', (req, res) => {
    let idNum = uniqueID();
    const data = JSON.parse(fs.readFileSync('db/db.json'));
    res.json(data)
    console.log(idNum);

    const newInput = {
        title: req.body.title,
        text: req.body.text,
        id: idNum
    };
    data.push(newInput);
    fs.writeFileSync("db/db.json", JSON.stringify(data));


});


//Delete Route
router.delete('/notes/:id', (req, res) => {
    let deleteNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = deleteNote.filter((x) => x.id != req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteID), (err) => {
      if (err) throw err;
    });
    return res.json(deleteNote);
});

module.exports = router;