import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";

const DrugChecker = () => {
  const [drugs, setDrugs] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showResults, setShowResults] = useState(false);

  const mockInteractions = [
    {
      severity: "critical",
      drug1: "Warfarin",
      drug2: "Aspirin",
      description: "Increased risk of bleeding. Monitor INR closely and consider alternative antiplatelet therapy.",
      recommendation: "Avoid combination or reduce aspirin dose to ≤100mg daily",
    },
    {
      severity: "warning",
      drug1: "Lisinopril",
      drug2: "Ibuprofen",
      description: "NSAIDs may reduce the antihypertensive effect and increase risk of renal impairment.",
      recommendation: "Monitor blood pressure and renal function. Consider acetaminophen as alternative.",
    },
  ];

  const handleAddDrug = () => {
    if (inputValue.trim()) {
      setDrugs([...drugs, inputValue.trim()]);
      setInputValue("");
      if (drugs.length >= 1) {
        setShowResults(true);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddDrug();
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "critical":
        return {
          icon: XCircle,
          badge: "bg-destructive text-destructive-foreground",
          border: "border-destructive/30",
          bg: "bg-destructive/5",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          badge: "bg-warning text-warning-foreground",
          border: "border-warning/30",
          bg: "bg-warning/5",
        };
      default:
        return {
          icon: Info,
          badge: "bg-info text-info-foreground",
          border: "border-info/30",
          bg: "bg-info/5",
        };
    }
  };

  return (
    <section id="drug-checker" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              Real-Time Drug Interaction Checker
            </h2>
            <p className="text-lg text-muted-foreground">
              Enter medications to instantly identify potential interactions and receive clinical recommendations
            </p>
          </div>

          <Card className="p-6 lg:p-8">
            <div className="mb-6 flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Enter drug name (e.g., Warfarin, Aspirin)"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleAddDrug}>Add Drug</Button>
            </div>

            {drugs.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {drugs.map((drug, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                    {drug}
                    <button
                      onClick={() => setDrugs(drugs.filter((_, i) => i !== index))}
                      className="ml-2 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {!showResults && drugs.length === 0 && (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">Add medications to check for interactions</p>
              </div>
            )}

            {showResults && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-border pb-4">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="font-semibold text-foreground">Interaction Analysis Complete</span>
                </div>

                {mockInteractions.map((interaction, index) => {
                  const styles = getSeverityStyles(interaction.severity);
                  const Icon = styles.icon;

                  return (
                    <Card
                      key={index}
                      className={`border-l-4 ${styles.border} ${styles.bg} p-5`}
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5" />
                          <span className="font-semibold text-foreground">
                            {interaction.drug1} + {interaction.drug2}
                          </span>
                        </div>
                        <Badge className={styles.badge}>
                          {interaction.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="mb-3 text-sm text-foreground">{interaction.description}</p>
                      <div className="rounded-md bg-card p-3">
                        <p className="text-xs font-medium text-muted-foreground">
                          Clinical Recommendation:
                        </p>
                        <p className="text-sm text-foreground">{interaction.recommendation}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DrugChecker;
