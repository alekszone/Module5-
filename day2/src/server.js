const express = require("express")
const usersRoutes = require("./services/users")
const server = express()
server.use (express.json())
server.use( "/users", usersRoutes)
server.listen(3005, () =>{
console.log("serevr is running on port 3001")


})