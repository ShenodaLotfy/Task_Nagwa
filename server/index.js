const express = require("express");

var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json();

var fileData = fs.readFileSync("server/src/data/data.json");
var testData = JSON.parse(fileData);

var wordListArray = testData.wordList;
var scoresListArray = testData.scoresList;

const PORT = process.env.PORT || 3001;

const app = express();

// endpoint for getting words
app.get("/api/getWordList", (req, res) => {
    let tempWordArray = wordListArray;
    let hashMap = { "verb": 0, "adverb": 0, "noun": 0, "adjective": 0 };
    let words = [];
    // make sure words contain at least one word 1 adjective, 1 adverb, 1 noun, and 1 verb.
    tempWordArray.forEach((element, index) => {
        if (hashMap[element.pos] < 3) {
            hashMap[element.pos] = hashMap[element.pos] + 1;
            words.push(element);
        }
    });
    // remove the 11th element
    words.pop();
    res.json(words);
});

// endpoint for getting rank
app.post('/api/rank', jsonParser, function (req, res) {
    const { finalScore } = req.body;
    let rank = "";
    let scoresListArrayLength = scoresListArray.length;
    let counter = 0;
    // get the scores below the finalScore
    scoresListArray.forEach(score => {
        if (score < finalScore) {
            counter++;
        }
    });
    // get the percentage
    let percentage = counter / scoresListArrayLength * 100;
    rank = percentage;

    return res.json({
        rank
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
