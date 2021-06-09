"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbSetup = () => {
    const sql = new sequelize_1.Sequelize({
        dialect: "mssql",
        host: "localhost",
        port: 1433,
        database: "thrive",
        username: "sa",
        password: "Dev_Ms_SQL_Server_2019",
    });
    sql
        .authenticate()
        .then(() => {
        console.log("SQL database connection established");
    })
        .catch((err) => {
        console.error(`Unable to connect to SQL database: ${err}`);
    });
    const serviceModel = sql.define("services", {
        id: { primaryKey: true, type: sequelize_1.DataTypes.INTEGER },
        name_english: { type: sequelize_1.DataTypes.TEXT },
        name_spanish: { type: sequelize_1.DataTypes.TEXT },
    }, { timestamps: false });
    sql.sync({ force: false }).then(() => console.log("Database models created"));
    return serviceModel;
};
exports.default = dbSetup;
//# sourceMappingURL=dbSetup.js.map