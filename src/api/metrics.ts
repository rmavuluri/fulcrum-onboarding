import { apiRequest } from './client';
import { ENDPOINTS } from './config';
import type { Producer, Consumer, DomainMetrics } from './types';

export async function getProducerMetrics(params?: {
  domain?: string;
  subDomain?: string;
  startDate?: string;
  endDate?: string;
}): Promise<{
  total: number;
  active: number;
  producers: Producer[];
}> {
  return apiRequest(`${ENDPOINTS.METRICS}/producers`, { params });
}

export async function getConsumerMetrics(params?: {
  domain?: string;
  subDomain?: string;
  startDate?: string;
  endDate?: string;
}): Promise<{
  total: number;
  active: number;
  consumers: Consumer[];
}> {
  return apiRequest(`${ENDPOINTS.METRICS}/consumers`, { params });
}

export async function getDomainMetrics(): Promise<DomainMetrics> {
  return apiRequest(ENDPOINTS.METRICS + '/domains');
}