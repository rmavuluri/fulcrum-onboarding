import React from 'react';
import { X, ExternalLink, BookOpen, Youtube, FileText, Users, MessageSquare } from 'lucide-react';

interface ResourcesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const resources = [
  {
    title: 'Documentation',
    description: 'Comprehensive guides and API references',
    icon: BookOpen,
    link: '#',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video guides and walkthroughs',
    icon: Youtube,
    link: '#',
    color: 'from-red-500 to-red-600'
  },
  {
    title: 'Best Practices',
    description: 'Learn Kafka implementation patterns',
    icon: FileText,
    link: '#',
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Community Forum',
    description: 'Connect with other Fulcrum users',
    icon: Users,
    link: '#',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Support Portal',
    description: '24/7 technical support and assistance',
    icon: MessageSquare,
    link: '#',
    color: 'from-orange-500 to-orange-600'
  }
];

export default function ResourcesPanel({ isOpen, onClose }: ResourcesPanelProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Fulcrum Resources</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-6">
              {resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <a
                    key={resource.title}
                    href={resource.link}
                    className="block p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-600"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${resource.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {resource.title}
                          </h3>
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}