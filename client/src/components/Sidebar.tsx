import React from 'react';
import {
  LayoutDashboard,
  Send,
  MessageSquareCode,
  Grid2X2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  Sparkles,
  Users,
  CheckSquare ,
  BarChart3,
  BadgeIndianRupee
} from "lucide-react";
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const { user, logout } = useAuth();

  const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },

  { id: 'prospects', label: 'Prospects', icon: Grid2X2 },

  {
  id: 'leads',
  label: 'Leads',
  icon: Users,
},

{
  id: "deals",
  label: "Deals",
  icon: BadgeIndianRupee,
},

{
  id: "tasks",
  label: "Tasks",
  icon: CheckSquare,
},

{
  id: "analytics",
  label: "Analytics",
  icon: BarChart3,
},


  { id: 'campaigns', label: 'Campaigns', icon: Send, badge: 'Active' },

  { id: 'copilot', label: 'AI Co-Pilot', icon: MessageSquareCode, badge: '9+' },

  { id: 'integrations', label: 'Integrations', icon: Grid2X2 },

  { id: 'settings', label: 'Settings', icon: Settings },
];

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setMobileOpen(false); // Close mobile menu if open
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r border-border select-none">
      {/* Brand Section */}
      <div className={cn(
        "flex items-center gap-3 p-6 border-b border-border/50",
        isCollapsed ? "justify-center px-4" : "justify-between"
      )}>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20">
            <Sparkles className="h-4.5 w-4.5 animate-pulse" />
          </div>
          {!isCollapsed && (
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
              Prospect<span className="text-indigo-500 font-black">AI</span>
            </span>
          )}
        </div>
        {!isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(true)}
            className="hidden md:flex h-6 w-6 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/80",
                isCollapsed && "justify-center"
              )}
            >
              <Icon className={cn("h-4.5 w-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110", isActive ? "" : "text-slate-400 dark:text-slate-500 group-hover:text-foreground")} />
              
              {!isCollapsed && (
                <span className="flex-1 text-left truncate">{item.label}</span>
              )}

              {/* Badges */}
              {item.badge && !isCollapsed && (
                <span className={cn(
                  "px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm",
                  isActive 
                    ? "bg-white/20 text-white" 
                    : item.id === 'copilot' 
                      ? "bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/15 dark:text-indigo-400" 
                      : "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/15 dark:text-emerald-400"
                )}>
                  {item.badge}
                </span>
              )}

              {/* Tooltip for Collapsed Sidebar */}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150 z-50 whitespace-nowrap shadow-md">
                  {item.label}
                  {item.badge && ` (${item.badge})`}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Credit / Health Status */}
      {!isCollapsed && (
        <div className="p-4 mx-3 mb-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-border/60">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-3.5 w-3.5 text-indigo-500 animate-bounce" />
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">AI Credit Usage</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 mb-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-1.5 rounded-full" style={{ width: '82%' }} />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
            <span>8,204 / 10,000 credits</span>
            <span className="text-indigo-500">82%</span>
          </div>
        </div>
      )}

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-border/50 flex flex-col gap-3">
        {/* Profile Card */}
        <div className={cn(
          "flex items-center gap-3",
          isCollapsed ? "justify-center" : ""
        )}>
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm shadow-md border border-background">
              {user?.name.charAt(0) || 'U'}
            </div>
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-card" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold truncate text-slate-900 dark:text-slate-100">{user?.name}</h4>
              <p className="text-[10px] text-muted-foreground truncate">{user?.organization}</p>
            </div>
          )}
        </div>

        {/* Logout button */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={logout}
          className={cn(
            "text-muted-foreground hover:text-destructive hover:bg-destructive/5 justify-start h-8 px-2 w-full",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2 font-medium">Log out</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar wrapper */}
      <aside className={cn(
        "hidden md:block h-screen sticky top-0 transition-all duration-300 z-30 shrink-0",
        isCollapsed ? "w-[72px]" : "w-64"
      )}>
        <SidebarContent />
        {/* Collapse toggle in collapsed state */}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="absolute top-7 -right-3 hidden md:flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-sm"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        )}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div 
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-slate-950/40 dark:bg-slate-950/60 backdrop-blur-xs" 
          />
          {/* Drawer container */}
          <div className="relative w-64 max-w-xs flex-1 flex flex-col h-full bg-card animate-fade-in">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
