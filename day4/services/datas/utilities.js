const {writeJSON , readJSON} = require("fs-extra")

const read = async (filePath) =>{
try{
const fileJSON = await readJSON (filePath)
return fileJSON
}catch (error){
    console.log("errr",error)
  throw new Error(error)  
}
}

const write = async (filePath,data)=>{
    try{
        await writeJSON(filePath,data)

    }catch (error){
        throw new Error(error)
    }
}

module.exports={read,write}