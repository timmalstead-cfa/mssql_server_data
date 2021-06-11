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
const server = express_1.default();
let models;
// TODO: add checks for route parameters. I don't think that there's too much danger for injection, but why risk it?
server.get("/getbycategory", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orgObj, locObj, servObj } = models;
        const { category, language } = req.query;
        const returnedOrgs = yield orgObj.findAll({
            where: { [`categories_${language}`]: { [sequelize_1.Op.like]: `%${category}%` } },
            attributes: [
                "id",
                `categories_${language}`,
                `name_${language}`,
                `tags_${language}`,
            ],
            include: [
                {
                    model: locObj,
                    required: false,
                    attributes: ["latitude", "longitude", "city"],
                    through: { attributes: [] },
                    include: [
                        {
                            model: servObj,
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
        res.json(error);
    }
}));
server.get("/getsinglerecord", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orgObj, locObj, servObj, schObj } = models;
    const { id, language } = req.query;
    const returnedOrg = yield orgObj.findOne({
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
                model: locObj,
                required: false,
                through: { attributes: [] },
                include: [
                    {
                        model: servObj,
                        required: false,
                        attributes: ["id", `name_${language}`],
                        through: { attributes: [] },
                    },
                    {
                        model: schObj,
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
    const { orgObj, locObj } = models;
    const { query, language } = req.query;
    const returnedOrgs = yield orgObj.findAll({
        where: { [`tags_${language}`]: { [sequelize_1.Op.like]: `%${query}%` } },
        attributes: [
            "id",
            `categories_${language}`,
            `name_${language}`,
            `tags_${language}`,
        ],
        include: [
            {
                model: locObj,
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
    models = dbSetup_1.default();
});
//# sourceMappingURL=index.js.map