const express = require("express")

const path = require("path")
const fs = require("fs")
// const uniqId = require("uniqid")
const { request } = require("http")
const { response } = require("express")
const { param } = require("express/lib/router")
const router = express.Router()

const getUsers = () =>{
const usersData = path.join(__dirname,"users.json")
const moveData = fs.readFileSync(usersData)
const users = JSON.parse(moveData.toString())
return users
}

router.get("/",(request,response)=>{
const allUsers = getUsers()
if (allUsers.length>0)
response.send(allUsers)
else
response.send("No users")
})

router.get("/:id",(request,response)=>{
const allUsers = getUsers()
const filterUser = allUsers.filter((use)=> use.id===request.params.id)
if (filterUser.length>0)
response.send(filterUser)
else
response.send("error")

})





module.exports = router

