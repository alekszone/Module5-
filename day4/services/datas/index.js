const path = require ("path")

const {read,write } = require("./utilities")

const users = path.join(__dirname,"../data/products.json")
const coment = path.join(__dirname,"../data/coment.json")

module.exports ={
getUsers:async () => read(users),
getComent:async () =>read(coment),
writeUsers:async (data) =>write(users,data),
writeComent: async (data) => write(coment,data)  
}



