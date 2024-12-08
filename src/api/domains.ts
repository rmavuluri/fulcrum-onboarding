import { apiRequest } from './client';
import { ENDPOINTS } from './config';

export interface DomainData {
  name: string;
  description?: string;
  subDomains: Array<{
    name: string;
    description?: string;
  }>;
}

export async function getDomains(): Promise<DomainData[]> {
  return apiRequest(ENDPOINTS.DOMAINS);
}

export async function createDomain(data: {
  name: string;
  description?: string;
}): Promise<DomainData> {
  return apiRequest(ENDPOINTS.DOMAINS, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function createSubDomain(
  domainName: string,
  data: {
    name: string;
    description?: string;
  }
): Promise<DomainData> {
  return apiRequest(`${ENDPOINTS.DOMAINS}/${domainName}/subdomains`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function updateDomain(
  domainName: string,
  data: {
    name?: string;
    description?: string;
  }
): Promise<DomainData> {
  return apiRequest(`${ENDPOINTS.DOMAINS}/${domainName}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function deleteDomain(domainName: string): Promise<void> {
  return apiRequest(`${ENDPOINTS.DOMAINS}/${domainName}`, {
    method: 'DELETE'
  });
}

export async function deleteSubDomain(
  domainName: string,
  subDomainName: string
): Promise<void> {
  return apiRequest(
    `${ENDPOINTS.DOMAINS}/${domainName}/subdomains/${subDomainName}`,
    {
      method: 'DELETE'
    }
  );
}