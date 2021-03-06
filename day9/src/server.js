const express = require("express")
const path = require("path")
const cors = require("cors")
const listEndpoints = require("express-list-endpoints")
const productsRouter = require("./services/products")
const reviewsRouter = require("./services/reviews")
const router = require("./services/xml")
const YAML = require("yamljs")
const swaggerUI = require("swagger-ui-express")
const { join } = require("path")

const {
  catchAllHandler,
  forbiddenHandler,
  unauthorizedHandler,
  notFoundHandler,
} = require("./errorHandlers")
const swaggerDocument = YAML.load(join(__dirname, "./api.yml"))
const server = express()
const port = process.env.PORT

server.use(express.json())
server.use(cors())

//make the content of the images folder available
server.use("/images", express.static(path.join(__dirname, "images")))

// Route /products
server.use("/products", productsRouter)

// Route /reviews
server.use("/reviews", reviewsRouter)

// Error handlers
server.use(notFoundHandler)
server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(catchAllHandler)
server.use("/xml" , router)
console.log(listEndpoints(server))

server.listen(port, () => {
  console.log("Server is running on ", port)
})
