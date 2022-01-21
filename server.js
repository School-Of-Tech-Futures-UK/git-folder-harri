// eslint-disable-next-line no-undef
const express = require("express")
const fs = require("fs")
const app = express()
app.use(express.json()) //add this at top to make json work 

var cors = require('cors')
app.use(cors())
let score_list = []

app.post("/score", (req, res) => { 
    const { highScore, player} = req.body //factorization
    console.log(req.body.highScore, req.body.player)
    const scoreBoard = {
        'user': {
            score: highScore,
            player: player
        }
    }
    fs.writeFile("scoreBoard.json", JSON.stringify(scoreBoard), (err) => {
        if (err) {
            console.log("Unable to save information")
        }
        let value = fs.readFileSync("scoreBoard.json")
        let newValue = JSON.parse(value)
        res.status(200).json(newValue)
    })
})

//route to fetch score board information
app.get("/score", (req, res) => {
    let value = fs.readFileSync("scoreBoard.json")
    let newValue = JSON.parse(value)
    console.log(newValue)
    res.status(200).json(newValue)
})



//42 - no.of.turns

//post a json message containing, player name, colour and score
app.listen(3000, () => {
    console.log("app running on port 3000")
})

//need to enable cors
//express allow cors google.
//copy what john did then do npm install cors