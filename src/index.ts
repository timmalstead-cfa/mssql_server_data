import express, { Application } from "express"
import { ModelCtor } from "sequelize"

import dbSetup, { Service } from "./dbSetup"

let Service: ModelCtor<Service>

const server: Application = express()

server.get("/", async (req, res): Promise<void> => {
  const allServices: Service[] = await Service.findAll()
  res.json(allServices)
})

server.listen(8000, (): void => {
  console.log(`Express server up and running`)
  const serviceModel = dbSetup()
  Service = serviceModel
})
