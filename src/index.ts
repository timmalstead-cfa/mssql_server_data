import express, { Application } from "express"

import dbSetup from "./dbSetup"
import {
  Organization,
  Location,
  Service,
  Schedule,
  LocationOrganization,
  ScheduleLocation,
  ScheduleOrganization,
  ServiceLocation,
  ServiceOrganization,
} from "./models"

let org: Organization,
  loc: Location,
  serv: Service,
  sch: Schedule,
  locOrg: LocationOrganization,
  schLoc: ScheduleLocation,
  schOrg: ScheduleOrganization,
  servLoc: ServiceLocation,
  servOrg: ServiceOrganization

const server: Application = express()

server.get("/", async (req, res): Promise<void> => {
  const allResults = await servOrg.findAll()
  res.json(allResults)
})

server.listen(8000, (): void => {
  console.log(`Express server up and running`)
  const [
    orgObj,
    locObj,
    servObj,
    schObj,
    locOrgObj,
    schLocObj,
    schOrgObj,
    servLocObj,
    servOrgObj,
  ] = dbSetup()
  org = orgObj
  loc = locObj
  serv = servObj
  sch = schObj
  locOrg = locOrgObj
  schLoc = schLocObj
  schOrg = schOrgObj
  servLoc = servLocObj
  servOrg = servOrgObj
})
