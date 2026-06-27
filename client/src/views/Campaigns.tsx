import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '../components/ui/Table';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Switch } from '../components/ui/Switch';
import { Dialog } from '../components/ui/Dialog';
import { Tooltip } from '../components/ui/Tooltip';
import { 
  Plus, 
  Search, 
  Sparkles, 
  Settings2, 
  Mail, 
  Linkedin, 
  ChevronRight, 
  HelpCircle,
  Clock
} from 'lucide-react';

interface Campaign {
  id: number;
  name: string;
  agent: string;
  status: 'active' | 'paused' | 'draft';
  sent: number;
  opens: string;
  replies: string;
  meetings: number;
  steps: number;
}

const initialCampaigns: Campaign[] = [
  { id: 1, name: 'Fintech Series A Outreach', agent: 'Max', status: 'active', sent: 1284, opens: '65.2%', replies: '16.4%', meetings: 28, steps: 4 },
  { id: 2, name: 'EMEA DevOps Leaders Sequence', agent: 'Sophia', status: 'active', sent: 942, opens: '61.8%', replies: '12.8%', meetings: 19, steps: 3 },
  { id: 3, name: 'US HealthTech Co-Pilot Loop', agent: 'Max', status: 'paused', sent: 822, opens: '68.0%', replies: '15.2%', meetings: 15, steps: 4 },
  { id: 4, name: 'APAC HR Directors Pitch', agent: 'Sophia', status: 'draft', sent: 0, opens: '--', replies: '--', meetings: 0, steps: 3 },
];

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Form states for New Campaign
  const [newName, setNewName] = useState('');
  const [newAgent, setNewAgent] = useState('Max');
  const [newPersona, setNewPersona] = useState('');
  const [newValueProp, setNewValueProp] = useState('');
  const [newTone, setNewTone] = useState('Consultative');

  const handleToggleStatus = (id: number) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'active' ? 'paused' : 'active';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPersona) return;

    const newCampaign: Campaign = {
      id: campaigns.length + 1,
      name: newName,
      agent: newAgent,
      status: 'active',
      sent: 0,
      opens: '0.0%',
      replies: '0.0%',
      meetings: 0,
      steps: 4,
    };

    setCampaigns((prev) => [newCampaign, ...prev]);
    setIsCreateModalOpen(false);

    // Reset fields
    setNewName('');
    setNewPersona('');
    setNewValueProp('');
  };

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.agent.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && c.status === 'active';
    if (activeTab === 'paused') return matchesSearch && c.status === 'paused';
    if (activeTab === 'draft') return matchesSearch && c.status === 'draft';
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in p-1">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Campaign Sequences</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Define outreach templates, schedule follow-ups, and review automated loops.</p>
        </div>
        <Button 
          variant="default" 
          size="sm" 
          className="font-bold text-xs h-9 shadow-md"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-1.5" /> New Sequence
        </Button>
      </div>

      {/* Search and Tabs Container */}
      <Card className="border-border/60">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All Campaigns</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="paused">Paused</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="w-full sm:w-64">
            <Input
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              className="h-9.5 text-xs bg-slate-100/50 dark:bg-slate-900/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Campaigns Listing Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Sequence Name</TableHead>
            <TableHead>AI Agent</TableHead>
            <TableHead>Steps</TableHead>
            <TableHead>Sent</TableHead>
            <TableHead>Open Rate</TableHead>
            <TableHead>Reply Rate</TableHead>
            <TableHead>Meetings</TableHead>
            <TableHead className="w-[12%]">Active Sync</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCampaigns.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground text-xs font-semibold">
                No matching sequences found.
              </TableCell>
            </TableRow>
          ) : (
            filteredCampaigns.map((c) => (
              <TableRow key={c.id}>
                {/* Campaign Name with sub steps details */}
                <TableCell>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{c.name}</h4>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        c.status === 'active' 
                          ? 'bg-emerald-500' 
                          : c.status === 'paused' 
                            ? 'bg-amber-500' 
                            : 'bg-slate-400'
                      }`} />
                      <span className="text-[10px] text-muted-foreground font-semibold capitalize">{c.status}</span>
                    </div>
                  </div>
                </TableCell>

                {/* AI Agent tag */}
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <div className="h-5 w-5 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-[9px]">
                      {c.agent.charAt(0)}
                    </div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{c.agent}</span>
                  </div>
                </TableCell>

                {/* Steps count with email/linkedin icons */}
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold">{c.steps} steps</span>
                    <Tooltip content="Sequence includes Email and LinkedIn Outreach">
                      <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                    </Tooltip>
                  </div>
                </TableCell>

                {/* Outbound statistics */}
                <TableCell className="font-semibold text-xs">{c.sent.toLocaleString()}</TableCell>
                <TableCell className="font-semibold text-xs">{c.opens}</TableCell>
                <TableCell className="font-semibold text-xs text-indigo-500 dark:text-indigo-400">{c.replies}</TableCell>
                <TableCell>
                  {c.meetings > 0 ? (
                    <Badge variant="success" className="text-[10px] font-bold py-0.5 h-5">
                      {c.meetings} Booked
                    </Badge>
                  ) : (
                    <span className="text-xs text-slate-400 font-semibold">--</span>
                  )}
                </TableCell>

                {/* Switch status toggle */}
                <TableCell>
                  <div className="flex items-center">
                    <Switch
                      checked={c.status === 'active'}
                      onCheckedChange={() => handleToggleStatus(c.id)}
                      disabled={c.status === 'draft'}
                    />
                  </div>
                </TableCell>

                {/* Edit sequence details */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit template">
                      <Settings2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8.5 text-xs font-semibold">
                      Details <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Create Modal Dialog */}
      <Dialog
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Outbound Sales Sequence"
        description="Provide campaign parameters. The AI agent will auto-draft sequences matching your tone."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateCampaign} className="space-y-4 pt-2">
          {/* Campaign Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Campaign Name</label>
            <Input
              placeholder="e.g. US Retail CTO Lead Loop"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Assign AI Agent */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Assign AI Agent</label>
              <select
                value={newAgent}
                onChange={(e) => setNewAgent(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 text-foreground"
              >
                <option value="Max">Max (Outbound Outreach Core)</option>
                <option value="Sophia">Sophia (High-Growth Executive focus)</option>
              </select>
            </div>

            {/* Target Persona */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Persona Titles</label>
              <Input
                placeholder="e.g. VP Operations, Chief Logistics"
                value={newPersona}
                onChange={(e) => setNewPersona(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Tone of Voice */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Outreach Tone Profile</label>
              <select
                value={newTone}
                onChange={(e) => setNewTone(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 text-foreground"
              >
                <option value="Consultative">Consultative (Curious, helpful)</option>
                <option value="Direct">Direct (Short, to-the-point)</option>
                <option value="Assertive">Assertive (Growth metrics focused)</option>
                <option value="Friendly">Friendly (Casual, conversational)</option>
              </select>
            </div>

            {/* Sequence steps preview */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Sequence Cadence</label>
              <div className="h-10 px-3 bg-secondary rounded-lg border border-border flex items-center justify-between text-xs text-muted-foreground font-semibold">
                <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> 3 Emails</span>
                <span className="flex items-center gap-1.5"><Linkedin className="h-3.5 w-3.5" /> 1 LinkedIn</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 12d Span</span>
              </div>
            </div>
          </div>

          {/* Value Prop */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Value Proposition / Product Pitch</label>
            <textarea
              placeholder="e.g. We automate shipping logistics audits. On average, we save retail companies 12% in annual parcel spend. Integration takes 30 mins."
              rows={3}
              value={newValueProp}
              onChange={(e) => setNewValueProp(e.target.value)}
              className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-3 border-t border-border/50">
            <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default" className="font-bold flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> Generate Sequence
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default Campaigns;
