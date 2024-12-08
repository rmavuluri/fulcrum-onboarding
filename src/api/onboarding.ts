import { apiRequest } from './client';
import { ENDPOINTS } from './config';
import type { OnboardingData, Producer, Consumer } from './types';

export async function submitOnboarding(data: Omit<OnboardingData, 'id' | 'createdAt' | 'updatedAt'>): Promise<Producer | Consumer> {
  return apiRequest<Producer | Consumer>(ENDPOINTS.ONBOARDING, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function updateOnboarding(id: string, data: Partial<OnboardingData>): Promise<Producer | Consumer> {
  return apiRequest<Producer | Consumer>(`${ENDPOINTS.ONBOARDING}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function deleteOnboarding(id: string): Promise<void> {
  return apiRequest(`${ENDPOINTS.ONBOARDING}/${id}`, {
    method: 'DELETE'
  });
}