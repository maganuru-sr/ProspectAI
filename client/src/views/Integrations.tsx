import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Switch } from '../components/ui/Switch';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Dialog } from '../components/ui/Dialog';
import { Input } from '../components/ui/Input';
import { 
  Settings2, 
  RefreshCw, 
  Check, 
  Database,
  Mail,
  Linkedin
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  connected: boolean;
  lastSynced: string;
  icon: React.ReactNode;
  syncOptions: { label: string; checked: boolean }[];
}

const initialIntegrations: Integration[] = [
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'CRM & Pipeline',
    description: 'Sync interested prospects as Deals. Automate contact owner updates when AI schedules meetings.',
    connected: true,
    lastSynced: '14 mins ago',
    icon: <Database className="h-5 w-5 text-orange-500" />,
    syncOptions: [
      { label: 'Push interested leads as Deals', checked: true },
      { label: 'Sync outreach logs to Contact Timeline', checked: true },
      { label: 'Map CRM custom owner IDs to AI Agent', checked: false }
    ]
  },
  {
    id: 'apollo',
    name: 'Apollo.io',
    category: 'Data & B2B Contacts',
    description: 'Enrich target prospect records with verified work emails, phone numbers, and LinkedIn handles directly.',
    connected: true,
    lastSynced: '2 hours ago',
    icon: <Database className="h-5 w-5 text-sky-500" />,
    syncOptions: [
      { label: 'Enrich new leads automatically', checked: true },
      { label: 'Auto-verify emails prior to mailing', checked: true }
    ]
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'CRM & Pipeline',
    description: 'Sync pipeline leads into Salesforce Accounts. Map conversation outcomes back to Salesforce reports.',
    connected: false,
    lastSynced: '--',
    icon: <Database className="h-5 w-5 text-blue-500" />,
    syncOptions: [
      { label: 'Sync sequence events to Tasks', checked: false },
      { label: 'Push unqualified leads to Leads queue', checked: false }
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Sales Navigator',
    category: 'Social Channels',
    description: 'Send LinkedIn connection requests and InMails using your personal agent routing profiles.',
    connected: true,
    lastSynced: '1 day ago',
    icon: <Linkedin className="h-5 w-5 text-[#0a66c2]" />,
    syncOptions: [
      { label: 'Auto-send connection requests', checked: true },
      { label: 'View profile before emailing step', checked: false }
    ]
  },
  {
    id: 'google',
    name: 'Google Workspace',
    category: 'Email & Calendar',
    description: 'Connect Gmail mailboxes and Google Calendar to schedule sales meetings via outbound loops.',
    connected: true,
    lastSynced: '4 mins ago',
    icon: <Mail className="h-5 w-5 text-red-500" />,
    syncOptions: [
      { label: 'Auto-schedule Google Meet invites', checked: true },
      { label: 'Sync Calendar availability in real-time', checked: true },
      { label: 'Enable smart inbox folder classification', checked: true }
    ]
  },
  {
    id: 'outlook',
    name: 'Outlook & O365',
    category: 'Email & Calendar',
    description: 'Connect Microsoft business mailboxes and calendars to initiate sequences and organize meetings.',
    connected: false,
    lastSynced: '--',
    icon: <Mail className="h-5 w-5 text-blue-600" />,
    syncOptions: [
      { label: 'Sync Calendar availability in real-time', checked: false }
    ]
  }
];

const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [activeSetupId, setActiveSetupId] = useState<string | null>(null);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  
  // API credentials states
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [clientIdInput, setClientIdInput] = useState('');


  const handleConfigureSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSetupId) return;

    setIntegrations((prev) =>
      prev.map((integ) => {
        if (integ.id === activeSetupId) {
          return { ...integ, connected: true, lastSynced: 'Just now' };
        }
        return integ;
      })
    );
    setActiveSetupId(null);
    setApiKeyInput('');
    setClientIdInput('');
  };

  const handleSyncNow = async (id: string) => {
    setSyncingId(id);
    // Simulate sync lag
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIntegrations((prev) =>
      prev.map((integ) => {
        if (integ.id === id) {
          return { ...integ, lastSynced: 'Just now' };
        }
        return integ;
      })
    );
    setSyncingId(null);
  };

  const handleToggleSyncOption = (integrationId: string, optionIndex: number) => {
    setIntegrations((prev) =>
      prev.map((integ) => {
        if (integ.id === integrationId) {
          const updatedOptions = [...integ.syncOptions];
          updatedOptions[optionIndex] = {
            ...updatedOptions[optionIndex],
            checked: !updatedOptions[optionIndex].checked,
          };
          return { ...integ, syncOptions: updatedOptions };
        }
        return integ;
      })
    );
  };

  const activeSetupInteg = integrations.find((i) => i.id === activeSetupId);

  return (
    <div className="space-y-6 animate-fade-in p-1">
      {/* View description banner */}
      <div>
        <h2 className="text-xl font-bold tracking-tight">Enterprise Sync Channels</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Integrate outbound messaging logs, domains, and schedules directly with CRM pipeline tools.</p>
      </div>

      {/* Grid of integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integ) => (
          <Card key={integ.id} hoverGlow className="border-border/60 flex flex-col justify-between">
            <div>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-border/80 flex items-center justify-center shadow-xs">
                    {integ.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xs font-black">{integ.name}</CardTitle>
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{integ.category}</span>
                  </div>
                </div>

                <Badge 
                  variant={integ.connected ? 'success' : 'outline'} 
                  className="text-[9px] px-1.5 h-4.5 font-bold uppercase tracking-wider select-none"
                >
                  {integ.connected ? 'Connected' : 'Disconnected'}
                </Badge>
              </CardHeader>

              <CardContent className="pt-2 pb-4 space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {integ.description}
                </p>

                {/* Sub configuration options for connected integrations */}
                {integ.connected && integ.syncOptions.length > 0 && (
                  <div className="pt-3 border-t border-border/40 space-y-2.5">
                    <span className="block text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Sync Configurations</span>
                    {integ.syncOptions.map((opt, index) => (
                      <div key={index} className="flex items-center justify-between gap-4">
                        <span className="text-xs text-slate-800 dark:text-slate-300 font-semibold">{opt.label}</span>
                        <Switch
                          checked={opt.checked}
                          onCheckedChange={() => handleToggleSyncOption(integ.id, index)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </div>

            <div className="p-4 border-t border-border/50 bg-slate-50/50 dark:bg-slate-900/30 rounded-b-xl flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5">
                <RefreshCw className={`h-3 w-3 ${syncingId === integ.id ? 'animate-spin text-indigo-500' : ''}`} />
                {syncingId === integ.id ? 'Syncing...' : integ.connected ? `Synced ${integ.lastSynced}` : 'Not synced'}
              </span>

              <div className="flex gap-2">
                {integ.connected ? (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 text-[11px] px-2.5 font-bold"
                      onClick={() => handleSyncNow(integ.id)}
                      disabled={!!syncingId}
                    >
                      Sync Now
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      title="Settings"
                      onClick={() => setActiveSetupId(integ.id)}
                    >
                      <Settings2 className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="h-8.5 text-[11px] px-4 font-bold"
                    onClick={() => setActiveSetupId(integ.id)}
                  >
                    Connect
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Setup API modal for offline/disconnected systems */}
      <Dialog
        isOpen={activeSetupId !== null}
        onClose={() => setActiveSetupId(null)}
        title={`Connect to ${activeSetupInteg?.name}`}
        description={`Provide connection variables below to authorize OAuth or secure API connections to ${activeSetupInteg?.name}.`}
        maxWidth="md"
      >
        <form onSubmit={handleConfigureSave} className="space-y-4 pt-2">
          {activeSetupInteg?.id === 'linkedin' ? (
            <div className="space-y-4">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 rounded-lg text-xs leading-relaxed font-semibold">
                This sync authorizes ProspectAI agents to send InMails and invitations on your behalf.
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">LinkedIn Profile URL</label>
                <Input
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">API Key / Token</label>
                <Input
                  type="password"
                  placeholder="Paste secure auth token..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Client / Portal ID</label>
                <Input
                  placeholder="Paste client ID..."
                  value={clientIdInput}
                  onChange={(e) => setClientIdInput(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Sync authorization footer */}
          <div className="flex justify-end gap-3 pt-3 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setActiveSetupId(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="default" className="font-bold flex items-center gap-1.5">
              <Check className="h-4 w-4" /> Authorize Connection
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default Integrations;
