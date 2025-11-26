import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import InteractionModal from "@/components/InteractionModal";
import { 
  User, 
  Calendar, 
  Pill, 
  AlertCircle, 
  TrendingUp, 
  FileText, 
  Activity,
  Shield,
  Clock,
  BarChart3,
  Search,
  Filter,
  CalendarIcon
} from "lucide-react";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [interactionModalOpen, setInteractionModalOpen] = useState(false);
  const [selectedInteraction, setSelectedInteraction] = useState<any>(null);

  const interactionDetails = {
    drug1: "Ibuprofen",
    drug2: "Lisinopril",
    severity: "warning" as const,
    description: "Ibuprofen and other NSAIDs may reduce the antihypertensive effect of ACE inhibitors like Lisinopril. This interaction can result in decreased blood pressure control and potentially increase the risk of renal dysfunction.",
    mechanism: "NSAIDs inhibit prostaglandin synthesis, which can counteract the vasodilatory and natriuretic effects of ACE inhibitors. This leads to sodium and water retention, potentially elevating blood pressure and reducing the effectiveness of antihypertensive therapy.",
    clinicalEvidence: "Multiple clinical studies have demonstrated that concurrent use of NSAIDs with ACE inhibitors can result in a significant reduction in antihypertensive efficacy. A meta-analysis of 23 studies showed that NSAIDs increased systolic blood pressure by an average of 3-5 mmHg in patients taking ACE inhibitors. Additionally, combination therapy has been associated with increased risk of acute kidney injury, particularly in elderly patients or those with pre-existing renal impairment.",
    recommendations: [
      "Monitor blood pressure closely, especially during the first few weeks of concurrent therapy or after dose adjustments",
      "Assess renal function (serum creatinine and potassium) at baseline and periodically during treatment",
      "Consider using the lowest effective dose of NSAID for the shortest duration possible",
      "Evaluate the need for NSAID therapy and consider alternative analgesics such as acetaminophen",
      "Counsel patients to avoid over-the-counter NSAIDs without consulting healthcare provider",
      "Consider increasing the dose of ACE inhibitor if blood pressure control is inadequate"
    ],
    alternatives: [
      {
        name: "Acetaminophen (Paracetamol)",
        reason: "First-line alternative for pain management. Does not significantly affect blood pressure or interact with ACE inhibitors. Recommended dose: 325-650mg every 4-6 hours, maximum 3000mg/day."
      },
      {
        name: "Topical NSAIDs (e.g., Diclofenac gel)",
        reason: "Provides localized pain relief with minimal systemic absorption, reducing the risk of cardiovascular and renal interactions. Suitable for localized musculoskeletal pain."
      },
      {
        name: "COX-2 Selective Inhibitors (e.g., Celecoxib)",
        reason: "May have a lower impact on blood pressure compared to non-selective NSAIDs, though monitoring is still required. Consider if NSAID therapy is essential and other alternatives are ineffective."
      }
    ],
    references: [
      {
        title: "Effects of NSAIDs on blood pressure in hypertensive patients treated with ACE inhibitors",
        source: "Journal of Clinical Hypertension, 2019;21(8):1145-1153"
      },
      {
        title: "Interaction between NSAIDs and ACE inhibitors: Risk of acute kidney injury",
        source: "American Journal of Kidney Diseases, 2020;75(2):213-222"
      },
      {
        title: "Clinical guidelines for managing drug interactions in cardiovascular disease",
        source: "European Heart Journal, 2021;42(15):1475-1487"
      }
    ],
    detectedDate: "2024-01-15"
  };

  const handleViewInteraction = () => {
    setSelectedInteraction(interactionDetails);
    setInteractionModalOpen(true);
  };

  const patientData = {
    name: "Sarah Johnson",
    id: "PT-2024-1847",
    age: 58,
    lastVisit: "2024-01-15",
    conditions: ["Hypertension", "Type 2 Diabetes", "Osteoarthritis"],
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", status: "active", startDate: "2023-06-15" },
      { name: "Metformin", dosage: "1000mg", frequency: "Twice daily", status: "active", startDate: "2023-03-10" },
      { name: "Ibuprofen", dosage: "400mg", frequency: "As needed", status: "warning", startDate: "2024-01-01" },
      { name: "Aspirin", dosage: "81mg", frequency: "Once daily", status: "active", startDate: "2023-06-15" },
    ],
  };

  const stats = [
    { label: "Active Medications", value: "4", icon: Pill, trend: "+1 this month" },
    { label: "Interaction Alerts", value: "1", icon: AlertCircle, trend: "High priority", color: "warning" },
    { label: "Adherence Rate", value: "94%", icon: TrendingUp, trend: "+2% vs last month" },
    { label: "Days Since Review", value: "30", icon: Clock, trend: "Review due soon" },
  ];

  const interactionData = [
    { severity: "Critical", count: 0, fill: "hsl(var(--destructive))" },
    { severity: "Warning", count: 1, fill: "hsl(var(--warning))" },
    { severity: "Minor", count: 2, fill: "hsl(var(--info))" },
    { severity: "Safe", count: 1, fill: "hsl(var(--success))" },
  ];

  const adherenceData = [
    { day: "Mon", rate: 100 },
    { day: "Tue", rate: 100 },
    { day: "Wed", rate: 75 },
    { day: "Thu", rate: 100 },
    { day: "Fri", rate: 100 },
    { day: "Sat", rate: 100 },
    { day: "Sun", rate: 100 },
  ];

  const filteredMedications = useMemo(() => {
    return patientData.medications.filter((med) => {
      // Search filter
      const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.dosage.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = statusFilter === "all" || med.status === statusFilter;
      
      // Date range filter
      const medDate = new Date(med.startDate);
      const matchesDateFrom = !dateFrom || medDate >= dateFrom;
      const matchesDateTo = !dateTo || medDate <= dateTo;
      
      return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
    });
  }, [searchTerm, statusFilter, dateFrom, dateTo, patientData.medications]);

  const activeFiltersCount = [
    statusFilter !== "all",
    conditionFilter !== "all",
    dateFrom,
    dateTo,
    searchTerm
  ].filter(Boolean).length;

  return (
    <section className="bg-gradient-to-b from-muted/30 to-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <InteractionModal
            open={interactionModalOpen}
            onOpenChange={setInteractionModalOpen}
            interaction={selectedInteraction}
          />
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground lg:text-4xl mb-2">
                  Patient Dashboard
                </h2>
                <p className="text-muted-foreground">
                  Real-time medication monitoring and interaction analysis
                </p>
              </div>
              <Button className="gap-2">
                <FileText className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Patient Info Bar */}
          <Card className="mb-6 border-l-4 border-l-primary">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{patientData.name}</h3>
                  <p className="text-sm text-muted-foreground">{patientData.id}</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="text-lg font-semibold text-foreground">{patientData.age}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Last Visit</p>
                  <p className="text-lg font-semibold text-foreground">{patientData.lastVisit}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Conditions</p>
                  <p className="text-lg font-semibold text-foreground">{patientData.conditions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${stat.color || 'primary'}/10`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color || 'primary'}`} />
                    </div>
                    {stat.color === 'warning' && (
                      <Badge variant="outline" className="border-warning text-warning">Alert</Badge>
                    )}
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-xs text-muted-foreground">{stat.trend}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid gap-6 mb-6 lg:grid-cols-2">
            {/* Adherence Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Weekly Adherence Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    rate: {
                      label: "Adherence",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={adherenceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Interaction Severity Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Interaction Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {interactionData.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 rounded-lg border border-border p-4">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                      <div>
                        <p className="text-2xl font-bold text-foreground">{item.count}</p>
                        <p className="text-sm text-muted-foreground">{item.severity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Medications Table */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-primary" />
                  Active Medications
                </CardTitle>
                <Badge variant="secondary">{filteredMedications.length} of {patientData.medications.length}</Badge>
              </div>

              {/* Filters */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  <span>Filter medications</span>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount} active
                    </Badge>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search medications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  {/* Status Filter */}
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Date From */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !dateFrom && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "PPP") : "Start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>

                  {/* Date To */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !dateTo && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, "PPP") : "End date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setConditionFilter("all");
                      setDateFrom(undefined);
                      setDateTo(undefined);
                    }}
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMedications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No medications found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMedications.map((med, index) => (
                    <TableRow key={index} className={med.status === "warning" ? "bg-warning/5" : ""}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {med.name}
                          {med.status === "warning" && (
                            <button
                              onClick={handleViewInteraction}
                              className="inline-flex items-center hover:opacity-80 transition-opacity"
                            >
                              <AlertCircle className="h-4 w-4 text-warning" />
                            </button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{med.dosage}</TableCell>
                      <TableCell>{med.frequency}</TableCell>
                      <TableCell>{med.startDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={med.status === "warning" ? "outline" : "secondary"}
                          className={med.status === "warning" ? "border-warning text-warning" : ""}
                        >
                          {med.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Critical Alert */}
          <Card className="border-l-4 border-l-warning bg-warning/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/20">
                  <AlertCircle className="h-5 w-5 text-warning" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">Drug Interaction Warning</h4>
                  <p className="text-sm text-foreground mb-2">
                    Potential interaction detected: Ibuprofen may reduce the effectiveness of Lisinopril and increase blood pressure.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Clock className="h-3 w-3" />
                    Detected on 2024-01-15
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="default" onClick={handleViewInteraction}>
                      Review Interaction
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleViewInteraction}>
                      Suggest Alternative
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
