import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Brain, AlertTriangle, TrendingDown, Activity, Users, Timer } from "lucide-react";

interface BehaviorPattern {
  id: string;
  behavior: string;
  severity: "low" | "medium" | "high";
  count: number;
  percentage: number;
  description: string;
}

export const BehaviorAnalyzer = () => {
  const behaviorPatterns: BehaviorPattern[] = [
    {
      id: "lethargy",
      behavior: "Reduced Movement",
      severity: "high",
      count: 12,
      percentage: 4.9,
      description: "Birds showing significantly less movement than normal"
    },
    {
      id: "isolation",
      behavior: "Flock Isolation",
      severity: "medium",
      count: 8,
      percentage: 3.3,
      description: "Individual birds separating from the main group"
    },
    {
      id: "drooping",
      behavior: "Wing Drooping",
      severity: "medium",
      count: 15,
      percentage: 6.1,
      description: "Wings hanging lower than normal posture"
    },
    {
      id: "posture",
      behavior: "Abnormal Posture",
      severity: "low",
      count: 5,
      percentage: 2.0,
      description: "Unusual body positioning or stance"
    },
    {
      id: "trembling",
      behavior: "Trembling/Shaking",
      severity: "high",
      count: 3,
      percentage: 1.2,
      description: "Visible shaking or trembling movements"
    }
  ];

  const activityData = [
    { time: "00:00", normal: 85, abnormal: 15 },
    { time: "04:00", normal: 92, abnormal: 8 },
    { time: "08:00", normal: 78, abnormal: 22 },
    { time: "12:00", normal: 82, abnormal: 18 },
    { time: "16:00", normal: 79, abnormal: 21 },
    { time: "20:00", normal: 88, abnormal: 12 },
  ];

  const poseData = [
    { pose: "Standing", count: 185, percentage: 75.5 },
    { pose: "Walking", count: 42, percentage: 17.1 },
    { pose: "Feeding", count: 12, percentage: 4.9 },
    { pose: "Resting", count: 6, percentage: 2.4 },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "low": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
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
                <p className="text-sm font-medium text-muted-foreground">Normal Behavior</p>
                <p className="text-2xl font-bold text-green-600">82.5%</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Abnormal Patterns</p>
                <p className="text-2xl font-bold text-red-600">43</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Confidence</p>
                <p className="text-2xl font-bold text-blue-600">94.7%</p>
              </div>
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Analysis Rate</p>
                <p className="text-2xl font-bold text-purple-600">30 FPS</p>
              </div>
              <Timer className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Abnormal Behavior Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Detected Abnormal Behaviors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {behaviorPatterns.map((pattern) => (
              <Alert key={pattern.id} className="border-l-4 border-l-red-500">
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getSeverityColor(pattern.severity)}>
                        {pattern.severity.toUpperCase()}
                      </Badge>
                      <div>
                        <div className="font-semibold">{pattern.behavior}</div>
                        <div className="text-sm text-muted-foreground">{pattern.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{pattern.count}</div>
                      <div className="text-sm text-muted-foreground">{pattern.percentage}% of flock</div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Behavior Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activity Patterns (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="normal" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="abnormal" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pose Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={poseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="pose" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pose Estimation Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Pose Estimation Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {poseData.map((pose) => (
              <div key={pose.pose} className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{pose.count}</div>
                <div className="text-sm font-medium">{pose.pose}</div>
                <div className="text-xs text-muted-foreground">{pose.percentage}%</div>
                <Progress value={pose.percentage} className="mt-2 h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Model Performance */}
      <Card>
        <CardHeader>
          <CardTitle>AI Model Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Pose Detection Accuracy</span>
                <span className="text-sm text-muted-foreground">96.3%</span>
              </div>
              <Progress value={96.3} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Behavior Classification</span>
                <span className="text-sm text-muted-foreground">91.8%</span>
              </div>
              <Progress value={91.8} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Temporal Analysis</span>
                <span className="text-sm text-muted-foreground">88.5%</span>
              </div>
              <Progress value={88.5} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};