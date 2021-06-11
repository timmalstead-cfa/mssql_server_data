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
// TODO: add checks for category and language parameters. I don't think that there's too much danger for injection, but why risk it?
server.get("/getbycategory", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                attributes: ["latitude", "longitude", "city"],
                through: { attributes: [] },
                include: [
                    {
                        model: serv,
                        attributes: [`name_${language}`],
                        through: { attributes: [] },
                    },
                ],
            },
        ],
        order: [[`name_${language}`, "ASC"]],
    });
    res.json(returnedOrgs);
}));
server.get("/getsinglerecord", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const returnedOrg = yield org.findOne({
        where: { id },
        include: [
            {
                model: loc,
                through: { attributes: [] },
                include: [
                    {
                        model: serv,
                        through: { attributes: [] },
                    },
                    {
                        model: sch,
                        through: { attributes: [] },
                    },
                ],
            },
        ],
    });
    res.json(returnedOrg);
}));
// `${BASE_URL}/organization?filterByFormula=SEARCH(%22${searchQuery}%22%2Corg_tags${append})&fields%5B%5D=org_name${append}&fields%5B%5D=org_tags${append}&fields%5B%5D=org_categories&&fields%5B%5D=org_categories_spanish&fields%5B%5D=location_latitude&fields%5B%5D=location_longitude&maxRecords=50&sort%5B0%5D%5Bfield%5D=org_name${append}&fields%5B%5D=locations_city`
// search by query is included in tags
//return:
// id
// org categories english
// org categories spanish
// org name language
// org tags language
// loc latitude
// loc longitude
// loc city
// order by orn name language
server.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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