import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Building2, HeartPulse, ArrowRight } from "lucide-react";

const UseCases = () => {
  const useCases = [
    {
      icon: Stethoscope,
      title: "For Pharmacists",
      description: "Streamline prescription verification with instant interaction alerts. Reduce dispensing errors and provide better patient counseling with evidence-based recommendations.",
      benefits: ["Faster prescription review", "Reduced liability risks", "Enhanced patient safety"],
      color: "primary",
    },
    {
      icon: Building2,
      title: "For Healthcare Administrators",
      description: "Monitor medication safety metrics across your facility. Track error reduction rates and demonstrate compliance with quality standards and regulatory requirements.",
      benefits: ["System-wide safety monitoring", "Compliance reporting", "Cost-effective solution"],
      color: "accent",
    },
    {
      icon: HeartPulse,
      title: "For Patients",
      description: "Stay informed about your medications. Understand potential interactions and feel confident discussing treatment options with your healthcare providers.",
      benefits: ["Transparent medication info", "Empowered health decisions", "Better outcomes"],
      color: "secondary",
    },
  ];

  return (
    <section className="bg-muted/30 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              Built for Every Healthcare Role
            </h2>
            <p className="text-lg text-muted-foreground">
              Tailored solutions that meet the unique needs of each stakeholder
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <Card key={index} className="flex flex-col p-6 transition-all hover:shadow-lg">
                  <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-${useCase.color}/10`}>
                    <Icon className={`h-7 w-7 text-${useCase.color}`} />
                  </div>
                  
                  <h3 className="mb-3 text-2xl font-semibold text-foreground">
                    {useCase.title}
                  </h3>
                  
                  <p className="mb-4 flex-1 text-muted-foreground">
                    {useCase.description}
                  </p>
                  
                  <div className="mb-6 space-y-2">
                    {useCase.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className={`h-1.5 w-1.5 rounded-full bg-${useCase.color}`}></div>
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="group w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
