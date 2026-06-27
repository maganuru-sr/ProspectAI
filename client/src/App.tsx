import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './views/Login';
import Signup from './views/Signup';
import DashboardHome from './views/DashboardHome';
import Prospects from './views/Prospects';
import Leads from './views/Leads';
import Deals from "./views/Deals";
import Tasks from "./views/Tasks";
import Analytics from "./views/Analytics";
import Campaigns from './views/Campaigns';
import CoPilot from './views/CoPilot';
import Integrations from './views/Integrations';
import Settings from './views/Settings';
import { motion, AnimatePresence } from 'framer-motion';

// Main Application View Selector Gated by Authentication
const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Navigation states
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Gating mode state when unauthenticated
  const [isSignupMode, setIsSignupMode] = useState(false);

  // loading view indicator
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#090d16]">
        <div className="relative flex items-center justify-center">
          <div className="h-12 w-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        </div>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-4 tracking-wider uppercase">Loading session...</span>
      </div>
    );
  }

  // Gated Auth checks
  if (!isAuthenticated) {
    return isSignupMode ? (
      <Signup onToggleAuthMode={() => setIsSignupMode(false)} />
    ) : (
      <Login onToggleAuthMode={() => setIsSignupMode(true)} />
    );
  }

  // Render view templates based on active menu item
  const renderViewContent = () => {
  switch (currentView) {
    case 'dashboard':
      return <DashboardHome setCurrentView={setCurrentView} />;

    case 'prospects':
      return <Prospects />;

    case 'leads':
      return <Leads />;
    
    case "deals":
      return <Deals />;

    case "tasks":
     return <Tasks />;

    case "analytics":
      return <Analytics />;

    case 'campaigns':
      return <Campaigns />;

    case 'copilot':
      return <CoPilot />;

    case 'integrations':
      return <Integrations />;

    case 'settings':
      return <Settings />;

    default:
      return <DashboardHome setCurrentView={setCurrentView} />;
  }
};

  return (
    <div className="min-h-screen flex bg-slate-50/50 dark:bg-[#090d16]">
      {/* Collapsible/Drawer Sidebar */}
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        mobileOpen={isMobileSidebarOpen}
        setMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Right panel containing Header navbar and responsive Scroll Content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Sticky top navbar */}
        <Navbar 
          currentView={currentView} 
          setMobileOpen={setIsMobileSidebarOpen} 
        />

        {/* Scrollable View Area with smooth page swaps */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/30 dark:bg-slate-950/20">
          <div className="max-w-[1400px] mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                {renderViewContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
