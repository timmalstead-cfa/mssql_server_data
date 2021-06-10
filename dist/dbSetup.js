"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { TEXT, INTEGER, FLOAT } = sequelize_1.DataTypes;
const opt = { timestamps: false };
const dbSetup = () => {
    try {
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
            id: { primaryKey: true, type: INTEGER },
            name_english: { type: TEXT },
            name_spanish: { type: TEXT },
            website: { type: TEXT },
            languages_spoken_english: { type: TEXT },
            languages_spoken_spanish: { type: TEXT },
            customers_served_english: { type: TEXT },
            customers_served_spanish: { type: TEXT },
            notes_english: { type: TEXT },
            notes_spanish: { type: TEXT },
            categories_english: { type: TEXT },
            categories_spanish: { type: TEXT },
            tags_english: { type: TEXT },
            tags_spanish: { type: TEXT },
        }, opt);
        const locObj = sql.define("locations", {
            id: { primaryKey: true, type: INTEGER },
            latitude: { type: FLOAT },
            longitude: { type: FLOAT },
            zip: { type: INTEGER },
            city: { type: TEXT },
            name: { type: TEXT },
            website: { type: TEXT },
            address: { type: TEXT },
            address_2: { type: TEXT },
            state: { type: TEXT },
            phone: { type: TEXT },
            email: { type: TEXT },
            notes: { type: TEXT },
        }, opt);
        const servObj = sql.define("services", {
            id: { primaryKey: true, type: INTEGER },
            name_english: { type: TEXT },
            name_spanish: { type: TEXT },
        }, opt);
        const schObj = sql.define("schedules", {
            id: { primaryKey: true, type: INTEGER },
            open_time: { type: TEXT },
            close_time: { type: TEXT },
            days: { type: TEXT },
            notes: { type: TEXT },
        }, opt);
        const locOrgObj = sql.define("locations_organizations", {
            locations_id: { type: INTEGER },
            organizations_id: { type: INTEGER },
        }, opt);
        const schLocObj = sql.define("schedules_locations", {
            schedules_id: { type: INTEGER },
            locations_id: { type: INTEGER },
        }, opt);
        const schOrgObj = sql.define("schedules_organizations", {
            schedules_id: { type: INTEGER },
            organizations_id: { type: INTEGER },
        }, opt);
        const servLocObj = sql.define("services_locations", {
            services_id: { type: INTEGER },
            locations_id: { type: INTEGER },
        }, opt);
        const servOrgObj = sql.define("services_organizations", {
            services_id: { type: INTEGER },
            organizations_id: { type: INTEGER },
        }, opt);
        [locOrgObj, schLocObj, schOrgObj, servLocObj, servOrgObj].forEach((model) => model.removeAttribute("id"));
        orgObj.belongsToMany(locObj, {
            through: "locations_organizations",
            foreignKey: "organizations_id",
        });
        locObj.belongsToMany(orgObj, {
            through: "locations_organizations",
            foreignKey: "locations_id",
        });
        locObj.belongsToMany(servObj, {
            through: "services_locations",
            foreignKey: "locations_id",
        });
        servObj.belongsToMany(locObj, {
            through: "services_locations",
            foreignKey: "services_id",
        });
        sql
            .sync({ force: false })
            .then(() => console.log("Database models created"));
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
    }
    catch (err) {
        console.error(`Error setting up database: ${err}`);
    }
};
exports.default = dbSetup;
//# sourceMappingURL=dbSetup.js.map