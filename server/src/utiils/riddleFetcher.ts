import fetch from 'node-fetch';

export interface RiddleData {
  question: string;
  answer: string;
}

interface RiddleApiResponse {
  question: string;
  answer: string;
}

export const getFilteredRiddle = async (): Promise<RiddleData> => {
  const response = await fetch('https://api.api-ninjas.com/v1/riddles', {
    headers: {
      'X-Api-Key': process.env.API_NINJAS_KEY || '',
    },
  });

  // Type assertion: Tell TypeScript that data will be of type RiddleApiResponse[]
  
  const data = (await response.json()) as RiddleApiResponse[];



  const { question, answer } = data[0];

  if (answer.split(' ').length > 1 || answer.length < 5 || answer.length > 12) {
    throw new Error('Invalid riddle answer length');
  }

  return { question, answer };
};
