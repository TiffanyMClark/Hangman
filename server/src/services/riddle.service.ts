import { API_KEY } from '../config/env';

export async function fetchRiddle() {
  const response = await fetch('https://api.api-ninjas.com/v1/riddles', {
    headers: { 'X-Api-Key': API_KEY },
  });

  const data = await response.json();
  return data[0]; // API returns array
}
