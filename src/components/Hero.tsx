import { Button } from "@/components/ui/button";
import { Shield, Activity, AlertTriangle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Clinical Decision Support
            </div>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
            AI-Powered Drug Interaction
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Alert System
            </span>
          </h1>
          
          <p className="mb-10 text-lg text-muted-foreground lg:text-xl">
            Reduce medical errors with real-time drug interaction alerts. 
            Support clinical decisions and improve workflow efficiency for pharmacists, 
            healthcare administrators, and patients.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={() => {
                document.getElementById('drug-checker')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <Activity className="mr-2 h-5 w-5" />
              Try Drug Checker
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={() => {
                document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              View Dashboard Demo
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-2 text-3xl font-bold text-primary">99.8%</div>
              <div className="text-sm text-muted-foreground">Detection Accuracy</div>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-2 text-3xl font-bold text-secondary">45%</div>
              <div className="text-sm text-muted-foreground">Error Reduction</div>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-2 text-3xl font-bold text-accent">2.5s</div>
              <div className="text-sm text-muted-foreground">Average Check Time</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-accent/5 blur-3xl"></div>
    </section>
  );
};

export default Hero;
