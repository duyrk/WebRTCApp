'use client';

export function getBaseUrl() {
  // Deployment URL when deployed on Vercel
  if (process.env.NEXT_PUBLIC_VERCEL) return `https://${process.env.NEXT_PUBLIC_VERCEL}`;
  // Assume localhost
  return 'http://localhost:3000';
}

export function getBaseUrlApi() {
  // Deployment URL when deployed on Vercel
  if (process.env.NEXT_PUBLIC_BASE_API_URL) return process.env.NEXT_PUBLIC_BASE_API_URL;
  // Assume localhost
  return 'http://localhost:8080/api/v1';
}
