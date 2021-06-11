import express, { Application } from "express"
import { Op } from "sequelize"

import dbSetup from "./dbSetup"
import { AllModels } from "./models"
import { languages, categories } from "./constants"

const server: Application = express()
let models: AllModels

server.get("/getbycategory", async (req, res): Promise<void> => {
  try {
    const { category, language } = req.query

    if (
      categories.has(category as string) &&
      languages.has(language as string)
    ) {
      const { orgObj, locObj, servObj } = models

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
    } else {
      throw new Error("language or category parameter is not valid")
    }
  } catch (error) {
    console.error(error.message)
    res.json(error.message)
  }
})

server.get("/getsinglerecord", async (req, res): Promise<void> => {
  try {
    const { id, language } = req.query

    if (languages.has(language as string)) {
      const { orgObj, locObj, servObj, schObj } = models

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
    } else {
      throw new Error("language parameter is not valid")
    }
  } catch (error) {
    console.error(error)
    res.json(error)
  }
})

server.get("/searchbykeyword", async (req, res): Promise<void> => {
  try {
    const { query, language } = req.query

    if (languages.has(language as string)) {
      const { orgObj, locObj } = models

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
    } else {
      throw new Error("language parameter is not valid")
    }
  } catch (error) {
    console.error(error)
    res.json(error)
  }
})

server.listen(8000, (): void => {
  console.log(`Express server up and running`)
  models = dbSetup()
})
