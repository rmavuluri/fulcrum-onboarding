export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export const API_VERSION = 'v1';

export const ENDPOINTS = {
  ONBOARDING: '/onboarding',
  PRODUCERS: '/producers',
  CONSUMERS: '/consumers',
  DOMAINS: '/domains',
  METRICS: '/metrics',
  EVENTS: '/events'
} as const;