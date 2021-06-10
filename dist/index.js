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
let org, loc, serv, sch, locOrg, schLoc, schOrg, servLoc, servOrg;
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
                through: { attributes: ["locations_id", "organizations_id"] },
                include: [
                    {
                        model: serv,
                        attributes: [`name_${language}`],
                        through: { attributes: ["services_id", "locations_id"] },
                    },
                ],
            },
        ],
        order: [[`name_${language}`, "ASC"]],
    });
    res.json(returnedOrgs);
}));
server.listen(8000, () => {
    console.log(`Express server up and running`);
    const [orgObj, locObj, servObj, schObj, locOrgObj, schLocObj, schOrgObj, servLocObj, servOrgObj,] = dbSetup_1.default();
    org = orgObj;
    loc = locObj;
    serv = servObj;
    sch = schObj;
    locOrg = locOrgObj;
    schLoc = schLocObj;
    schOrg = schOrgObj;
    servLoc = servLocObj;
    servOrg = servOrgObj;
});
//# sourceMappingURL=index.js.map