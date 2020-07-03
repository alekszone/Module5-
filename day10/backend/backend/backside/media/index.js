const express = require ("express")
const fs = require ("fs-extra")
const path = require("path")
const router = express.Router()
const uniqid = require("uniqid")
const { check, validationResult } = require("express-validator")
const multer = require("multer")

const {join}  =require("path")

const upload = multer({})

const mediaFile = path.join(__dirname, "media.json")
const reviewsFile = path.join(__dirname, "reviews.json")

const readMedia = async(path)=>{
   const media = await fs.readJSON(path)
return media
}
const writeMedia = async (path, data) =>{
await fs.writeJSON(path,data)
} 

const mediaFolder  = join( __dirname , "../../../media/img")




router.get("/", async (req, res) => {
 const data = await readMedia(mediaFile)
res.send( data)
   })
 router.get("/:imdbID", async (req, res) => {
    
      const data = await readMedia(mediaFile)
      const oneMedia = data.find((b) => b.imdbID === req.params.imdbID)
     if(oneMedia){
         res.status(200).send(oneMedia)
     }else{
         res.send("NO exist")
     }
     })
  
router.post(
    "/", // [
    // check("imdbID").exists().withMessage("id is generated"),
    //   check("Title").exists().withMessage("Title is required"),
    //   check("Year").exists().withMessage("Year is required"),
    //   check("Type").exists().withMessage("Type is required"),
    //   check("Poster").exists().withMessage("Poster is required"),
    // ],
    async (req, res) => {
       const errors = validationResult(req)
      const media = await readMedia(mediaFile)
      const create = media.find((x) => x.imdbID === req.body.imdbID) //get a previous element with the same asin
        if (create) {
          res.status(404).send("No created , change imdbID")
        }else{ 
            media.push({ createdAt: new Date(), imdbID:uniqid(),...req.body })
          await writeMedia(mediaFile, media)
          res.status(201).send("created")
            console.log(req.body)
        }
     
    }
  )
  

  
  router.put("/:imdbID", async (req, res) => {
    delete req.body.id
   delete req.body.createdAt
      const media = await readMedia(mediaFile)
      const movieEdit = media.find((b) => b.imdbID === req.params.imdbID)
      if (movieEdit) {
        const position = media.indexOf(movieEdit)
        const movieUp = { ...movieEdit, ...req.body } // In this way we can also implement the "patch" endpoint
        media[position] = movieUp
        await writeMedia(mediaFile, media)
        res.status(200).send(movieUp)
      } else {
       res.send("error")
      }
   
    
  })
  
  router.delete("/:imdbID", async (req, res) => {
  const media = await readMedia(mediaFile)
      const mediaCheck = media.find((b) => b.imdbID === req.params.imdbID)
      if (mediaCheck) {
        await writeMedia(
          mediaFile,
          media.filter((check) => check.imdbID !== req.params.imdbID)
        )
        res.send("Deleted")
      } else {
    res.send("does not exist")  
    }
  })

  router.get("/:imdbID/reviews", async (req, res)=>{
    const reviews = await readMedia(reviewsFile)
    const reviewers = reviews.filter((rev) => rev.elementId === req.params.imdbID)
   if(reviewers){
     res.send(reviewers)  
   }else{
       res.send("No review")
   }    
  })

  router.post("/:imdbID/reviews", async(req, res) => {

    const media  = await readMedia(mediaFile)
    const med = media.find((b) => b.imdbID === req.params.imdbID)
    if (med) { 
      const reviews = await readMedia(reviewsFile)
      reviews.push({...req.body, createdAt: new Date(), elementId: req.params.imdbID})
      await writeMedia(reviewsFile, reviews)
      res.send("OK")
    }else{
 res.send("No posting")
    }
  })
  router.put("/:imdbID/reviews", async (req, res) => {
 
      const media = await readMedia(mediaFile)
      const movieEdit = media.find((b) => b.imdbID === req.params.imdbID)
      if (movieEdit) {
        const reviews = await readMedia(reviewsFile)
        const rev = reviews.find((b) => b.elementId === req.params.imdbID)
        const position = reviews.indexOf(rev)
        const reviewUp = { ...rev, ...req.body } // In this way we can also implement the "patch" endpoint
        reviews[position] = reviewUp
        await writeMedia(reviewsFile, reviews)
        res.status(200).send(reviewUp)
      } else {
       res.send("error")
      }
   
    
  })
  router.delete("/:imdbID/reviews", async (req, res) => {
    // const media = await readMedia(mediaFile)
    //     const mediaCheck = media.find((b) => b.imdbID === req.params.imdbID)
    //     if (mediaCheck) {
            const reviews = await readMedia(reviewsFile)
            const rev = reviews.find((check) => check.elementId !== req.params.imdbID)
            if(rev){
  await writeMedia(reviewsFile,rev)
           res.send("Deleted")
        } else {
      res.send("does not exist")  
      }
    })
  

  
  router.post("/:imdbID/upload", upload.single("avatar"), async (req, res) => {
    
      const fileName = req.params.imdbID + path.extname(req.file.originalname)
      const fileDestination = join(mediaFolder, fileName)
      
      await fs.writeFile( fileDestination, req.file.buffer)
  
      const img = await readMedia(mediaFile)
      const image = img.find((b) => b.imdbID === req.params.imdbID)
      console.log(image)
      if (image) {
        const position = img.indexOf(image)
        const imazhes = { ...image, Poster: "http://localhost:3001/media/img/"  + fileName} 
        img[position] = imazhes
        console.log(mediaFolder)
        await writeMedia(mediaFile, img)
        res.status(200).send("Uploaded")
      } else {
       res.send("Could't upload")
      }  
  })


module.exports = router


