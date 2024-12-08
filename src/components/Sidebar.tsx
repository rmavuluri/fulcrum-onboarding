import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  UserCircle,
  ChevronDown,
  FolderTree,
  Database,
  Map,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import ResourcesPanel from './ResourcesPanel';

export default function Sidebar() {
  const location = useLocation();
  const [producersOpen, setProducersOpen] = useState(false);
  const [consumersOpen, setConsumersOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isResourcesPanelOpen, setIsResourcesPanelOpen] = useState(false);

  const NavItem = ({ href, icon: Icon, text }: { href: string; icon: any; text: string }) => (
    <Link
      to={href}
      className={`nav-item ${
        location.pathname === href ? 'nav-item-active' : 'nav-item-inactive'
      }`}
    >
      <Icon className="w-5 h-5" />
      {!isCollapsed && <span className="font-medium">{text}</span>}
    </Link>
  );

  const DropdownItem = ({ href, text }: { href: string; text: string }) => (
    <Link
      to={href}
      className={`block w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
        location.pathname === href
          ? 'bg-gradient-to-r from-gradient-start to-gradient-end text-white'
          : 'text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/20'
      }`}
    >
      {text}
    </Link>
  );

  return (
    <>
      <aside className={`${isCollapsed ? 'w-20' : 'w-64'} h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col relative transition-all duration-300`}>
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1.5 shadow-sm"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          )}
        </button>

        <div className="flex-1 py-6 space-y-1 px-3 overflow-y-auto">
          <NavItem href="/dashboard" icon={LayoutDashboard} text="Dashboard" />
          <NavItem href="/onboard" icon={ClipboardList} text="Onboard Form" />
          <NavItem href="/domain-management" icon={FolderTree} text="Domain Management" />
          <NavItem href="/roadmap" icon={Map} text="Roadmap" />

          {/* Producers Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProducersOpen(!producersOpen)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors ${
                location.pathname.includes('/producer')
                  ? 'bg-gradient-to-r from-gradient-start to-gradient-end text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/20'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                {!isCollapsed && <span className="font-medium">Producers</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown className={`w-4 h-4 transition-transform ${producersOpen ? 'rotate-180' : ''}`} />
              )}
            </button>
            {producersOpen && !isCollapsed && (
              <div className="pl-11 py-1 space-y-1">
                <DropdownItem href="/producers" text="View All Producers" />
              </div>
            )}
          </div>

          {/* Consumers Dropdown */}
          <div className="relative">
            <button
              onClick={() => setConsumersOpen(!consumersOpen)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors ${
                location.pathname.includes('/consumer')
                  ? 'bg-gradient-to-r from-gradient-start to-gradient-end text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/20'
              }`}
            >
              <div className="flex items-center space-x-2">
                <UserCircle className="w-5 h-5" />
                {!isCollapsed && <span className="font-medium">Consumers</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown className={`w-4 h-4 transition-transform ${consumersOpen ? 'rotate-180' : ''}`} />
              )}
            </button>
            {consumersOpen && !isCollapsed && (
              <div className="pl-11 py-1 space-y-1">
                <DropdownItem href="/consumers" text="View All Consumers" />
                <DropdownItem href="/consumer-groups" text="Consumer Groups" />
              </div>
            )}
          </div>

          {/* Resources Button */}
          <button
            onClick={() => setIsResourcesPanelOpen(true)}
            className="w-full flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-colors text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/20"
          >
            <BookOpen className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">Fulcrum Resources</span>}
          </button>
        </div>
      </aside>

      <ResourcesPanel
        isOpen={isResourcesPanelOpen}
        onClose={() => setIsResourcesPanelOpen(false)}
      />
    </>
  );
}