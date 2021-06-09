import express, { Application } from "express"
const server: Application = express()
const port: number = 8000

server.get("/", (req, res) => {
  res.status(200).send()
})

server.listen(port, () => console.log(`Server running on port ${port}`))
