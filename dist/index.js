"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server = express_1.default();
const port = 8000;
server.get("/", (req, res) => {
    res.status(200).send();
});
server.listen(port, () => console.log(`Server running on port ${port}`));
//# sourceMappingURL=index.js.map