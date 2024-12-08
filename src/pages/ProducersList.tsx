import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Database, Sun, Moon, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import TablePagination from '../components/TablePagination';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

interface Producer {
  id: string;
  lobName: string;
  domain: string;
  subDomain: string;
  topicName: string;
  notificationEmail: string;
  createdAt: string;
}

export default function ProducersList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { isDark, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [producers, setProducers] = useState<Producer[]>(() => {
    const savedProducers = JSON.parse(localStorage.getItem('producers') || '[]');
    return savedProducers.map((p: Producer) => ({
      ...p,
      id: p.id || crypto.randomUUID(),
    }));
  });

  const handleEdit = (producer: Producer) => {
    navigate('/onboard', { state: { producer } });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this producer?')) {
      const updatedProducers = producers.filter(p => p.id !== id);
      localStorage.setItem('producers', JSON.stringify(updatedProducers));
      setProducers(updatedProducers);
      toast.success('Producer deleted successfully');
    }
  };

  const filteredProducers = producers.filter((producer: Producer) =>
    Object.values(producer).some(
      value => 
        value && 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedProducers = filteredProducers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          <div className="px-4 sm:px-0 mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Producers</h1>
            <button
              onClick={() => navigate('/onboard')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-start/90 hover:to-gradient-end/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gradient-start"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Producer
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search producers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gradient-start focus:border-gradient-start sm:text-sm"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      LOB Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Domain
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Sub-Domain
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Topic Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedProducers.map((producer: Producer) => (
                    <tr key={producer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {producer.lobName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {producer.domain}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {producer.subDomain}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {producer.topicName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {producer.notificationEmail}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {new Date(producer.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(producer)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(producer.id)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedProducers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No producers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <TablePagination
                currentPage={currentPage}
                totalItems={filteredProducers.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}