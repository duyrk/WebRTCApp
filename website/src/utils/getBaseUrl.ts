'use client';

export function getBaseUrl() {
  // Deployment URL when deployed on Vercel
  if (process.env.NEXT_PUBLIC_VERCEL_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  // Assume localhost
  return 'http://localhost:3000';
}

export function getBaseUrlApi() {
  // Deployment URL when deployed on Vercel
  if (process.env.NEXT_PUBLIC_BASE_API_URL) return process.env.NEXT_PUBLIC_BASE_API_URL;
  // Assume localhost
  return 'http://localhost:3000/api/';
}
