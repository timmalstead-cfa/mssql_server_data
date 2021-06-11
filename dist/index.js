"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const dbSetup_1 = __importDefault(require("./dbSetup"));
let org, loc, serv, sch;
const server = express_1.default();
// TODO: add checks for route parameters. I don't think that there's too much danger for injection, but why risk it?
server.get("/getbycategory", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, language } = req.query;
        const returnedOrgs = yield org.findAll({
            where: { [`categories_${language}`]: { [sequelize_1.Op.like]: `%${category}%` } },
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
        });
        res.json(returnedOrgs);
    }
    catch (error) {
        console.error(error);
    }
}));
server.get("/getsinglerecord", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, language } = req.query;
    const returnedOrg = yield org.findOne({
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
    });
    res.json(returnedOrg);
}));
const airTable = {
    id: "recsVtntnPQukUFRf",
    fields: {
        org_name: "Central Coast Headway",
        org_categories: ["substance use"],
        org_categories_spanish: ["uso de sustancias"],
        org_tags: ["central coast headway"],
        locations_city: ["Santa Maria", "Lompoc"],
        location_latitude: [34.9685017, 34.6475392],
        location_longitude: [-120.4258149, -120.4568708],
    },
    createdTime: "2020-12-11T22:00:38.000Z",
};
const mssql = {
    id: 975,
    name_english: '"Central Coast Headway"',
    categories_english: '"substance use"',
    categories_spanish: '"uso de sustancias"',
    tags_english: '"recovery<&&>substance use<&&>drugs<&&>addiction<&&>outpatient counseling<&&>lompoc<&&>santa maria<&&>english<&&>318 w. carmel lane<&&>115 e. college ave<&&>93454<&&>central coast headway<&&>93436<&&>alcohol"',
    locations: [
        {
            latitude: 34.968502044677734,
            longitude: -120.42581176757812,
            city: '"Santa Maria"',
        },
        {
            latitude: 34.64754104614258,
            longitude: -120.45687103271484,
            city: '"Lompoc"',
        },
    ],
};
server.get("/searchbykeyword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, language } = req.query;
    const returnedOrgs = yield org.findAll({
        where: { [`tags_${language}`]: { [sequelize_1.Op.like]: `%${query}%` } },
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
    });
    res.json(returnedOrgs);
}));
server.listen(8000, () => {
    console.log(`Express server up and running`);
    const [orgObj, locObj, servObj, schObj] = dbSetup_1.default();
    org = orgObj;
    loc = locObj;
    serv = servObj;
    sch = schObj;
});
//# sourceMappingURL=index.js.map