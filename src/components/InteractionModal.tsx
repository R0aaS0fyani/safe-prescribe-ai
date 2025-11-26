import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  Pill,
  FileText,
  ArrowRight,
  ExternalLink,
  Clock,
} from "lucide-react";

interface InteractionDetails {
  drug1: string;
  drug2: string;
  severity: "critical" | "warning" | "minor";
  description: string;
  mechanism: string;
  clinicalEvidence: string;
  recommendations: string[];
  alternatives: Array<{
    name: string;
    reason: string;
  }>;
  references: Array<{
    title: string;
    source: string;
  }>;
  detectedDate: string;
}

interface InteractionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  interaction: InteractionDetails | null;
}

const InteractionModal = ({ open, onOpenChange, interaction }: InteractionModalProps) => {
  if (!interaction) return null;

  const severityConfig = {
    critical: {
      icon: AlertCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive",
      label: "Critical Interaction",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning",
      label: "Warning",
    },
    minor: {
      icon: Info,
      color: "text-info",
      bgColor: "bg-info/10",
      borderColor: "border-info",
      label: "Minor Interaction",
    },
  };

  const config = severityConfig[interaction.severity];
  const SeverityIcon = config.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className={`flex items-center gap-3 p-4 rounded-lg ${config.bgColor} border ${config.borderColor} mb-4`}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${config.bgColor}`}>
              <SeverityIcon className={`h-5 w-5 ${config.color}`} />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl mb-1">{config.label}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 text-base">
                <span className="font-medium">{interaction.drug1}</span>
                <ArrowRight className="h-4 w-4" />
                <span className="font-medium">{interaction.drug2}</span>
              </DialogDescription>
            </div>
            <Badge variant="outline" className={`${config.borderColor} ${config.color}`}>
              {interaction.severity.toUpperCase()}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Interaction Overview
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {interaction.description}
            </p>
          </div>

          <Separator />

          {/* Mechanism */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Mechanism of Interaction
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {interaction.mechanism}
            </p>
          </div>

          <Separator />

          {/* Clinical Evidence */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Clinical Evidence
            </h3>
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <p className="text-muted-foreground leading-relaxed">
                  {interaction.clinicalEvidence}
                </p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Recommendations */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Clinical Recommendations
            </h3>
            <ul className="space-y-2">
              {interaction.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium mt-0.5">
                    {index + 1}
                  </div>
                  <span className="flex-1">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Alternative Medications */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Pill className="h-5 w-5 text-primary" />
              Suggested Alternatives
            </h3>
            <div className="grid gap-3">
              {interaction.alternatives.map((alt, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{alt.name}</h4>
                        <p className="text-sm text-muted-foreground">{alt.reason}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* References */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-primary" />
              Clinical References
            </h3>
            <div className="space-y-2">
              {interaction.references.map((ref, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-start gap-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                >
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {ref.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{ref.source}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Detection Info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border">
            <Clock className="h-4 w-4" />
            <span>Detected on {interaction.detectedDate}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button className="flex-1" size="lg">
              Add to Patient Notes
            </Button>
            <Button variant="outline" className="flex-1" size="lg">
              Print Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InteractionModal;
