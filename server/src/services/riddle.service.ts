import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'https://api.api-ninjas.com/v1/riddles';

export async function fetchRiddle() {
  const res = await fetch(API_URL, {
    headers: {
      'X-Api-Key': process.env.API_NINJAS_API_KEY || '',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch riddle');
  }

  return res.json();
}
