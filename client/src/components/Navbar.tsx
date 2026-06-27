import React, { useState } from 'react';
import { 
  Menu, 
  Sun, 
  Moon, 
  Bell, 
  Search, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Input } from './ui/Input';
import { Badge } from './ui/Badge';

interface NavbarProps {
  currentView: string;
  setMobileOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setMobileOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  // View headings mapping
  const viewHeadings: Record<string, { title: string; description: string }> = {
    dashboard: { title: 'Sales Dashboard', description: 'Overview of your AI outbound agent operations and metrics.' },
    campaigns: { title: 'Campaign Sequences', description: 'Manage and orchestrate AI email sequences and LinkedIn targets.' },
    copilot: { title: 'AI Co-Pilot Inbox', description: 'Approve, edit, or customize draft replies suggested by the AI agent.' },
    integrations: { title: 'Enterprise Sync', description: 'Connect your outbound loops directly to HubSpot, Salesforce, and Apollo.' },
    settings: { title: 'Workspace Settings', description: 'Configure AI agent personalities, templates, and integration API keys.' },
  };

  const { title, description } = viewHeadings[currentView] || { title: 'ProspectAI', description: 'AI Sales Outreach Platform' };

  // Simulated notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Meeting Booked! 📅',
      message: 'Lead Sarah Jenkins (VP Sales at TechScale) accepted the invitation for Monday at 10 AM.',
      time: '5m ago',
      unread: true,
      category: 'success',
    },
    {
      id: 2,
      title: 'Reply Classified: Interested 🚀',
      message: 'AI agent Max identified positive sentiment in reply from John Doe (Director IT, CloudInc). Draft response ready.',
      time: '24m ago',
      unread: true,
      category: 'info',
    },
    {
      id: 3,
      title: 'Outbound Queue Synced 🔄',
      message: '142 new target profiles synchronized from HubSpot database targeting EMEA region.',
      time: '2h ago',
      unread: false,
      category: 'sync',
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border/60 bg-background/80 backdrop-blur-md px-4 sm:px-6 py-4 flex items-center justify-between">
      {/* Mobile Toggle & View Description */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 -ml-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:block">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 flex items-center gap-2">
            {title}
            {currentView === 'copilot' && (
              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-indigo-500 text-white px-1.5 py-0.5 rounded-full animate-pulse-glow shadow-sm shadow-indigo-500/20">
                <Sparkles className="h-2.5 w-2.5" /> AI Powered
              </span>
            )}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5 max-w-md truncate">
            {description}
          </p>
        </div>
      </div>

      {/* Utilities: Search, Theme Toggle, Notification Bell, Profile Info */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Lead Search Input */}
        <div className="hidden md:block w-64 lg:w-80">
          <Input 
            placeholder="Search leads, campaigns..." 
            icon={<Search className="h-4 w-4" />}
            className="h-9.5 text-xs bg-slate-100/50 dark:bg-slate-900/50 border-border/80 focus:bg-background"
          />
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-150 active:scale-95"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5 text-indigo-400" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground relative transition-all duration-150 active:scale-95"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-card border border-border rounded-xl shadow-2xl z-40 p-4 animate-fade-in">
                <div className="flex items-center justify-between border-b border-border/50 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    {unreadCount > 0 && (
                      <Badge variant="default" className="text-[10px] px-1.5 h-4 bg-indigo-500">
                        {unreadCount} new
                      </Badge>
                    )}
                  </div>
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs text-indigo-500 hover:text-indigo-600 font-medium"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4">No notifications yet.</p>
                  ) : (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`flex gap-3 p-2 rounded-lg transition-colors ${
                          notif.unread ? 'bg-slate-500/5 dark:bg-white/5 border-l-2 border-indigo-500' : ''
                        }`}
                      >
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">{notif.title}</span>
                            <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">{notif.message}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t border-border/50 pt-3 mt-3 flex justify-center">
                  <button className="text-xs font-semibold text-indigo-500 hover:text-indigo-600 flex items-center gap-1.5">
                    View alert feed <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Separator line */}
        <div className="h-6 w-[1px] bg-border/60" />

        {/* Organization Badge & User Session info */}
        <div className="hidden md:flex items-center gap-2.5">
          <div className="flex flex-col text-right">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{user?.name}</span>
            <span className="text-[10px] text-muted-foreground">{user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
