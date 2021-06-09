import { Sequelize, Model, DataTypes, ModelCtor } from "sequelize"

export interface Service extends Model {
  id: number
  name_english: string
  name_spanish: string
}

const dbSetup = (): ModelCtor<Service> => {
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

  const serviceModel: ModelCtor<Service> = sql.define<Service>(
    "services",
    {
      id: { primaryKey: true, type: DataTypes.INTEGER },
      name_english: { type: DataTypes.TEXT },
      name_spanish: { type: DataTypes.TEXT },
    },
    { timestamps: false }
  )

  sql.sync({ force: false }).then(() => console.log("Database models created"))

  return serviceModel
}

export default dbSetup
