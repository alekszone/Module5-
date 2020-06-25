const express = require("express")

const path = require("path")
const fs = require("fs")
const uniqId = require("uniqid")
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
const usersData = path.join(__dirname,"users.json")

router.get("/",(request,response)=>{
const allUsers = getUsers()
if (allUsers.length>0)
response.send(allUsers)
else
response.send("No users")
})

router.get("/:name",(request,response)=>{
const allUsers = getUsers()
const filterUser = allUsers.filter((use)=> use.name===request.params.name)
if (filterUser.length>0)
response.send(filterUser)
else
response.send("error")

})
router.post("/",(request,response)=>{
    post = { id: uniqId(), ...request.body}
const allUsers = getUsers()
allUsers.push(post)
fs.writeFileSync(usersData , JSON.stringify(allUsers))
response.send(allUsers)
})

// router.post("/checkEmail", (request,response)=>{
// post = request.body
// const allUsers = getUsers()
// const use =allUsers.filter(user =>user.id === request.params.id)
// if(use.length>0){
//     const user = use.filter(user =>user.email===use.email)
//     if(user.length>0)
//     response.send("email cannot be used")
//     else
//     response.send("ok ,  email is ok ", user)
// }else{
//     response.send("email is empty")
// }


// })

router.put("/:name", (request,response)=>{
const allUsers = getUsers()
const filterUsers  = allUsers.filter(user => user.name === request.params.name)
const User ={ ...request.body,name:request.params.name}
filterUsers.push(User)
fs.writeFileSync(usersData,JSON.stringify(allUsers))
response.send(User)


})

router.delete("/:id" , (request,response)=>{




    
})


module.exports = router

