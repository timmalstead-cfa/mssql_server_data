import express, { Application } from "express"
import { Op } from "sequelize"

import dbSetup from "./dbSetup"
import { Organization, Location, Service, Schedule } from "./models"

let org: Organization, loc: Location, serv: Service, sch: Schedule

const server: Application = express()

// TODO: add checks for route parameters. I don't think that there's too much danger for injection, but why risk it?
server.get("/getbycategory", async (req, res): Promise<void> => {
  try {
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
          required: false,
          attributes: ["latitude", "longitude", "city"],
          through: { attributes: [] },
          include: [
            {
              model: serv,
              required: false,
              attributes: [`name_${language}`],
              through: { attributes: [] },
            },
          ],
        },
      ],
      order: [[`name_${language}`, "ASC"]],
    })

    res.json(returnedOrgs)
  } catch (error) {
    console.error(error)
  }
})

server.get("/getsinglerecord", async (req, res): Promise<void> => {
  const { id, language } = req.query

  const returnedOrg = await org.findOne({
    where: { id },
    attributes: [
      "id",
      `name_${language}`,
      "website",
      `languages_spoken_${language}`,
      `customers_served_${language}`,
      `notes_${language}`,
      `tags_${language}`,
    ],
    include: [
      {
        model: loc,
        required: false,
        through: { attributes: [] },
        include: [
          {
            model: serv,
            required: false,
            attributes: ["id", `name_${language}`],
            through: { attributes: [] },
          },
          {
            model: sch,
            required: false,
            through: { attributes: [] },
          },
        ],
      },
    ],
  })

  res.json(returnedOrg)
})

server.get("/searchbykeyword", async (req, res): Promise<void> => {
  const { query, language } = req.query

  const returnedOrgs = await org.findAll({
    where: { [`tags_${language}`]: { [Op.like]: `%${query}%` } },
    attributes: [
      "id",
      `categories_${language}`,
      `name_${language}`,
      `tags_${language}`,
    ],
    include: [
      {
        model: loc,
        attributes: ["latitude", "longitude", "city"],
        through: { attributes: [] },
      },
    ],
    order: [[`name_${language}`, "ASC"]],
  })

  res.json(returnedOrgs)
})

server.listen(8000, (): void => {
  console.log(`Express server up and running`)
  const [orgObj, locObj, servObj, schObj] = dbSetup()
  org = orgObj
  loc = locObj
  serv = servObj
  sch = schObj
})
