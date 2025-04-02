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
const dotenv_1 = __importDefault(require("dotenv"));
const charadesService_1 = require("./services/charadesService");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
app.get("/hangman", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const word = yield (0, charadesService_1.getKeyword)();
        res.json({ keyword: word });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch keyword" });
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
