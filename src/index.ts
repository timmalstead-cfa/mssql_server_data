import express, { Application } from "express"
import { Op } from "sequelize"

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

// TODO: add checks for category and language parameters. I don't think that there's too much danger for injection, but why risk it?
server.get("/getbycategory", async (req, res): Promise<void> => {
  const { category, language } = req.query

  const returnedOrgs = await org.findAll({
    where: { [`categories_${language}`]: { [Op.like]: `%${category}%` } },
    attributes: [
      "id",
      "categories_english",
      "categories_spanish",
      `name_${language}`,
      `tags_${language}`,
    ],
    include: [
      {
        model: loc,
        attributes: ["latitude", "longitude", "city"],
        through: { attributes: ["locations_id", "organizations_id"] },
        include: [
          {
            model: serv,
            attributes: [`name_${language}`],
            through: { attributes: ["services_id", "locations_id"] },
          },
        ],
      },
    ],
    order: [[`name_${language}`, "ASC"]],
  })

  res.json(returnedOrgs)
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
