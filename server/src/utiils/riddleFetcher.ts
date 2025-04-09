import fetch from "node-fetch";

export interface RiddleData {
  question: string;
  answer: string;
}

interface RiddleApiResponse {
  question: string;
  answer: string;
}

export const getFilteredRiddle = async (): Promise<RiddleData> => {
  let validRiddleFound = false;
  let riddleData: RiddleData = { question: "", answer: "" };
  let attempts = 0;
  const maxAttempts = 5;

  while (!validRiddleFound && attempts < maxAttempts) {
    attempts++;

    // Fetch a new riddle from the API
    const response = await fetch("https://api.api-ninjas.com/v1/riddles", {
      headers: {
        "X-Api-Key": process.env.API_NINJAS_KEY || "",
      },
    });

    const data = (await response.json()) as RiddleApiResponse[];

    console.log(`API Response: ${JSON.stringify(data)}`);

    if (data && data.length > 0) {
      const { question, answer } = data[0];
      console.log("API Response:", JSON.stringify(data, null, 2)); // More readable output

      validRiddleFound = true;
      riddleData = { question, answer };
    }
  }

  if (!validRiddleFound) {
    console.error("Failed to find a valid riddle after multiple attempts");
    throw new Error("Could not find a valid riddle after multiple attempts");
  }

  const myTestRiddle = await getFilteredRiddle();
  console.log("My Test Riddle:", myTestRiddle);

  return riddleData;
};
