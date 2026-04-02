import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.simvex.store',
  headers: {
    'Content-Type': 'application/json',
  },
});
