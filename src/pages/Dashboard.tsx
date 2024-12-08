import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import Sidebar from '../components/Sidebar';
import { Users, Database, BarChart2, Sun, Moon, LogOut } from 'lucide-react';

interface Activity {
  id: string;
  message: string;
  timestamp: string;
}

export default function Dashboard() {
  const { signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [producerCount, setProducerCount] = useState(0);
  const [consumerCount, setConsumerCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Get counts from localStorage
    const producers = JSON.parse(localStorage.getItem('producers') || '[]');
    const consumers = JSON.parse(localStorage.getItem('consumers') || '[]');
    setProducerCount(producers.length);
    setConsumerCount(consumers.length);

    // Combine and sort recent activities
    const activities: Activity[] = [
      ...producers.map((p: any) => ({
        id: `producer-${p.id}`,
        message: `New producer "${p.lobName}" added`,
        timestamp: p.createdAt || new Date().toISOString()
      })),
      ...consumers.map((c: any) => ({
        id: `consumer-${c.id}`,
        message: `New consumer "${c.lobName}" added`,
        timestamp: c.createdAt || new Date().toISOString()
      }))
    ];

    // Sort by timestamp descending and take latest 5
    const sortedActivities = activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 5);

    setRecentActivities(sortedActivities);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-primary-900/10">
      <Sidebar />
      
      <div className="flex-1">
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Database className="h-8 w-8 text-gradient-start" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">Fulcrum</span>
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

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              icon={<Users className="h-6 w-6 text-gradient-start" />}
              title="Producers"
              value={producerCount.toString()}
              description="Active producers"
            />
            <DashboardCard
              icon={<Database className="h-6 w-6 text-gradient-middle" />}
              title="Consumers"
              value={consumerCount.toString()}
              description="Active consumers"
            />
            <DashboardCard
              icon={<BarChart2 className="h-6 w-6 text-gradient-end" />}
              title="Performance"
              value="98.5%"
              description="System uptime"
            />
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h2>
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity) => (
                    <li key={activity.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{activity.message}</p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li key="no-activity">
                    <div className="px-4 py-4 sm:px-6">
                      <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, value, description }: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {description}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}