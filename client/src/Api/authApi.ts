// client/src/api/authApi.ts

const API_URL = 'http://localhost:3000/api/auth';

export const registerUser = async (username: string, pin: string) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, pin }),
  });

  const data = await res.json();
  return data;
};
