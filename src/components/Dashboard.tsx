import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Calendar, Pill, AlertCircle, TrendingUp, FileText } from "lucide-react";

const Dashboard = () => {
  const patientData = {
    name: "Sarah Johnson",
    id: "PT-2024-1847",
    age: 58,
    conditions: ["Hypertension", "Type 2 Diabetes", "Osteoarthritis"],
    medications: [
      { name: "Lisinopril 10mg", frequency: "Once daily", status: "active" },
      { name: "Metformin 1000mg", frequency: "Twice daily", status: "active" },
      { name: "Ibuprofen 400mg", frequency: "As needed", status: "warning" },
      { name: "Aspirin 81mg", frequency: "Once daily", status: "active" },
    ],
    alerts: [
      {
        type: "warning",
        message: "Potential interaction: Ibuprofen may reduce Lisinopril effectiveness",
        date: "2024-01-15",
      },
      {
        type: "info",
        message: "Medication review due in 30 days",
        date: "2024-01-10",
      },
    ],
  };

  return (
    <section className="bg-muted/50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              Patient Profile & Medication Dashboard
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive medication history and real-time alerts at a glance
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Patient Info Card */}
            <Card className="lg:col-span-1 p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{patientData.name}</h3>
                    <p className="text-sm text-muted-foreground">{patientData.id}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Age:</span>
                  <span className="font-medium text-foreground">{patientData.age}</span>
                </div>
                
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Conditions:</p>
                  <div className="flex flex-wrap gap-2">
                    {patientData.conditions.map((condition, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Button className="mt-6 w-full" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View Full History
              </Button>
            </Card>

            {/* Medications List */}
            <Card className="lg:col-span-2 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Active Medications</h3>
                </div>
                <Badge variant="secondary">{patientData.medications.length} drugs</Badge>
              </div>

              <div className="space-y-3">
                {patientData.medications.map((med, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                      med.status === "warning" ? "border-warning/30 bg-warning/5" : "border-border bg-card"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <p className="font-medium text-foreground">{med.name}</p>
                        {med.status === "warning" && (
                          <AlertCircle className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{med.frequency}</p>
                    </div>
                    <Badge
                      variant={med.status === "warning" ? "outline" : "secondary"}
                      className={med.status === "warning" ? "border-warning text-warning" : ""}
                    >
                      {med.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Alerts Section */}
          <Card className="mt-6 p-6">
            <div className="mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <h3 className="font-semibold text-foreground">Recent Alerts</h3>
            </div>

            <div className="space-y-3">
              {patientData.alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 rounded-lg border p-4 ${
                    alert.type === "warning"
                      ? "border-warning/30 bg-warning/5"
                      : "border-info/30 bg-info/5"
                  }`}
                >
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{alert.date}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
