import { Sequelize, DataTypes, ModelOptions } from "sequelize"
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
  AllModels,
} from "./models"

const id = { primaryKey: true, type: DataTypes.INTEGER }
const opt: ModelOptions = { timestamps: false }

const dbSetup = (): AllModels => {
  const sql = new Sequelize({
    dialect: "mssql",
    host: "localhost",
    port: 1433,
    database: "thrive",
    username: "sa",
    password: "Dev_Ms_SQL_Server_2019",
  })

  sql
    .authenticate()
    .then(() => {
      console.log("SQL database connection established")
    })
    .catch((err) => {
      console.error(`Unable to connect to SQL database: ${err}`)
    })

  const orgObj: Organization = sql.define(
    "organizations",
    {
      id,
      name_english: { type: DataTypes.TEXT },
      name_spanish: { type: DataTypes.TEXT },
      website: { type: DataTypes.TEXT },
      languages_spoken_english: { type: DataTypes.TEXT },
      languages_spoken_spanish: { type: DataTypes.TEXT },
      customers_served_english: { type: DataTypes.TEXT },
      customers_served_spanish: { type: DataTypes.TEXT },
      notes_english: { type: DataTypes.TEXT },
      notes_spanish: { type: DataTypes.TEXT },
      categories_english: { type: DataTypes.TEXT },
      categories_spanish: { type: DataTypes.TEXT },
      tags_english: { type: DataTypes.TEXT },
      tags_spanish: { type: DataTypes.TEXT },
    },
    opt
  )

  const locObj: Location = sql.define(
    "locations",
    {
      id,
      latitude: { type: DataTypes.FLOAT },
      longitude: { type: DataTypes.FLOAT },
      zip: { type: DataTypes.INTEGER },
      city: { type: DataTypes.TEXT },
      name: { type: DataTypes.TEXT },
      website: { type: DataTypes.TEXT },
      address: { type: DataTypes.TEXT },
      address_2: { type: DataTypes.TEXT },
      state: { type: DataTypes.TEXT },
      phone: { type: DataTypes.TEXT },
      email: { type: DataTypes.TEXT },
      notes: { type: DataTypes.TEXT },
    },
    opt
  )

  const servObj: Service = sql.define(
    "services",
    {
      id,
      name_english: { type: DataTypes.TEXT },
      name_spanish: { type: DataTypes.TEXT },
    },
    opt
  )

  const schObj: Schedule = sql.define(
    "schedules",
    {
      id,
      open_time: { type: DataTypes.TEXT },
      close_time: { type: DataTypes.TEXT },
      days: { type: DataTypes.TEXT },
      notes: { type: DataTypes.TEXT },
    },
    opt
  )

  const locOrgObj: LocationOrganization = sql.define(
    "locations_organizations",
    {
      locations_id: { type: DataTypes.INTEGER },
      organizations_id: { type: DataTypes.INTEGER },
    },
    opt
  )

  const schLocObj: ScheduleLocation = sql.define(
    "schedules_locations",
    {
      schedules_id: { type: DataTypes.INTEGER },
      locations_id: { type: DataTypes.INTEGER },
    },
    opt
  )

  const schOrgObj: ScheduleOrganization = sql.define(
    "schedules_organizations",
    {
      schedules_id: { type: DataTypes.INTEGER },
      organizations_id: { type: DataTypes.INTEGER },
    },
    opt
  )

  const servLocObj: ServiceLocation = sql.define(
    "services_locations",
    {
      services_id: { type: DataTypes.INTEGER },
      locations_id: { type: DataTypes.INTEGER },
    },
    opt
  )

  const servOrgObj: ServiceOrganization = sql.define(
    "services_organizations",
    {
      services_id: { type: DataTypes.INTEGER },
      organizations_id: { type: DataTypes.INTEGER },
    },
    opt
  )

  ;[locOrgObj, schLocObj, schOrgObj, servLocObj, servOrgObj].forEach((model) =>
    model.removeAttribute("id")
  )

  sql.sync({ force: false }).then(() => console.log("Database models created"))

  return [
    orgObj,
    locObj,
    servObj,
    schObj,
    locOrgObj,
    schLocObj,
    schOrgObj,
    servLocObj,
    servOrgObj,
  ]
}

export default dbSetup
