// Common Types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingData extends BaseEntity {
  lobName: string;
  onboardType: string;
  domain: string;
  subDomain: string;
  volumeOfEvents: string;
  schemaName: string;
  topicName: string;
  tentativeProdDate: string;
  performPT: boolean;
  envARNs: string;
  notificationEmail: string;
  contactEmails: string;
}

export interface Producer extends OnboardingData {}
export interface Consumer extends OnboardingData {}

export interface DomainMetrics {
  totalProducers: number;
  totalConsumers: number;
  subDomains: {
    [key: string]: {
      producers: number;
      consumers: number;
    };
  };
}

export interface EventStatistics {
  totalEvents: number;
  eventsPerSecond: number;
  failureRate: number;
  avgLatency: number;
  topProducers: Array<{
    id: string;
    lobName: string;
    eventCount: number;
  }>;
  topConsumers: Array<{
    id: string;
    lobName: string;
    eventCount: number;
  }>;
}