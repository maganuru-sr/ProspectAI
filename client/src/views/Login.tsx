import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Mail, Lock, Sparkles, AlertCircle, ShieldCheck, MailCheck, TrendingUp } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginProps {
  onToggleAuthMode: () => void;
}

const testimonials = [
  {
    quote: "ProspectAI automated our entire cold outreach stack. Our booking rate grew by 240% in just two months.",
    author: "Elena Rostova",
    role: "VP Growth, TechScale Inc.",
    stat: "+240% Booking Rate"
  },
  {
    quote: "The AI agent drafts represent our brand perfectly. It's like having an army of highly skilled SDRs running on auto-pilot.",
    author: "Marcus Vance",
    role: "Head of Sales, CloudSaaS",
    stat: "14.5% Response Rate"
  }
];

const Login: React.FC<LoginProps> = ({ onToggleAuthMode }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid work email.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#090d16] overflow-hidden">
      {/* Left side Form Panel */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 relative">
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-extrabold text-md tracking-tight">
            Prospect<span className="text-indigo-500 font-black">AI</span>
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-sm"
        >
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pb-6">
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Welcome back
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1">
                Enter your work credentials to access your outbound loops.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2.5">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Work Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail className="h-4 w-4" />}
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    <a href="#forgot" className="text-xs font-medium text-indigo-500 hover:text-indigo-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock className="h-4 w-4" />}
                    disabled={isLoading}
                    required
                  />
                </div>

                <Button type="submit" className="w-full font-semibold" isLoading={isLoading}>
                  Sign in
                </Button>
              </form>

              {/* SSO Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-50 dark:bg-[#090d16] px-2.5 text-muted-foreground font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* SSO Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => login('google.admin@company.com', 'google')}
                  disabled={isLoading}
                  className="font-medium h-9.5 text-xs"
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => login('microsoft.partner@company.com', 'microsoft')}
                  disabled={isLoading}
                  className="font-medium h-9.5 text-xs"
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 23 23" fill="currentColor">
                    <rect x="0" y="0" width="11" height="11" fill="#f25022"/>
                    <rect x="12" y="0" width="11" height="11" fill="#7fba00"/>
                    <rect x="0" y="12" width="11" height="11" fill="#00a4ef"/>
                    <rect x="12" y="12" width="11" height="11" fill="#ffb900"/>
                  </svg>
                  Microsoft
                </Button>
              </div>

              {/* Redirect to Sign Up */}
              <div className="mt-8 text-center text-xs">
                <span className="text-muted-foreground">Don't have an account? </span>
                <button
                  onClick={onToggleAuthMode}
                  className="font-bold text-indigo-500 hover:text-indigo-600 hover:underline"
                >
                  Create workspace
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Right side Showcase Panel */}
      <div className="hidden lg:flex w-[55%] bg-gradient-to-tr from-slate-900 via-indigo-950 to-violet-900 items-center justify-center p-12 relative">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(167,139,250,0.1),transparent_50%)]" />
        
        {/* Gridded overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="w-full max-w-md space-y-8 z-10">
          {/* Glassmorphic Metrics Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-6 border border-white/5 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient lighting effect */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl animate-pulse-glow" />

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-6.5 w-6.5 rounded bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <MailCheck className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-200 tracking-wide uppercase">AI Agent Sequence Output</span>
              </div>
              <Badge variant="success" className="text-[10px] py-0 px-2 h-4.5 bg-emerald-500/20 border-emerald-500/30 text-emerald-400 font-bold">
                Auto-optimized
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-slate-950/40 rounded-lg border border-white/5 space-y-1">
                <div className="flex justify-between text-[10px] text-indigo-400 font-semibold uppercase">
                  <span>To: VP Innovation</span>
                  <span>Sent by Agent Max</span>
                </div>
                <p className="text-xs text-slate-300 font-mono italic truncate">
                  "Hi Sarah, noticed TechScale's sales efficiency has..."
                </p>
              </div>

              {/* Conversion Statistics grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-white/3 border border-white/5 text-center">
                  <span className="block text-[10px] text-slate-400 font-medium">Deliverability</span>
                  <span className="block text-sm font-bold text-white mt-0.5">99.4%</span>
                </div>
                <div className="p-3 rounded-lg bg-white/3 border border-white/5 text-center">
                  <span className="block text-[10px] text-slate-400 font-medium">Avg Open Rate</span>
                  <span className="block text-sm font-bold text-white mt-0.5">62.8%</span>
                </div>
                <div className="p-3 rounded-lg bg-white/3 border border-white/5 text-center">
                  <span className="block text-[10px] text-slate-400 font-medium">Meetings</span>
                  <span className="block text-sm font-bold text-indigo-400 mt-0.5">+142%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial slider / carousel */}
          <div className="h-32 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 space-y-4 text-left"
              >
                <p className="text-slate-300 text-sm font-medium leading-relaxed italic">
                  "{testimonials[testimonialIndex].quote}"
                </p>
                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <div>
                    <h4 className="text-white text-xs font-bold">{testimonials[testimonialIndex].author}</h4>
                    <p className="text-slate-400 text-[10px] font-medium">{testimonials[testimonialIndex].role}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {testimonials[testimonialIndex].stat}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Info */}
        <div className="absolute bottom-8 right-8 flex items-center gap-1 text-[10px] font-semibold text-slate-400">
          <ShieldCheck className="h-4.5 w-4.5 text-indigo-500" />
          <span>ISO 27001 Certified • SOC 2 Type II Compliant</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
