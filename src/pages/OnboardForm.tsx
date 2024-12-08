import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import { Database, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

interface FormData {
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

export default function OnboardForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    lobName: '',
    onboardType: '',
    domain: '',
    subDomain: '',
    volumeOfEvents: '',
    schemaName: '',
    topicName: '',
    tentativeProdDate: '',
    performPT: false,
    envARNs: '',
    notificationEmail: '',
    contactEmails: ''
  });

  useEffect(() => {
    if (formData.domain && formData.subDomain) {
      setFormData(prev => ({
        ...prev,
        topicName: `${prev.domain}-${prev.subDomain}`
      }));
    }
  }, [formData.domain, formData.subDomain]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newEntry = {
        ...formData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      };

      // Store in appropriate list based on type
      if (formData.onboardType === 'Direct Producer') {
        const producers = JSON.parse(localStorage.getItem('producers') || '[]');
        producers.push(newEntry);
        localStorage.setItem('producers', JSON.stringify(producers));
        toast.success('Producer added successfully');
        navigate('/producers');
      } else {
        const consumers = JSON.parse(localStorage.getItem('consumers') || '[]');
        consumers.push(newEntry);
        localStorage.setItem('consumers', JSON.stringify(consumers));
        toast.success('Consumer added successfully');
        navigate('/consumers');
      }
    } catch (error) {
      console.error('Error saving form data:', error);
      toast.error('Failed to save data');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1">
        <nav className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Database className="h-8 w-8 text-pink-500" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Fulcrum</span>
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Onboarding Form</h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">LOB Name</label>
                <input
                  type="text"
                  name="lobName"
                  value={formData.lobName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Onboard Type</label>
                <select
                  name="onboardType"
                  value={formData.onboardType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Direct Producer">Direct Producer</option>
                  <option value="Direct Consumer">Direct Consumer</option>
                  <option value="S3">S3</option>
                  <option value="SF">SF</option>
                  <option value="EB with Lambda">EB with Lambda</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Domain</label>
                <input
                  type="text"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sub-Domain</label>
                <input
                  type="text"
                  name="subDomain"
                  value={formData.subDomain}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Volume of Events</label>
                <input
                  type="text"
                  name="volumeOfEvents"
                  value={formData.volumeOfEvents}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Schema Name</label>
                <input
                  type="text"
                  name="schemaName"
                  value={formData.schemaName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Topic Name</label>
                <input
                  type="text"
                  name="topicName"
                  value={formData.topicName}
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tentative PROD Date</label>
                <input
                  type="date"
                  name="tentativeProdDate"
                  value={formData.tentativeProdDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="performPT"
                    checked={formData.performPT}
                    onChange={handleCheckboxChange}
                    className="rounded border-gray-300 text-pink-600 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Able to perform PT?</span>
                </label>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">All Env ARNs</label>
                <textarea
                  name="envARNs"
                  value={formData.envARNs}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notification Email</label>
                <input
                  type="email"
                  name="notificationEmail"
                  value={formData.notificationEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Emails</label>
                <textarea
                  name="contactEmails"
                  value={formData.contactEmails}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}