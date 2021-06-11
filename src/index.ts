import express, { Application } from "express"
import { Op } from "sequelize"

import dbSetup from "./dbSetup"
import { AllModels } from "./models"

const server: Application = express()
let models: AllModels

// TODO: add checks for route parameters. I don't think that there's too much danger for injection, but why risk it?
server.get("/getbycategory", async (req, res): Promise<void> => {
  try {
    const { orgObj, locObj, servObj } = models
    const { category, language } = req.query

    const returnedOrgs = await orgObj.findAll({
      where: { [`categories_${language}`]: { [Op.like]: `%${category}%` } },
      attributes: [
        "id",
        `categories_${language}`,
        `name_${language}`,
        `tags_${language}`,
      ],
      include: [
        {
          model: locObj,
          required: false,
          attributes: ["latitude", "longitude", "city"],
          through: { attributes: [] },
          include: [
            {
              model: servObj,
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
    res.json(error)
  }
})

server.get("/getsinglerecord", async (req, res): Promise<void> => {
  const { orgObj, locObj, servObj, schObj } = models
  const { id, language } = req.query

  const returnedOrg = await orgObj.findOne({
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
        model: locObj,
        required: false,
        through: { attributes: [] },
        include: [
          {
            model: servObj,
            required: false,
            attributes: ["id", `name_${language}`],
            through: { attributes: [] },
          },
          {
            model: schObj,
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
  const { orgObj, locObj } = models
  const { query, language } = req.query

  const returnedOrgs = await orgObj.findAll({
    where: { [`tags_${language}`]: { [Op.like]: `%${query}%` } },
    attributes: [
      "id",
      `categories_${language}`,
      `name_${language}`,
      `tags_${language}`,
    ],
    include: [
      {
        model: locObj,
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
  models = dbSetup()
})
