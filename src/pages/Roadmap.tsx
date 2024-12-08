import React, { useState } from 'react';
import { Database, Sun, Moon, LogOut } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { roadmapData, type RoadmapItem } from '../data/roadmapData';

export default function Roadmap() {
  const { isDark, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const [selectedYear, setSelectedYear] = useState(2024);

  const getStatusColor = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-primary-900/10">
      <Sidebar />
      
      <div className="flex-1">
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Database className="h-8 w-8 text-gradient-start" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
                  Fulcrum
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <button
                  onClick={signOut}
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Fulcrum Platform Roadmap
          </h1>

          {/* Year Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8">
                {roadmapData.map((yearData) => (
                  <button
                    key={yearData.year}
                    onClick={() => setSelectedYear(yearData.year)}
                    className={`
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                      ${yearData.year === selectedYear
                        ? 'border-gradient-end text-gradient-end'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {yearData.year}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Quarters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapData
              .find(data => data.year === selectedYear)
              ?.quarters.map((quarter) => (
                <div
                  key={quarter.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {quarter.quarter} ({quarter.months.join(', ')})
                  </h3>
                  
                  <div className="space-y-4">
                    {quarter.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {item.description}
                            </p>
                          </div>
                          <span
                            className={`
                              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${getStatusColor(item.status)}
                            `}
                          >
                            {item.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}