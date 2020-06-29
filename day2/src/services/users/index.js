const express = require('express')
const fs = require('fs') //core module
const path = require("path")


const usersFilePath = path.join(__dirname,"./users.json")
const router = express.Router()
//1.
router.get('/',(request,response)=>{ //jan specifike vetem per kete get

// a)retrieve users list 1 fileon disk(we dont have db yet)

const fileContentAsABuffer = fs.readFileSync(usersFilePath)

const fileContent = fileContentAsABuffer.toString()
// console.log(fileContent)
// b) send the list as a jason
    response.send(JSON.parse(fileContent))
})
//2.
router.get('/:id',(request,response)=>{
const fileContentAsABuffer = fs.readFileSync(usersFilePath)
const usersArray = JSON.parse(fileContentAsABuffer.toString())


console.log(usersArray)

console.log("ID : ", request.params.id)
const user = usersArray.filter(
    (user) => user.id === parseInt(request.params.id)
)
console.log(user)
response.send(user)
})
//3.
router.post('/',(request,response)=>{
console.log(request.body)
const newUser = {... request.body , id:uniqid()}

const fileContentAsABuffer = fs.readFileSync(usersFilePath)
const usersArray = JSON.parse(fileContentAsABuffer.toString())
usersArray.push(newUser)
fs.writeFileSync(usersFilePath, JSON.stringify(usersArray))
response.status(201).send(newUser)
})
//4.
router.put('/:id',(request,response)=>{
const fileContentAsABuffer =fs.readFileSync(usersFilePath)
const usersArray = JJSON.parse(fileContentAsABuffer.toString())
const filteredUsersArray = usersArray.filter(
    (users) => user.id != request.params.id
)
const user = request.body
user.id = request.params.id
filteredUsersArray.push(user)
fs.writeFileSync(usersFilePath, JSON.stringify(filteredUsersArray))
response.status("ok")
})
//5.
router.delete('/:id',(request,response)=>{
const fileContentAsABuffer = fs.readFileSync(usersFilePath)
const usersArray = JSON.parse(fileContentAsABuffer.toString())
const filteredUsersArray = usersArray.filter(
    (user) => user.id != request.params.id
)

})


module.exports=router