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
const airtableRecord = {
    locations: [
        {
            uuid: "recl0KjHG4X4TAM3B",
            id: 3,
            latitude: 34.42281639999999,
            longitude: -119.7136682,
            zip: 93101,
            city: "Santa Barbara",
            name: "test123",
            website: "www.recover123.test",
            address: "1532 Castillo Street",
            address_2: "123",
            state: "CA",
            email: "123@test.com",
            phone: "(805) 364-2727",
            notes: "123",
            services: "Sober Living Homes",
            org_name: "Recovery Santa Barbara",
            multiple_categories: [Array],
            single_category: "search",
            schedule: [Array],
        },
    ],
    id: "recl0KjHG4X4TAM3B",
    name: "Recovery Santa Barbara",
    name_spanish: "Recuperación Santa Bárbara",
    website: "https://recoverysantabarbara.com/",
    languages_spoken: "English",
    languages_spoken_spanish: "inglés",
    customers_served: "123",
    customers_served_spanish: "123",
    notes: "Co-ed sober living home. Provides full wrap around transitional services. Monthly commitment required. \n" +
        "Cost: $39/day OR $1189/month \n",
    notes_spanish: "Hogar mixto de vida sobria. Proporciona servicios de transición completos. Se requiere compromiso mensual. Costo: $ 39 / día O $ 1189 / mes",
    categories: ["substance use"],
    categories_spanish: ["uso de sustancias"],
    tags: [
        "required",
        "english",
        "1532 castillo street",
        "services",
        "recovery santa barbara",
        "around",
        "sober living homes",
        "1189month",
        "commitment",
        "coed",
        "93101",
        "substance use",
        "drugs",
        "addiction",
        "wrap",
        "cost",
        "living",
        "recovery",
        "39day",
        "full",
        "transitional",
        "home",
        "provides",
        "monthly",
        "santa barbara",
        "alcohol",
        "sober",
    ],
    tags_spanish: [
        "costo",
        "recuperación",
        "envolver",
        "mixto",
        "alrededor",
        "mensual",
        "viviendo",
        "1189 meses",
        "inglés",
        "transicional",
        "93101",
        "casas de vida sobria",
        "completo",
        "casa",
        "1532 calle castillo",
        "proporciona",
        "uso de sustancias",
        "adiccion",
        "sobrio",
        "compromiso",
        "requerido",
        "recuperación santa barbara",
        "santa barbara",
        "servicios",
        "39 días",
        "alcohol",
        "drogas",
    ],
};
const mssqlRecord = {
    locations: [
        {
            id: 3,
            latitude: 34.42281723022461,
            longitude: -119.71366882324219,
            zip: 93101,
            city: '"Santa Barbara"',
            name: '"test123"',
            website: '"www.recover123.test"',
            address: '"1532 Castillo Street"',
            address_2: '"123"',
            state: '"CA"',
            email: '"123@test.com"',
            phone: '"(805) 364-2727"',
            notes: '"123"',
            services: [
                {
                    id: 3,
                    name_english: '"Sober Living Homes"',
                    name_spanish: '"Viviendas sobrias"',
                },
            ],
            schedules: [
                {
                    id: 67,
                    open_time: '"20:00"',
                    close_time: '"21:00"',
                    days: '"Wed<&&> Thu"',
                    notes: null,
                },
                {
                    id: 652,
                    open_time: '"08:00"',
                    close_time: '"18:00"',
                    days: '"Mon<&&> Tue<&&> Wed<&&> Thu<&&> Fri"',
                    notes: '"123"',
                },
            ],
        },
    ],
    id: 2,
    name_english: '"Recovery Santa Barbara"',
    name_spanish: '"Recuperacion Santa Barbara"',
    website: '"https://recoverysantabarbara.com/"',
    languages_spoken_english: '"English"',
    languages_spoken_spanish: '"ingles"',
    customers_served_english: null,
    customers_served_spanish: null,
    notes_english: '"Co-ed sober living home. Provides full wrap around transitional services. Monthly commitment required. Cost: $39/day OR $1189/month "',
    notes_spanish: '"Hogar mixto de vida sobria. Proporciona servicios de transicion completos. Se requiere compromiso mensual. Costo: $ 39 / dia O $ 1189 / mes"',
    categories_english: '"substance use"',
    categories_spanish: '"uso de sustancias"',
    tags_english: '"required<&&>english<&&>1532 castillo street<&&>services<&&>recovery santa barbara<&&>around<&&>sober living homes<&&>1189month<&&>commitment<&&>coed<&&>93101<&&>substance use<&&>drugs<&&>addiction<&&>wrap<&&>cost<&&>living<&&>recovery<&&>39day<&&>full<&&>transitional<&&>home<&&>provides<&&>monthly<&&>santa barbara<&&>alcohol<&&>sober"',
    tags_spanish: '"costo<&&>recuperacion<&&>envolver<&&>mixto<&&>alrededor<&&>mensual<&&>viviendo<&&>1189 meses<&&>ingles<&&>transicional<&&>93101<&&>casas de vida sobria<&&>completo<&&>casa<&&>1532 calle castillo<&&>proporciona<&&>uso de sustancias<&&>adiccion<&&>sobrio<&&>compromiso<&&>requerido<&&>recuperacion santa barbara<&&>santa barbara<&&>servicios<&&>39 dias<&&>alcohol<&&>drogas"',
};
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
server.get("/searchbykeyword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, language } = req.query;
    const returnedOrgs = yield org.findAll({
        where: { [`tags_${language}`]: { [sequelize_1.Op.like]: `%${query}%` } },
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