import fetch from 'node-fetch';

export const getFilteredRiddle = async () => {
  const response = await fetch('https://api.api-ninjas.com/v1/riddles', {
    headers: {
      'X-Api-Key': process.env.API_NINJAS_KEY || '',
    },
  });

  const data = await response.json();
  const { question, answer } = data[0];

  if (answer.split(' ').length > 1 || answer.length < 5 || answer.length > 12) {
    throw new Error('Invalid riddle answer length');
  }

  return { question, answer };
};
