const express = require("express")
const uRoutes = require("./users/users")

const exp = express()

exp.use(express.json())
exp.use("/users", uRoutes)

exp.listen(4000,()=>{

console.log("Server is rruning  at 4000")

})
