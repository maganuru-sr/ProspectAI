import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Building,
  Target,
  CheckCircle2,
  Plug
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SignupProps {
  onToggleAuthMode: () => void;
}

const Signup: React.FC<SignupProps> = ({ onToggleAuthMode }) => {
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState('');
  const [password, setPassword] = useState('');
  
  // Onboarding settings
  const [industry, setIndustry] = useState('technology');
  const [targetTitle, setTargetTitle] = useState('VP Sales, Head of Marketing');
  const [companySize, setCompanySize] = useState('11-50');

  // Integrations states
  const [integrations, setIntegrations] = useState({
    hubspot: false,
    salesforce: false,
    google: false,
  });

  const handleNextStep = () => {
    if (step === 1) {
      if (!name || !email || !orgName || !password) {
        setError('Please fill in all fields to register.');
        return;
      }
      if (!email.includes('@')) {
        setError('Please enter a valid work email.');
        return;
      }
    }
    setError(null);
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setError(null);
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await signup(name, email, orgName, password);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleIntegration = (key: 'hubspot' | 'salesforce' | 'google') => {
    setIntegrations((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090d16] p-4 sm:p-6 lg:p-12 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating brand header */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="font-extrabold text-md tracking-tight">
          Prospect<span className="text-indigo-500 font-black">AI</span>
        </span>
      </div>

      <div className="w-full max-w-xl z-10">
        {/* Step indicator bar */}
        <div className="mb-6 flex justify-between items-center px-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                step >= s 
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/10' 
                  : 'bg-slate-200 dark:bg-slate-800 text-muted-foreground'
              }`}>
                {s}
              </div>
              <span className={`hidden sm:inline text-xs font-semibold ${
                step === s ? 'text-slate-900 dark:text-slate-100' : 'text-muted-foreground'
              }`}>
                {s === 1 ? 'Account' : s === 2 ? 'Targeting' : 'Sync'}
              </span>
              {s < 3 && <div className={`h-[2px] w-8 sm:w-16 ${step > s ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`} />}
            </div>
          ))}
        </div>

        <Card className="border border-border/80 shadow-xl overflow-hidden relative">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold tracking-tight">Create your ProspectAI Workspace</CardTitle>
                  <CardDescription>Get started on autocompiling targeted high-converting outbound sequences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                      {error}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Full Name</label>
                    <Input 
                      placeholder="Jane Doe" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      icon={<User className="h-4 w-4" />}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Company Work Email</label>
                    <Input 
                      placeholder="jane@company.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      icon={<Mail className="h-4 w-4" />}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Company Name</label>
                    <Input 
                      placeholder="Acme Inc." 
                      value={orgName} 
                      onChange={(e) => setOrgName(e.target.value)} 
                      icon={<Building className="h-4 w-4" />}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                    <Input 
                      type="password"
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      icon={<Lock className="h-4 w-4" />}
                    />
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button 
                      onClick={onToggleAuthMode}
                      className="text-xs font-bold text-indigo-500 hover:text-indigo-600 hover:underline"
                    >
                      Already have a workspace?
                    </button>
                    <Button onClick={handleNextStep} className="font-semibold px-5">
                      Next step <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </div>
                </CardContent>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold tracking-tight">Onboarding Target Strategy</CardTitle>
                  <CardDescription>This informs the AI Agent on which titles, company scales, and tone profiles to target.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Focus Industry</label>
                    <div className="relative">
                      <select 
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 text-foreground"
                      >
                        <option value="technology">Technology & SaaS</option>
                        <option value="healthcare">Healthcare & Biotech</option>
                        <option value="finance">Finance & FinTech</option>
                        <option value="logistics">Logistics & Supply Chain</option>
                        <option value="education">EdTech & Education</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Buyer Persona (Job Titles)</label>
                    <Input 
                      placeholder="e.g. VP Sales, Head of IT, Chief Technology Officer" 
                      value={targetTitle} 
                      onChange={(e) => setTargetTitle(e.target.value)} 
                      icon={<Target className="h-4 w-4" />}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Ideal Company Size (Employees)</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['1-10', '11-50', '51-200', '200+'].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setCompanySize(sz)}
                          className={`py-2 px-1 text-xs rounded-lg border font-semibold text-center select-none transition-all duration-150 ${
                            companySize === sz 
                              ? 'border-indigo-500 bg-indigo-500/5 text-indigo-500 dark:text-indigo-400 font-bold' 
                              : 'border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <Button variant="outline" onClick={handlePrevStep} className="font-semibold">
                      <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
                    </Button>
                    <Button onClick={handleNextStep} className="font-semibold px-5">
                      Next step <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </div>
                </CardContent>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold tracking-tight">Connect Workspace Sync</CardTitle>
                  <CardDescription>Select any standard pipeline syncs. You can configure data sync variables in your dashboard settings later.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {/* HubSpot sync option */}
                    <div 
                      onClick={() => toggleIntegration('hubspot')}
                      className={`p-3.5 border rounded-xl flex items-center justify-between cursor-pointer select-none transition-all duration-150 ${
                        integrations.hubspot 
                          ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10' 
                          : 'border-border bg-card hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                          <Plug className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs">HubSpot Integration</h4>
                          <p className="text-[10px] text-muted-foreground">Sync leads, campaigns, and booked deals automatically.</p>
                        </div>
                      </div>
                      <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${
                        integrations.hubspot ? 'bg-primary border-primary text-white' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {integrations.hubspot && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </div>
                    </div>

                    {/* Salesforce sync option */}
                    <div 
                      onClick={() => toggleIntegration('salesforce')}
                      className={`p-3.5 border rounded-xl flex items-center justify-between cursor-pointer select-none transition-all duration-150 ${
                        integrations.salesforce 
                          ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10' 
                          : 'border-border bg-card hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
                          <Plug className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs">Salesforce Sync</h4>
                          <p className="text-[10px] text-muted-foreground">Push AI sequence logs directly to Salesforce Contacts.</p>
                        </div>
                      </div>
                      <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${
                        integrations.salesforce ? 'bg-primary border-primary text-white' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {integrations.salesforce && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </div>
                    </div>

                    {/* Google Workspace sync option */}
                    <div 
                      onClick={() => toggleIntegration('google')}
                      className={`p-3.5 border rounded-xl flex items-center justify-between cursor-pointer select-none transition-all duration-150 ${
                        integrations.google 
                          ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10' 
                          : 'border-border bg-card hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center">
                          <Plug className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs">Google Calendar & Gmail</h4>
                          <p className="text-[10px] text-muted-foreground">Sync workspace calendar to schedule outbound meetings instantly.</p>
                        </div>
                      </div>
                      <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${
                        integrations.google ? 'bg-primary border-primary text-white' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {integrations.google && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <Button variant="outline" onClick={handlePrevStep} className="font-semibold" disabled={isLoading}>
                      <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
                    </Button>
                    <Button onClick={handleSubmit} className="font-semibold px-6" isLoading={isLoading}>
                      Complete setup <CheckCircle2 className="h-4.5 w-4.5 ml-1.5" />
                    </Button>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
