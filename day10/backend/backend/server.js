const express = require("express")
const server = express()
const router = require("./backside/media")

const port = process.env.port

server.use(express.json())

server.use("/media",router)
server.listen(port,() =>{
console.log("Port is  " , port)
})






