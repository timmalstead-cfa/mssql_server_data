import express, { Application } from "express"
import { Sequelize } from "sequelize"

const sql = new Sequelize({
  dialect: "mssql",
  host: "localhost",
  port: 1433,
  database: "thrive",
  username: "sa",
  password: "Dev_Ms_SQL_Server_2019",
})
const server: Application = express()

server.get("/", (req, res): void => {
  res.json("howdy!")
})

server.listen(8000, () => console.log(`Express server up and running`))
sql
  .authenticate()
  .then(() => {
    console.log("SQL database connection established")
  })
  .catch((err) => {
    console.error(`Unable to connect to SQL database: ${err}`)
  })
