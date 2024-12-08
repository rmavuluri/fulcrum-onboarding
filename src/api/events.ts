import { apiRequest } from './client';
import { ENDPOINTS } from './config';
import type { EventStatistics } from './types';

export async function getEventStatistics(params?: {
  domain?: string;
  subDomain?: string;
  startDate?: string;
  endDate?: string;
}): Promise<EventStatistics> {
  return apiRequest(`${ENDPOINTS.EVENTS}/statistics`, { params });
}

export async function getEventsByProducer(
  producerId: string,
  params?: {
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  }
): Promise<{
  events: Array<{
    id: string;
    timestamp: string;
    size: number;
    status: 'success' | 'failure';
  }>;
  total: number;
}> {
  return apiRequest(`${ENDPOINTS.EVENTS}/producer/${producerId}`, { params });
}

export async function getEventsByConsumer(
  consumerId: string,
  params?: {
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  }
): Promise<{
  events: Array<{
    id: string;
    timestamp: string;
    processedAt: string;
    status: 'success' | 'failure';
    latency: number;
  }>;
  total: number;
}> {
  return apiRequest(`${ENDPOINTS.EVENTS}/consumer/${consumerId}`, { params });
}