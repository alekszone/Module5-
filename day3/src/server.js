const express = require("express")
const usersRoute = require("./users/user")
const newEntry = express()

newEntry.use(express.json())

newEntry.use("/user", usersRoute)

newEntry.listen(4000,()=>{
    console.log("Hello world",4000)
})


