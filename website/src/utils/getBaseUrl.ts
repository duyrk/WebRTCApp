/* eslint-disable no-process-env */

export function getBaseUrl() {
  // Deployment URL when deployed on Vercel
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // Assume localhost
  return 'http://localhost:3000';
}
export function getBaseUrlApi() {
  // Deployment URL when deployed on Vercel
  if (process.env.HOST_URL) return `https://${process.env.HOST_URL}/api`;

  // Assume localhost
  // return 'https://pokeapi.co/api/v2/';
  return 'http://localhost:3000/api';
}
