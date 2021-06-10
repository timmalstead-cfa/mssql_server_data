"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const id = { primaryKey: true, type: sequelize_1.DataTypes.INTEGER };
const opt = { timestamps: false };
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
    const orgObj = sql.define("organizations", {
        id,
        name_english: { type: sequelize_1.DataTypes.TEXT },
        name_spanish: { type: sequelize_1.DataTypes.TEXT },
        website: { type: sequelize_1.DataTypes.TEXT },
        languages_spoken_english: { type: sequelize_1.DataTypes.TEXT },
        languages_spoken_spanish: { type: sequelize_1.DataTypes.TEXT },
        customers_served_english: { type: sequelize_1.DataTypes.TEXT },
        customers_served_spanish: { type: sequelize_1.DataTypes.TEXT },
        notes_english: { type: sequelize_1.DataTypes.TEXT },
        notes_spanish: { type: sequelize_1.DataTypes.TEXT },
        categories_english: { type: sequelize_1.DataTypes.TEXT },
        categories_spanish: { type: sequelize_1.DataTypes.TEXT },
        tags_english: { type: sequelize_1.DataTypes.TEXT },
        tags_spanish: { type: sequelize_1.DataTypes.TEXT },
    }, opt);
    const locObj = sql.define("locations", {
        id,
        latitude: { type: sequelize_1.DataTypes.FLOAT },
        longitude: { type: sequelize_1.DataTypes.FLOAT },
        zip: { type: sequelize_1.DataTypes.INTEGER },
        city: { type: sequelize_1.DataTypes.TEXT },
        name: { type: sequelize_1.DataTypes.TEXT },
        website: { type: sequelize_1.DataTypes.TEXT },
        address: { type: sequelize_1.DataTypes.TEXT },
        address_2: { type: sequelize_1.DataTypes.TEXT },
        state: { type: sequelize_1.DataTypes.TEXT },
        phone: { type: sequelize_1.DataTypes.TEXT },
        email: { type: sequelize_1.DataTypes.TEXT },
        notes: { type: sequelize_1.DataTypes.TEXT },
    }, opt);
    const servObj = sql.define("services", {
        id,
        name_english: { type: sequelize_1.DataTypes.TEXT },
        name_spanish: { type: sequelize_1.DataTypes.TEXT },
    }, opt);
    const schObj = sql.define("schedules", {
        id,
        open_time: { type: sequelize_1.DataTypes.TEXT },
        close_time: { type: sequelize_1.DataTypes.TEXT },
        days: { type: sequelize_1.DataTypes.TEXT },
        notes: { type: sequelize_1.DataTypes.TEXT },
    }, opt);
    const locOrgObj = sql.define("locations_organizations", {
        locations_id: { type: sequelize_1.DataTypes.INTEGER },
        organizations_id: { type: sequelize_1.DataTypes.INTEGER },
    }, opt);
    const schLocObj = sql.define("schedules_locations", {
        schedules_id: { type: sequelize_1.DataTypes.INTEGER },
        locations_id: { type: sequelize_1.DataTypes.INTEGER },
    }, opt);
    const schOrgObj = sql.define("schedules_organizations", {
        schedules_id: { type: sequelize_1.DataTypes.INTEGER },
        organizations_id: { type: sequelize_1.DataTypes.INTEGER },
    }, opt);
    const servLocObj = sql.define("services_locations", {
        services_id: { type: sequelize_1.DataTypes.INTEGER },
        locations_id: { type: sequelize_1.DataTypes.INTEGER },
    }, opt);
    const servOrgObj = sql.define("services_organizations", {
        services_id: { type: sequelize_1.DataTypes.INTEGER },
        organizations_id: { type: sequelize_1.DataTypes.INTEGER },
    }, opt);
    [locOrgObj, schLocObj, schOrgObj, servLocObj, servOrgObj].forEach((model) => model.removeAttribute("id"));
    sql.sync({ force: false }).then(() => console.log("Database models created"));
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
    ];
};
exports.default = dbSetup;
//# sourceMappingURL=dbSetup.js.map