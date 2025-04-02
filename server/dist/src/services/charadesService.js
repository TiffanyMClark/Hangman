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
exports.getKeyword = getKeyword;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_URL = "https://www.api-ninjas.com/api/riddles";
const API_KEY = process.env.API_KEY;
function getKeyword() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(API_URL, {
                method: "GET",
                headers: { "X-Api-Key": API_KEY },
            });
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status} `);
            }
            const data = yield response.json();
            if (!data || data.length === 0) {
                throw new Error("No riddles found");
            }
            const riddle = data[0];
            return riddle.answer.toLowerCase();
        }
        catch (error) {
            console.error("Error fetching riddle:", error);
            throw new error("Failed to retrieve a keyword");
        }
    });
}
