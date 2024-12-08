import React from 'react';
import { Database, Users, BarChart2, Link } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-1/2 bg-gradient-to-br from-primary-50 via-primary-100/50 to-primary-200/30 p-12 flex flex-col">
        <div className="flex items-center gap-2 mb-12">
          <Database className="w-10 h-10 text-gradient-start" />
          <span className="text-2xl font-bold text-gradient-start">Fulcrum</span>
        </div>

        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Unlock Full Platform Potential
          </h2>

          <div className="space-y-6">
            <Feature
              icon={<Users className="w-6 h-6 text-gradient-start" />}
              text="Manage producers and consumer groups"
            />
            <Feature
              icon={<BarChart2 className="w-6 h-6 text-gradient-start" />}
              text="Monitor resource consumption"
            />
            <Feature
              icon={<Database className="w-6 h-6 text-gradient-start" />}
              text="Streamline data flow management"
            />
            <Feature
              icon={<Link className="w-6 h-6 text-gradient-start" />}
              text="Create seamless integrations"
            />
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-gray-600">
            Join a community of over <span className="font-bold">10,000</span> platform administrators
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-white p-12 flex items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
      <span className="text-gray-700">{text}</span>
    </div>
  );
}