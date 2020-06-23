const express = require("express")
const move = express.Router()
const path = require("path")
const fs = require("fs")
const { monitorEventLoopDelay } = require("perf_hooks")

const  dataFile = path.join(__dirname, "place.json")

move.get("/" ,async (request,response)=>{

const insideFile = fs.readFileSync(dataFile)
const fileContent = insideFile.toString()
console.log(fileContent)
response.send(JSON.parse(fileContent))
response.status(200).send("info get")

})

move.get("/:ID" , async(request,response)=>{
const insideFile = fs.readFileSync(dataFile)
const fileContent =JSON.parse(insideFile.toString())
console.log("ID ", request.params.id )
const user = fileContent.filter((user)=>user.id === request.params.id)
console.log(user)
response.send(user)
})

module.exports = move;