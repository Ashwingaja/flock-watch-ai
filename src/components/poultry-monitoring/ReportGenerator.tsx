import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FileText, Download, TrendingUp, TrendingDown, AlertTriangle, Calendar, Activity } from "lucide-react";
import { format } from "date-fns";

export const ReportGenerator = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedReport, setSelectedReport] = useState("daily");

  const flockHealthTrend = [
    { date: "Mon", healthy: 238, watch: 5, critical: 2, total: 245 },
    { date: "Tue", healthy: 235, watch: 7, critical: 3, total: 245 },
    { date: "Wed", healthy: 232, watch: 10, critical: 3, total: 245 },
    { date: "Thu", healthy: 230, watch: 12, critical: 3, total: 245 },
    { date: "Fri", healthy: 230, watch: 12, critical: 3, total: 245 },
    { date: "Sat", healthy: 233, watch: 9, critical: 3, total: 245 },
    { date: "Sun", healthy: 235, watch: 8, critical: 2, total: 245 },
  ];

  const behaviorPatterns = [
    { behavior: "Normal Activity", count: 210, percentage: 85.7 },
    { behavior: "Reduced Movement", count: 20, percentage: 8.2 },
    { behavior: "Isolation", count: 8, percentage: 3.3 },
    { behavior: "Wing Drooping", count: 5, percentage: 2.0 },
    { behavior: "Abnormal Posture", count: 2, percentage: 0.8 },
  ];

  const outbreakRisk = [
    { zone: "Barn A-1", risk: "Low", score: 15, birds: 85, factors: ["Good ventilation", "Normal behavior"] },
    { zone: "Barn A-2", risk: "Medium", score: 45, birds: 78, factors: ["3 sick birds", "Slight temp increase"] },
    { zone: "Barn B-1", risk: "Low", score: 22, birds: 67, factors: ["Stable environment", "Good feed intake"] },
    { zone: "Outdoor-1", risk: "Low", score: 8, birds: 15, factors: ["Open air", "Active movement"] },
  ];

  const performanceMetrics = {
    detectionAccuracy: 96.4,
    falsePositiveRate: 3.2,
    responseTime: 2.3,
    systemUptime: 99.8,
    birdsCovered: 245,
    zonesMonitored: 4
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High": return "text-red-600 bg-red-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const generateReport = () => {
    // Simulate report generation
    console.log(`Generating ${selectedReport} report for ${selectedPeriod}`);
  };

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Report Generator
            </CardTitle>
            <div className="flex items-center gap-3">
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Summary</SelectItem>
                  <SelectItem value="weekly">Weekly Report</SelectItem>
                  <SelectItem value="monthly">Monthly Analysis</SelectItem>
                  <SelectItem value="outbreak">Outbreak Risk</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Last Day</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={generateReport}>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Report Tabs */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Health Summary</TabsTrigger>
          <TabsTrigger value="behavior">Behavior Analysis</TabsTrigger>
          <TabsTrigger value="outbreak">Outbreak Risk</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          {/* Health Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Health</p>
                    <p className="text-2xl font-bold text-green-600">95.9%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  +2.1% from last week
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">At Risk Birds</p>
                    <p className="text-2xl font-bold text-yellow-600">15</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  -3 from yesterday
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Detection Rate</p>
                    <p className="text-2xl font-bold text-blue-600">96.4%</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Excellent performance
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Report Date</p>
                    <p className="text-2xl font-bold">{format(new Date(), 'dd')}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {format(new Date(), 'MMM yyyy')}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Health Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Flock Health Trend (7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={flockHealthTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="healthy" stackId="1" stroke="#22c55e" fill="#22c55e" />
                    <Area type="monotone" dataKey="watch" stackId="1" stroke="#eab308" fill="#eab308" />
                    <Area type="monotone" dataKey="critical" stackId="1" stroke="#ef4444" fill="#ef4444" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Behavior Pattern Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={behaviorPatterns}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="behavior" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={behaviorPatterns}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="percentage"
                        label={({ behavior, percentage }) => `${behavior}: ${percentage}%`}
                      >
                        {behaviorPatterns.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Behavior Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Behavior Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {behaviorPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{pattern.behavior}</div>
                      <div className="text-sm text-muted-foreground">{pattern.count} birds affected</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{pattern.percentage}%</div>
                      <div className="text-sm text-muted-foreground">of total flock</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outbreak" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Outbreak Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {outbreakRisk.map((zone, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{zone.zone}</h3>
                        <Badge className={getRiskColor(zone.risk)}>
                          {zone.risk} Risk
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{zone.score}%</div>
                        <div className="text-sm text-muted-foreground">Risk Score</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium">Birds Monitored: {zone.birds}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Key Factors:</div>
                        <ul className="text-sm text-muted-foreground">
                          {zone.factors.map((factor, i) => (
                            <li key={i}>• {factor}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Prediction Model */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Prediction (Next 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { day: "Today", predicted: 25 },
                    { day: "Day 2", predicted: 28 },
                    { day: "Day 3", predicted: 32 },
                    { day: "Day 4", predicted: 30 },
                    { day: "Day 5", predicted: 27 },
                    { day: "Day 6", predicted: 24 },
                    { day: "Day 7", predicted: 22 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="predicted" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{performanceMetrics.detectionAccuracy}%</div>
                  <div className="text-sm font-medium">Detection Accuracy</div>
                  <div className="text-xs text-muted-foreground">AI Model Performance</div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{performanceMetrics.systemUptime}%</div>
                  <div className="text-sm font-medium">System Uptime</div>
                  <div className="text-xs text-muted-foreground">Last 30 days</div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{performanceMetrics.responseTime}m</div>
                  <div className="text-sm font-medium">Avg Response Time</div>
                  <div className="text-xs text-muted-foreground">Alert to Action</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Coverage Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Monitoring Coverage</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Birds Monitored</span>
                      <span className="font-medium">{performanceMetrics.birdsCovered}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Zones</span>
                      <span className="font-medium">{performanceMetrics.zonesMonitored}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>False Positive Rate</span>
                      <span className="font-medium text-green-600">{performanceMetrics.falsePositiveRate}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Agent Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Video Feed Collector</span>
                      <Badge variant="outline" className="text-green-600">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Chicken Tracker</span>
                      <Badge variant="outline" className="text-green-600">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Behavior Analyzer</span>
                      <Badge variant="outline" className="text-green-600">Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Health Risk Classifier</span>
                      <Badge variant="outline" className="text-green-600">Active</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};