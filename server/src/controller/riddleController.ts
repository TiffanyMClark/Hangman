import fetch from 'node-fetch';

export const getFilteredRiddle = async () => {
  try {
    
// Fetch one riddle from the API
    const response = await fetch('https://api.api-ninjas.com/v1/riddles', {
      headers: {
        'X-Api-Key': process.env.API_NINJAS_KEY || '',
      },
    });

    const data = await response.json() as any[];

// Get the first riddle from the response
    const riddle = data[0];

// Filter for 1 word answers

    const answerWords = riddle.answer.trim().split(' ');
    if (answerWords.length === 1 && riddle.answer.length >= 5 && riddle.answer.length <= 12) {
      return {
        question: riddle.question,
        answer: riddle.answer,
      };
    }

   
    return null;

  } catch (error) {
    console.error('Error fetching riddle:', error);
    throw new Error('Unable to fetch riddle');
  }
};
