import React, { useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Tooltip } from '../components/ui/Tooltip';
import { 
  Sparkles, 
  ThumbsUp, 
  ThumbsDown, 
  RefreshCw, 
  CornerUpLeft, 
  Clock, 
  Search,
  CheckCircle,
  Brain,
  SendHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmailThread {
  id: number;
  leadName: string;
  leadRole: string;
  companyName: string;
  subject: string;
  sentiment: 'Interested' | 'Meeting Request' | 'Info Request' | 'OOF' | 'Not Interested';
  badgeVariant: 'success' | 'info' | 'warning' | 'destructive' | 'secondary';
  receivedTime: string;
  history: { sender: 'agent' | 'lead'; body: string; date: string }[];
  suggestedDraft: string;
  agentName: string;
}

const initialThreads: EmailThread[] = [
  {
    id: 1,
    leadName: 'Sarah Jenkins',
    leadRole: 'VP of Sales',
    companyName: 'TechScale',
    subject: 'Re: Prospecting efficiency check',
    sentiment: 'Interested',
    badgeVariant: 'success',
    receivedTime: '5 mins ago',
    agentName: 'Max',
    history: [
      {
        sender: 'agent',
        body: 'Hi Sarah,\n\nI noticed TechScale has been expanding your SDR team this quarter. Typically, scaling SDR teams experience a drop-off in email deliverability due to multi-inbox setup configurations.\n\nAt ProspectAI, we automate domain rotation so your outbound deliverability stays above 98%. We recently helped CloudInc increase their booking rate by 240%.\n\nDo you have 15 minutes to review your email infrastructure next Tuesday?\n\nBest,\nMax (AI outbound agent for Acme Sales)',
        date: 'June 27, 10:14 AM'
      },
      {
        sender: 'lead',
        body: 'Thanks for reaching out, Max. This actually is a current headache for us as we just added 4 new SDRs and our domain score dropped. I am free to talk. Can you send over some times for next week?',
        date: 'June 27, 11:42 PM'
      }
    ],
    suggestedDraft: 'Hi Sarah,\n\nGlad to hear that. I can certainly set that up for us.\n\nWould either of these slots work for you next week (converted to your timezone)?\n- Tuesday, June 30th at 10:00 AM EST\n- Thursday, July 2nd at 2:00 PM EST\n\nAlternatively, you can pick a slot directly via our calendar here: [Calendar Link]\n\nLooking forward to speaking.\n\nBest,\nMax (AI agent for Acme Sales)'
  },
  {
    id: 2,
    leadName: 'John Doe',
    leadRole: 'Director IT',
    companyName: 'CloudInc',
    subject: 'Re: Cloud scaling automation',
    sentiment: 'Meeting Request',
    badgeVariant: 'info',
    receivedTime: '24 mins ago',
    agentName: 'Max',
    history: [
      {
        sender: 'agent',
        body: 'Hi John,\n\nQuick question: is CloudInc currently auditing your outbound sales workflows? We have an AI model built specifically to scrape clean intent data for software integrations.\n\nWould you be open to a quick intro?',
        date: 'June 27, 09:20 AM'
      },
      {
        sender: 'lead',
        body: 'Hi Max, yes, we can take a look. Let\'s schedule a call for Friday at 11:00 AM. Let me know if that works.',
        date: 'June 27, 11:15 PM'
      }
    ],
    suggestedDraft: 'Hi John,\n\nFriday at 11:00 AM EST works perfectly. I have calendarized the invitation and sent it to your email. You should see a Google Meet invite in your inbox shortly.\n\nI\'ll prepare a customized analysis of your domain score to share on the call.\n\nSpeak then,\nMax (AI agent for Acme Sales)'
  },
  {
    id: 3,
    leadName: 'Arthur Pendelton',
    leadRole: 'VP Marketing',
    companyName: 'CoreBrand',
    subject: 'Out of Office Re: Brand positioning data',
    sentiment: 'OOF',
    badgeVariant: 'warning',
    receivedTime: '2h ago',
    agentName: 'Sophia',
    history: [
      {
        sender: 'agent',
        body: 'Hi Arthur, wanted to share a quick case study on how we scaled outbound lead gen for branding agencies...',
        date: 'June 26, 04:30 PM'
      },
      {
        sender: 'lead',
        body: 'Thank you for your email. I am currently out of the office returning on July 2nd. For urgent matters, please contact marketing@corebrand.com.',
        date: 'June 26, 04:31 PM'
      }
    ],
    suggestedDraft: 'Hi Arthur,\n\nUnderstood. I will pause our outbound cycle and re-ping you on July 3rd after you settle back in.\n\nHave a great out of office break!\n\nBest,\nSophia (AI agent for Acme Sales)'
  },
  {
    id: 4,
    leadName: 'Melinda Gates',
    leadRole: 'Head of Growth',
    companyName: 'BonaFide',
    subject: 'Re: Quick query',
    sentiment: 'Info Request',
    badgeVariant: 'secondary',
    receivedTime: '4h ago',
    agentName: 'Sophia',
    history: [
      {
        sender: 'agent',
        body: 'Hi Melinda, simple question: does BonaFide use HubSpot for deal logging?',
        date: 'June 25, 11:00 AM'
      },
      {
        sender: 'lead',
        body: 'We do. But how does your domain rotation plug into HubSpot? Do we need to install an app?',
        date: 'June 25, 08:30 PM'
      }
    ],
    suggestedDraft: 'Hi Melinda,\n\nGreat question! ProspectAI integrates directly with HubSpot via OAuth (takes 2 clicks).\n\nOnce connected, we sync leads from your contact lists, send the outbound sequences, and push replies back to HubSpot as timeline events automatically. No manual app installation is required on your mail server.\n\nI\'ve attached a 1-page PDF overview of the data syncing flow. Would you be open to a quick 5-min demo next week?\n\nBest,\nSophia (AI agent for Acme Sales)'
  }
];

const CoPilot: React.FC = () => {
  const [threads, setThreads] = useState<EmailThread[]>(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState(1);
  const [draftPrompt, setDraftPrompt] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [activeSentimentFilter, setActiveSentimentFilter] = useState<string>('All');

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleUpdateDraft = (newText: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === activeThread.id ? { ...t, suggestedDraft: newText } : t))
    );
  };

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftPrompt.trim()) return;

    setIsRegenerating(true);
    // Simulate AI thinking and drafting latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let updatedDraft = activeThread.suggestedDraft;
    const promptLower = draftPrompt.toLowerCase();
    
    if (promptLower.includes('shorter') || promptLower.includes('shorten')) {
      updatedDraft = `Hi ${activeThread.leadName.split(' ')[0]},\n\nUnderstood. Tuesday at 10 AM EST works. I have sent the invite over.\n\nSpeak then,\n${activeThread.agentName} (AI agent for Acme Sales)`;
    } else if (promptLower.includes('pricing') || promptLower.includes('cost')) {
      updatedDraft = activeThread.suggestedDraft + `\n\nP.S. Regarding pricing, our enterprise Tier starts at $49/seat/mo, fully inclusive of domain rotation fees.`;
    } else {
      updatedDraft = activeThread.suggestedDraft + `\n\n[AI Edit: Applied prompt request: "${draftPrompt}"]`;
    }

    handleUpdateDraft(updatedDraft);
    setDraftPrompt('');
    setIsRegenerating(false);
  };

  const handleSendDraft = async () => {
    setIsSending(true);
    // Simulate sending email
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Remove the thread from list as it is completed/resolved
    setThreads((prev) => prev.filter((t) => t.id !== activeThread.id));
    setIsSending(false);

    // Set first available thread as active
    const remaining = threads.filter((t) => t.id !== activeThread.id);
    if (remaining.length > 0) {
      setActiveThreadId(remaining[0].id);
    }
  };

  const filteredThreads = threads.filter((t) => {
    if (activeSentimentFilter === 'All') return true;
    return t.sentiment === activeSentimentFilter;
  });

  return (
    <div className="h-[calc(100vh-130px)] flex border border-border bg-card rounded-2xl overflow-hidden animate-fade-in">
      {/* Left pane: Inbox threads selector */}
      <div className="w-[35%] border-r border-border/80 flex flex-col h-full bg-slate-50/50 dark:bg-card">
        {/* Search */}
        <div className="p-4 border-b border-border/60">
          <Input
            placeholder="Search inbox..."
            icon={<Search className="h-4 w-4" />}
            className="h-9 text-xs bg-slate-100/50 dark:bg-slate-900/50"
          />
        </div>

        {/* Sentiment Category Tabs */}
        <div className="px-4 py-3.5 border-b border-border/50 flex gap-1.5 overflow-x-auto select-none">
          {['All', 'Interested', 'Meeting Request', 'OOF', 'Info Request'].map((sent) => (
            <button
              key={sent}
              onClick={() => setActiveSentimentFilter(sent)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors whitespace-nowrap ${
                activeSentimentFilter === sent
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-card text-muted-foreground border-border hover:text-foreground'
              }`}
            >
              {sent}
            </button>
          ))}
        </div>

        {/* Threads list */}
        <div className="flex-1 overflow-y-auto divide-y divide-border/60">
          {filteredThreads.length === 0 ? (
            <div className="text-center py-10 px-4">
              <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto mb-2 opacity-80" />
              <h4 className="text-xs font-bold">Inbox cleared</h4>
              <p className="text-[10px] text-muted-foreground mt-1">All AI prospect drafts have been reviewed and approved.</p>
            </div>
          ) : (
            filteredThreads.map((thread) => {
              const isActive = thread.id === activeThreadId;
            return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`p-4 cursor-pointer transition-all duration-150 relative ${
                    isActive 
                      ? 'bg-primary/5 dark:bg-primary/10 border-l-3 border-indigo-500' 
                      : 'hover:bg-muted/30 dark:hover:bg-muted/10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{thread.leadName}</h4>
                      <p className="text-[10px] text-muted-foreground">{thread.companyName}</p>
                    </div>
                    <span className="text-[9px] text-slate-400 font-semibold">{thread.receivedTime}</span>
                  </div>

                  <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate mb-2">
                    {thread.subject}
                  </p>

                  <div className="flex justify-between items-center">
                    <Badge variant={thread.badgeVariant} className="text-[9px] px-1.5 h-4 font-bold uppercase tracking-wider">
                      {thread.sentiment}
                    </Badge>
                    <span className="text-[9px] font-semibold text-indigo-500 dark:text-indigo-400 flex items-center gap-1">
                      <Brain className="h-2.5 w-2.5" /> Agent {thread.agentName}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right pane: Thread reader & AI editor */}
      {threads.length > 0 && activeThread ? (
        <div className="flex-1 flex flex-col h-full bg-card">
          {/* Header */}
          <div className="p-4 border-b border-border/60 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold">{activeThread.leadName}</h3>
              <p className="text-xs text-muted-foreground">{activeThread.leadRole} at <span className="font-semibold text-slate-800 dark:text-slate-200">{activeThread.companyName}</span></p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs border-border/80 flex items-center gap-1 font-semibold text-muted-foreground">
                <Clock className="h-3 w-3" /> Received 11:42 PM
              </Badge>
            </div>
          </div>

          {/* Email History Threads scroll */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/30 dark:bg-slate-950/20">
            {activeThread.history.map((msg, i) => (
              <div 
                key={i} 
                className={`p-4 rounded-xl border max-w-[85%] space-y-2 ${
                  msg.sender === 'agent'
                    ? 'ml-auto bg-card border-border/80'
                    : 'mr-auto bg-slate-100/50 dark:bg-slate-900/50 border-border/50'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-bold uppercase text-muted-foreground pb-1.5 border-b border-border/30">
                  <span>{msg.sender === 'agent' ? `Sent via Agent ${activeThread.agentName}` : activeThread.leadName}</span>
                  <span>{msg.date}</span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                  {msg.body}
                </p>
              </div>
            ))}
          </div>

          {/* Draft Suggested Box */}
          <div className="p-4 border-t border-border/60 bg-slate-50 dark:bg-[#0c0e18] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-5.5 w-5.5 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  AI Suggested Reply <span className="text-[10px] font-semibold text-muted-foreground lowercase">drafted by Agent {activeThread.agentName}</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Tooltip content="Rate this AI draft">
                  <button className="p-1 rounded text-muted-foreground hover:bg-accent hover:text-foreground"><ThumbsUp className="h-3.5 w-3.5" /></button>
                </Tooltip>
                <button className="p-1 rounded text-muted-foreground hover:bg-accent hover:text-foreground"><ThumbsDown className="h-3.5 w-3.5" /></button>
              </div>
            </div>

            {/* Editable draft area */}
            <div className="relative">
              <textarea
                value={activeThread.suggestedDraft}
                onChange={(e) => handleUpdateDraft(e.target.value)}
                rows={6}
                disabled={isRegenerating || isSending}
                className="w-full rounded-xl border border-border/80 bg-card p-4 text-xs font-mono text-slate-800 dark:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none leading-relaxed shadow-inner"
              />
              <AnimatePresence>
                {isRegenerating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-card/75 dark:bg-card/90 flex flex-col items-center justify-center rounded-xl backdrop-blur-xs border border-border"
                  >
                    <RefreshCw className="h-6 w-6 text-indigo-500 animate-spin" />
                    <span className="text-[11px] font-bold text-indigo-500 mt-2 tracking-wide uppercase">AI Agent Drafting...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Instructions box for AI re-drafting */}
            <form onSubmit={handlePromptSubmit} className="flex gap-2">
              <Input
                placeholder="Instruct the AI agent to edit (e.g. 'make it shorter', 'mention Tuesday pricing')..."
                value={draftPrompt}
                onChange={(e) => setDraftPrompt(e.target.value)}
                disabled={isRegenerating || isSending}
                className="h-9.5 text-xs bg-card border-border/80 focus:bg-card"
                icon={<CornerUpLeft className="h-3.5 w-3.5 text-slate-400 rotate-180" />}
              />
              <Button 
                type="submit" 
                variant="outline" 
                size="sm" 
                className="h-9.5 font-bold text-xs" 
                disabled={!draftPrompt.trim() || isRegenerating || isSending}
              >
                Apply
              </Button>
            </form>

            {/* Action approvals */}
            <div className="flex justify-between items-center pt-2 border-t border-border/40">
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                Pause Outreach Sequence
              </Button>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsRegenerating(true)} 
                  disabled={isRegenerating || isSending}
                  className="font-semibold text-xs h-9"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1" /> Re-draft
                </Button>
                <Button 
                  variant="gradient" 
                  size="sm" 
                  onClick={handleSendDraft}
                  disabled={isRegenerating || isSending}
                  isLoading={isSending}
                  className="font-bold text-xs h-9 flex items-center gap-1.5 shadow-md shadow-indigo-500/10"
                >
                  <SendHorizontal className="h-3.5 w-3.5" /> Approve & Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-card text-center p-6">
          <CheckCircle className="h-10 w-10 text-emerald-500 mb-2.5 animate-bounce" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">All Clear</h3>
          <p className="text-xs text-muted-foreground max-w-sm mt-1">Select another sentiment bucket in the menu or check back later for incoming replies.</p>
        </div>
      )}
    </div>
  );
};

export default CoPilot;
