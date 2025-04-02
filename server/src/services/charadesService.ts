import dotenv from "dotenv";

dotenv.config();

const API_URL = "https://www.api-ninjas.com/api/riddles";
const API_KEY = process.env.API_KEY;

export async function getKeyword(): Promise<string> {
    try{
        const response =await fetch (API_URL, {
            method: "GET",
            Headers: {"X-Api-Key": API_KEY | null},
        });
        if (!response.ok){
            throw new Error (`API request failed with status ${response.status} `);
        }
        const data = await response.json();

        if (!data || data.length ===0) {
            throw new Error("No riddles found");
        }
        const riddle = data [0];
        return riddle.answer.toLowerCase();
    } catch (error) {
        console.error("Error fetching riddle:", error);
        throw new Error("Failed to retrieve a keyword");
    }
}