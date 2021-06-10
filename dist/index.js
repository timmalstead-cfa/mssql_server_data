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
const dbSetup_1 = __importDefault(require("./dbSetup"));
let org, loc, serv, sch, locOrg, schLoc, schOrg, servLoc, servOrg;
const server = express_1.default();
server.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allResults = yield servOrg.findAll();
    res.json(allResults);
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