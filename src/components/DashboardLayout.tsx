import React from 'react';
import Sidebar from '../components/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activePage: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activePage }) => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar activePage={activePage} />
      
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
