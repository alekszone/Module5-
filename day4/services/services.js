const express = require("express")
const path = require("path")
const listEndpoints= require("express-list-endpoints")
const port = process.env.PORT

const program = express()


program.listen(port,()=>{
console.log("server is running at port ", port)
} )