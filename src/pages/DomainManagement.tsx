import React, { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import { Database, Sun, Moon, LogOut, ChevronRight, ChevronDown, FolderTree } from 'lucide-react';

interface DomainNode {
  domain: string;
  subDomains: string[];
}

export default function DomainManagement() {
  const { signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [domains, setDomains] = useState<DomainNode[]>([]);
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Fetch and organize domains from producers and consumers
    const producers = JSON.parse(localStorage.getItem('producers') || '[]');
    const consumers = JSON.parse(localStorage.getItem('consumers') || '[]');

    const domainMap = new Map<string, Set<string>>();

    // Process producers and consumers to build domain hierarchy
    [...producers, ...consumers].forEach(item => {
      if (!domainMap.has(item.domain)) {
        domainMap.set(item.domain, new Set());
      }
      if (item.subDomain) {
        domainMap.get(item.domain)?.add(item.subDomain);
      }
    });

    // Convert map to array of domain nodes
    const domainNodes: DomainNode[] = Array.from(domainMap).map(([domain, subDomains]) => ({
      domain,
      subDomains: Array.from(subDomains).sort()
    }));

    setDomains(domainNodes.sort((a, b) => a.domain.localeCompare(b.domain)));
  }, []);

  const toggleDomain = (domain: string) => {
    setExpandedDomains(prev => {
      const next = new Set(prev);
      if (next.has(domain)) {
        next.delete(domain);
      } else {
        next.add(domain);
      }
      return next;
    });
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

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FolderTree className="h-6 w-6" />
              Domain Management
            </h1>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            {domains.length > 0 ? (
              <div className="space-y-2">
                {domains.map(({ domain, subDomains }) => (
                  <div key={domain} className="text-gray-800 dark:text-gray-200">
                    <button
                      onClick={() => toggleDomain(domain)}
                      className="flex items-center gap-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                    >
                      {subDomains.length > 0 ? (
                        expandedDomains.has(domain) ? (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-500" />
                        )
                      ) : (
                        <span className="w-4" />
                      )}
                      <span className="font-medium">{domain}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({subDomains.length} subdomains)
                      </span>
                    </button>
                    
                    {expandedDomains.has(domain) && subDomains.length > 0 && (
                      <div className="ml-6 pl-4 border-l border-gray-200 dark:border-gray-700 mt-1 space-y-1">
                        {subDomains.map(subDomain => (
                          <div
                            key={`${domain}-${subDomain}`}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                          >
                            <span className="w-4" />
                            <span>{subDomain}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No domains found. Add producers or consumers to see the domain hierarchy.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}