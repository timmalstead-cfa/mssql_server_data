"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const sql = new sequelize_1.Sequelize({
    dialect: "mssql",
    host: "localhost",
    port: 1433,
    database: "thrive",
    username: "sa",
    password: "Dev_Ms_SQL_Server_2019",
});
const server = express_1.default();
server.get("/", (req, res) => {
    res.json("howdy!");
});
server.listen(8000, () => console.log(`Express server up and running`));
sql
    .authenticate()
    .then(() => {
    console.log("SQL database connection established");
})
    .catch((err) => {
    console.error(`Unable to connect to SQL database: ${err}`);
});
//# sourceMappingURL=index.js.map