import { Card } from "@/components/ui/card";
import { Shield, Zap, Database, Bell, Users, BarChart3 } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "99.8% Detection Accuracy",
      description: "Advanced AI algorithms trained on extensive pharmaceutical databases for reliable interaction detection.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Zap,
      title: "Real-Time Analysis",
      description: "Instant feedback within 2.5 seconds. No waiting - get immediate alerts during prescription workflow.",
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: Database,
      title: "Comprehensive Database",
      description: "Access to 10,000+ drug profiles with constantly updated interaction data from clinical sources.",
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      icon: Bell,
      title: "Smart Alert System",
      description: "Severity-based notifications with clinical recommendations and alternative therapy suggestions.",
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      icon: Users,
      title: "Multi-User Support",
      description: "Designed for pharmacists, physicians, and healthcare teams with role-based access controls.",
      color: "text-info",
      bg: "bg-info/10",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track medication safety metrics, error prevention rates, and workflow efficiency improvements.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              Why Healthcare Professionals Trust Our System
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed to reduce errors and support clinical decisions
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group p-6 transition-all hover:shadow-md">
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bg}`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
