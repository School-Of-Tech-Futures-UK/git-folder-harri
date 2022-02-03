// eslint-disable-next-line no-undef
const express = require("express")
const fs = require("fs")
const app = express()
app.use(express.json()) //add this at top to make json work 

var cors = require("cors")
app.use(cors())

app.post("/score", (req, res) => { 
	const { highScore, player} = req.body //factorization baby!
	const scoreBoard = {
		score: highScore,
		player: player
	}
	//const checkIfFileExists = fs.readFileSync("scoreBoard.json")
	if (!fs.existsSync("./scoreBoard.json")) {
		console.log("no file")
		let arr = [];
		arr = [...arr, scoreBoard];
		fs.writeFile("scoreBoard.json", JSON.stringify(arr), (err) => {
			if (err) {
				console.log("Unable to save information")
			}
			let value = fs.readFileSync("scoreBoard.json")
			let newValue = JSON.parse(value)
			res.status(200).json(newValue)
		})
	} else {	
		let value = fs.readFileSync("scoreBoard.json")
		let newValue = JSON.parse(value)
		newValue = [...newValue, scoreBoard]
		fs.writeFile("scoreBoard.json", JSON.stringify(newValue), (err) => {
			if (err) {
				console.log("unable to update information")
			}
			let value = fs.readFileSync("scoreBoard.json")
			let newValue = JSON.parse(value)
			res.status(200).json(newValue)
		})
	}
})

//route to fetch score board information
app.get("/score", (req, res) => {
	if (!fs.existsSync("./scoreBoard.json")) {
		res.status(200).json([])
	} else {
		let value = fs.readFileSync("scoreBoard.json")
		let newValue = JSON.parse(value)
		res.status(200).json(newValue)
	}
})





//post a json message containing, player name, colour and score
app.listen(3000, () => {
	console.log("app running on port 3000")
})

//need to enable cors
//express allow cors google.
