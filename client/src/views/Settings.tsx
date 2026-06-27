import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { 
  Save, 
  Key, 
  Globe, 
  Bot, 
  Building, 
  Trash2, 
  Plus, 
  CheckCircle,
  Copy
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface DomainRecord {
  id: number;
  domainName: string;
  status: 'active' | 'pending';
  mailboxCount: number;
  dailyLimit: number;
}

interface ApiKey {
  id: number;
  name: string;
  keySnippet: string;
  created: string;
}

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('org');

  // Org state
  const [companyName, setCompanyName] = useState(user?.organization || 'Acme Sales Corp');
  const [website, setWebsite] = useState('https://acmesales.com');
  const [maxMonthlyOutbound, setMaxMonthlyOutbound] = useState(10000);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // AI Config state
  const [agentSignature, setAgentSignature] = useState('Best regards,\n{AgentName}\nAI Outbound Associate | {CompanyName}');
  const [systemInstructions, setSystemInstructions] = useState('Do not message companies matching list in competitors.txt.\nFocus on value propositions regarding logistics and delivery timing audit automations.');

  // Domains list state
  const [domains, setDomains] = useState<DomainRecord[]>([
    { id: 1, domainName: 'acme-sales.com', status: 'active', mailboxCount: 4, dailyLimit: 200 },
    { id: 2, domainName: 'acme-outbound.com', status: 'active', mailboxCount: 2, dailyLimit: 100 },
    { id: 3, domainName: 'acme-hq.net', status: 'pending', mailboxCount: 0, dailyLimit: 0 },
  ]);
  const [newDomainInput, setNewDomainInput] = useState('');

  // API Keys state
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: 1, name: 'HubSpot Sync Key', keySnippet: 'sk_live_••••••••a3e9', created: '2026-05-12' },
    { id: 2, name: 'Apollo Data Enricher', keySnippet: 'sk_live_••••••••8bc1', created: '2026-06-18' },
  ]);
  const [newKeyName, setNewKeyName] = useState('');

  const triggerSaveNotification = () => {
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  const handleSaveOrg = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSaveNotification();
  };

  const handleSaveAIConfig = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSaveNotification();
  };

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomainInput) return;
    const newDomain: DomainRecord = {
      id: domains.length + 1,
      domainName: newDomainInput,
      status: 'pending',
      mailboxCount: 0,
      dailyLimit: 0,
    };
    setDomains([...domains, newDomain]);
    setNewDomainInput('');
  };

  const handleDeleteDomain = (id: number) => {
    setDomains(domains.filter((d) => d.id !== id));
  };

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    const newKey: ApiKey = {
      id: apiKeys.length + 1,
      name: newKeyName,
      keySnippet: 'sk_live_••••••••' + Math.random().toString(36).substring(2, 6),
      created: new Date().toISOString().split('T')[0],
    };
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
  };

  const handleDeleteKey = (id: number) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in p-1">
      {/* Action and Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Workspace Configuration</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage domain rotations, AI core instructions, and system integration API keys.</p>
        </div>

        {/* Global Save Indicator */}
        {isSavedNotice && (
          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3.5 py-1.5 rounded-lg text-xs font-bold animate-pulse-glow shadow-sm">
            <CheckCircle className="h-4 w-4" /> Settings updated successfully
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side Navigation Tabs */}
        <div className="w-full lg:w-60 shrink-0">
          <Tabs defaultValue="org" onValueChange={setActiveTab} className="flex flex-col w-full">
            <TabsList className="flex flex-row lg:flex-col items-stretch justify-start h-auto w-full p-1.5 bg-secondary gap-1 border border-border/60">
              <TabsTrigger value="org" className="justify-start gap-2.5 py-2.5">
                <Building className="h-4 w-4 text-slate-400" /> Organization
              </TabsTrigger>
              <TabsTrigger value="ai" className="justify-start gap-2.5 py-2.5">
                <Bot className="h-4 w-4 text-slate-400" /> AI Agent Config
              </TabsTrigger>
              <TabsTrigger value="domains" className="justify-start gap-2.5 py-2.5">
                <Globe className="h-4 w-4 text-slate-400" /> Domain Rotations
              </TabsTrigger>
              <TabsTrigger value="api" className="justify-start gap-2.5 py-2.5">
                <Key className="h-4 w-4 text-slate-400" /> API Access Keys
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Right side Panels content */}
        <div className="flex-1">
          {/* Organization Panel */}
          {activeTab === 'org' && (
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-sm font-bold">Workspace Details</CardTitle>
                <CardDescription className="text-xs">Adjust your enterprise registration parameters and monthly outbound limit bounds.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveOrg} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Company Name</label>
                      <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Corporate Domain</label>
                      <Input value={website} onChange={(e) => setWebsite(e.target.value)} required />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Monthly Outbound Target Volume</label>
                    <Input 
                      type="number" 
                      value={maxMonthlyOutbound} 
                      onChange={(e) => setMaxMonthlyOutbound(parseInt(e.target.value))} 
                      required 
                    />
                    <span className="text-[10px] text-muted-foreground block mt-1">Recommended maximum based on your connected domains is 15,000 / month.</span>
                  </div>

                  <div className="pt-3 border-t border-border/50 flex justify-end">
                    <Button type="submit" variant="default" className="font-bold flex items-center gap-1.5 shadow-md shadow-primary/10">
                      <Save className="h-4 w-4" /> Save Workspace Settings
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* AI Configuration Panel */}
          {activeTab === 'ai' && (
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-sm font-bold">AI Agent Settings</CardTitle>
                <CardDescription className="text-xs">Configure how AI SDRs represent your brand, construct signatures, and reference product sheets.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveAIConfig} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Default Mail Signature Template</label>
                    <textarea
                      value={agentSignature}
                      onChange={(e) => setAgentSignature(e.target.value)}
                      rows={3}
                      className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none leading-relaxed"
                    />
                    <span className="text-[10px] text-muted-foreground block mt-1">Placeholders like `{"{AgentName}"}` and `{"{CompanyName}"}` will be mapped automatically.</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Global AI Exclusion & Context Instructions</label>
                    <textarea
                      value={systemInstructions}
                      onChange={(e) => setSystemInstructions(e.target.value)}
                      rows={4}
                      className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-xs font-mono text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none leading-relaxed"
                    />
                  </div>

                  <div className="pt-3 border-t border-border/50 flex justify-end">
                    <Button type="submit" variant="default" className="font-bold flex items-center gap-1.5 shadow-md shadow-primary/10">
                      <Save className="h-4 w-4" /> Save AI Configuration
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Domain Setup Panel */}
          {activeTab === 'domains' && (
            <div className="space-y-6">
              <Card className="border-border/60">
                <CardHeader>
                  <CardTitle className="text-sm font-bold">Add Domain for Rotation</CardTitle>
                  <CardDescription className="text-xs">Connecting multiple secondary domains safeguards your core company email reputation from spam flagging.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddDomain} className="flex gap-3">
                    <Input 
                      placeholder="e.g. acme-outbound.com" 
                      value={newDomainInput}
                      onChange={(e) => setNewDomainInput(e.target.value)}
                      required
                    />
                    <Button type="submit" className="font-bold text-xs shrink-0 flex items-center gap-1">
                      <Plus className="h-4 w-4" /> Add Domain
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Connected domains table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain Name</TableHead>
                    <TableHead>DNS Status</TableHead>
                    <TableHead>Active Inboxes</TableHead>
                    <TableHead>Daily Cap Limit</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {domains.map((dom) => (
                    <TableRow key={dom.id}>
                      <TableCell className="font-semibold text-xs">{dom.domainName}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={dom.status === 'active' ? 'success' : 'warning'}
                          className="text-[9px] px-1.5 h-4.5 font-bold uppercase tracking-wider"
                        >
                          {dom.status === 'active' ? 'Verified' : 'Verification Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs font-semibold">{dom.mailboxCount} inboxes</TableCell>
                      <TableCell className="text-xs font-semibold">{dom.dailyLimit > 0 ? `${dom.dailyLimit} emails/day` : '--'}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8.5 w-8.5 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteDomain(dom.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* API Access Keys Panel */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <Card className="border-border/60">
                <CardHeader>
                  <CardTitle className="text-sm font-bold">Generate API Secret Key</CardTitle>
                  <CardDescription className="text-xs">Secret keys authorize customized programmatic data connections directly to your ProspectAI backend loops.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleGenerateKey} className="flex gap-3">
                    <Input 
                      placeholder="e.g. Zapier Webhook Sync" 
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      required
                    />
                    <Button type="submit" className="font-bold text-xs shrink-0 flex items-center gap-1.5">
                      <Plus className="h-4 w-4" /> Create Secret Key
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* API Keys Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key Name</TableHead>
                    <TableHead>Secret Token</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground text-xs font-semibold">
                        No API secret keys found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    apiKeys.map((k) => (
                      <TableRow key={k.id}>
                        <TableCell className="font-bold text-xs">{k.name}</TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted/65 dark:bg-muted/15 px-2 py-1 rounded font-semibold text-slate-800 dark:text-slate-300">
                            {k.keySnippet}
                          </code>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground font-semibold">{k.created}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button variant="ghost" size="sm" className="h-8.5 w-8.5 p-0" title="Copy key">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8.5 w-8.5 p-0 text-muted-foreground hover:text-destructive"
                              onClick={() => handleDeleteKey(k.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
