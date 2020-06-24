const express = require("express")
const move = express.Router()
const path = require("path")
const fs = require("fs")
const { response, request } = require("express")
const uniqid = require("uniqid")

const  dataFile = path.join(__dirname, "place.json")
const insideFile = fs.readFileSync(dataFile)
const fileContent =JSON.parse(insideFile.toString())
 
move.get("/" ,async (request,response)=>{



console.log(fileContent)

response.status(200).send(fileContent)

})

move.get("/:id" ,async (request,response)=>{


console.log("ID ", request.params.id )
const user = fileContent.filter((user)=>user.id === request.params.id)
console.log(user)
response.send(user)
})

move.post("/" ,async (request,response)=>{
    const newUser = {id:uniqid(), ...request.body}
   fileContent.push(newUser)
fs.writeFileSync(dataFile,JSON.stringify(fileContent))
response.status(201).send(newUser)
})
move.post("/checkEmail",async (request,response)=>{
const newEm = request.body
const students = fileContent.filter(file =>file.id !== newEm.id)
if (students.length > 0){
const filterStud =students.filter(stud => students.email === newEm.email)
if(filterStud.length>0){
    response.status(400).send(false)
}else{
    response.status(200).send(true)
}
}else{
    response.status(200).send(true)
}
})

move.put("/:id",async (response,request)=>{
if (fileContent.length>0){
    const filterSt = fileContent(file=>file.id!==request.params.id)
    const edit ={id:request.params.id, ...request.body}
    filterSt.push(fileContent)
    fs.writeFileSync(dataFile,JSON.stringify(filterSt))
    response.send(edit)
}else{
    response.send("could not edit")
}


})
move.delete("/:id",async (response,request)=>{
if(fileContent.length>0){
    const filterSt = fileContent.filter(file=>file.id!== request.params.id)
    fs.writeFileSync(dataFile, JSON.stringify(filterSt))
    response.send("Data was deleted")
}else{
    response.status(404).send("user not exist")
}

})

module.exports = move;