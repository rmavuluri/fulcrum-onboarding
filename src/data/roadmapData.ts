interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'not-started' | 'pending' | 'in-progress' | 'completed';
}

interface QuarterData {
  id: string;
  quarter: string;
  months: string[];
  items: RoadmapItem[];
}

interface YearData {
  year: number;
  quarters: QuarterData[];
}

export const roadmapData: YearData[] = [
  {
    year: 2024,
    quarters: [
      {
        id: '2024-Q1',
        quarter: 'Q1',
        months: ['January', 'February', 'March'],
        items: [
          {
            id: '1',
            title: 'Kafka Streams Integration',
            description: 'Implement Kafka Streams for real-time data processing',
            status: 'completed'
          },
          {
            id: '2',
            title: 'Schema Registry Enhancement',
            description: 'Add support for AVRO schema versioning',
            status: 'in-progress'
          },
          {
            id: '3',
            title: 'Multi-cluster Support',
            description: 'Enable management of multiple Kafka clusters',
            status: 'pending'
          }
        ]
      },
      {
        id: '2024-Q2',
        quarter: 'Q2',
        months: ['April', 'May', 'June'],
        items: [
          {
            id: '4',
            title: 'Advanced Monitoring',
            description: 'Implement advanced metrics and monitoring',
            status: 'not-started'
          },
          {
            id: '5',
            title: 'Security Enhancements',
            description: 'Add SASL/SCRAM authentication support',
            status: 'pending'
          }
        ]
      },
      {
        id: '2024-Q3',
        quarter: 'Q3',
        months: ['July', 'August', 'September'],
        items: [
          {
            id: '6',
            title: 'Kafka Connect UI',
            description: 'Build intuitive UI for Kafka Connect management',
            status: 'not-started'
          },
          {
            id: '7',
            title: 'Topic Management',
            description: 'Enhanced topic configuration and management',
            status: 'not-started'
          }
        ]
      },
      {
        id: '2024-Q4',
        quarter: 'Q4',
        months: ['October', 'November', 'December'],
        items: [
          {
            id: '8',
            title: 'Performance Optimization',
            description: 'Optimize producer/consumer performance',
            status: 'not-started'
          },
          {
            id: '9',
            title: 'Disaster Recovery',
            description: 'Implement disaster recovery features',
            status: 'not-started'
          }
        ]
      }
    ]
  },
  {
    year: 2025,
    quarters: [
      {
        id: '2025-Q1',
        quarter: 'Q1',
        months: ['January', 'February', 'March'],
        items: [
          {
            id: '10',
            title: 'Event Streaming Analytics',
            description: 'Real-time analytics and visualization',
            status: 'not-started'
          }
        ]
      },
      {
        id: '2025-Q2',
        quarter: 'Q2',
        months: ['April', 'May', 'June'],
        items: [
          {
            id: '11',
            title: 'Machine Learning Pipeline',
            description: 'ML model integration with Kafka streams',
            status: 'not-started'
          }
        ]
      },
      {
        id: '2025-Q3',
        quarter: 'Q3',
        months: ['July', 'August', 'September'],
        items: [
          {
            id: '12',
            title: 'Cloud Native Features',
            description: 'Enhanced cloud deployment options',
            status: 'not-started'
          }
        ]
      },
      {
        id: '2025-Q4',
        quarter: 'Q4',
        months: ['October', 'November', 'December'],
        items: [
          {
            id: '13',
            title: 'Global Distribution',
            description: 'Multi-region kafka cluster management',
            status: 'not-started'
          }
        ]
      }
    ]
  }
];

export type { RoadmapItem, QuarterData, YearData };