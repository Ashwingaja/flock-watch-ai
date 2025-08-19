import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { AlertTriangle, Shield, Target, TrendingUp, Eye, Brain, Activity } from "lucide-react";

interface HealthRisk {
  id: string;
  chickenId: string;
  riskLevel: "normal" | "watch" | "critical";
  confidence: number;
  symptoms: string[];
  lastUpdated: string;
  zone: string;
  recommendation: string;
}

export const HealthRiskClassifier = () => {
  const healthRisks: HealthRisk[] = [
    {
      id: "HR001",
      chickenId: "CH003",
      riskLevel: "critical",
      confidence: 94.2,
      symptoms: ["Reduced movement", "Wing drooping", "Isolation"],
      lastUpdated: "2 mins ago",
      zone: "Barn A-2",
      recommendation: "Immediate veterinary examination required"
    },
    {
      id: "HR002", 
      chickenId: "CH007",
      riskLevel: "watch",
      confidence: 76.8,
      symptoms: ["Reduced movement", "Abnormal posture"],
      lastUpdated: "5 mins ago",
      zone: "Barn A-2",
      recommendation: "Monitor closely for 24 hours"
    },
    {
      id: "HR003",
      chickenId: "CH004",
      riskLevel: "watch",
      confidence: 68.3,
      symptoms: ["Isolation tendency"],
      lastUpdated: "8 mins ago", 
      zone: "Barn A-1",
      recommendation: "Continue observation, check feed intake"
    }
  ];

  const riskDistribution = [
    { name: "Normal", value: 230, color: "#22c55e" },
    { name: "Watch List", value: 12, color: "#eab308" },
    { name: "Critical", value: 3, color: "#ef4444" }
  ];

  const riskTrendData = [
    { time: "Mon", normal: 240, watch: 5, critical: 0 },
    { time: "Tue", normal: 238, watch: 6, critical: 1 },
    { time: "Wed", normal: 235, watch: 8, critical: 2 },
    { time: "Thu", normal: 232, watch: 10, critical: 3 },
    { time: "Fri", normal: 230, watch: 12, critical: 3 },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical": return "text-red-600 bg-red-100 border-red-200";
      case "watch": return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "normal": return "text-green-600 bg-green-100 border-green-200";
      default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "critical": return AlertTriangle;
      case "watch": return Eye;
      case "normal": return Shield;
      default: return Activity;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Birds</p>
                <p className="text-2xl font-bold">245</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Healthy</p>
                <p className="text-2xl font-bold text-green-600">230</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Watch List</p>
                <p className="text-2xl font-bold text-yellow-600">12</p>
              </div>
              <Eye className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts */}
      {healthRisks.filter(risk => risk.riskLevel === "critical").length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Critical Health Alerts - Immediate Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {healthRisks.filter(risk => risk.riskLevel === "critical").map((risk) => (
                <Alert key={risk.id} className="border-red-300">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">Bird {risk.chickenId} - {risk.zone}</div>
                        <div className="text-sm text-muted-foreground">
                          Symptoms: {risk.symptoms.join(", ")}
                        </div>
                        <div className="text-sm font-medium text-red-700 mt-1">
                          {risk.recommendation}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{risk.confidence}% confidence</div>
                        <div className="text-xs text-muted-foreground">{risk.lastUpdated}</div>
                        <Button size="sm" className="mt-2" variant="destructive">
                          Take Action
                        </Button>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Health Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Health Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Trend (5 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="normal" stackId="1" stroke="#22c55e" fill="#22c55e" />
                  <Area type="monotone" dataKey="watch" stackId="1" stroke="#eab308" fill="#eab308" />
                  <Area type="monotone" dataKey="critical" stackId="1" stroke="#ef4444" fill="#ef4444" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Health Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthRisks.map((risk) => {
              const RiskIcon = getRiskIcon(risk.riskLevel);
              return (
                <div key={risk.id} className={`p-4 border rounded-lg ${getRiskColor(risk.riskLevel)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <RiskIcon className="h-5 w-5" />
                      <div>
                        <div className="font-semibold">Bird {risk.chickenId}</div>
                        <div className="text-sm opacity-80">{risk.zone} • {risk.lastUpdated}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className={getRiskColor(risk.riskLevel)}>
                      {risk.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div>
                      <div className="text-sm font-medium">Detected Symptoms:</div>
                      <div className="text-sm opacity-80">{risk.symptoms.join(", ")}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium">Recommendation:</div>
                      <div className="text-sm opacity-80">{risk.recommendation}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">AI Confidence:</div>
                      <Progress value={risk.confidence} className="h-2" />
                      <div className="text-xs opacity-80 mt-1">{risk.confidence}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            CNN+LSTM Model Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Classification Accuracy</span>
                <span className="text-sm text-muted-foreground">92.4%</span>
              </div>
              <Progress value={92.4} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Temporal Pattern Detection</span>
                <span className="text-sm text-muted-foreground">89.7%</span>
              </div>
              <Progress value={89.7} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">False Positive Rate</span>
                <span className="text-sm text-muted-foreground">3.2%</span>
              </div>
              <Progress value={3.2} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};