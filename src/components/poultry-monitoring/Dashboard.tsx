import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoFeedPanel } from "./VideoFeedPanel";
import { ChickenTracker } from "./ChickenTracker";
import { BehaviorAnalyzer } from "./BehaviorAnalyzer";
import { HealthRiskClassifier } from "./HealthRiskClassifier";
import { NotificationCenter } from "./NotificationCenter";
import { ReportGenerator } from "./ReportGenerator";
import { AlertTriangle, Eye, Activity, Brain, Bell, FileText } from "lucide-react";

export const Dashboard = () => {
  const [activeAgent, setActiveAgent] = useState("video-feed");

  const agents = [
    { id: "video-feed", name: "Video Feed Collector", icon: Eye, status: "active" },
    { id: "tracker", name: "Chicken Tracker", icon: Activity, status: "active" },
    { id: "behavior", name: "Behavior Analyzer", icon: Brain, status: "active" },
    { id: "health", name: "Health Risk Classifier", icon: AlertTriangle, status: "active" },
    { id: "notifications", name: "Notification Agent", icon: Bell, status: "active" },
    { id: "reports", name: "Report Generator", icon: FileText, status: "active" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">CrewAI Poultry Monitoring System</h1>
            <p className="text-muted-foreground">Real-time behavior analysis and health monitoring</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              All Systems Operational
            </Badge>
          </div>
        </div>

        {/* Agent Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {agents.map((agent) => {
                const IconComponent = agent.icon;
                return (
                  <Button
                    key={agent.id}
                    variant={activeAgent === agent.id ? "default" : "outline"}
                    className="h-auto flex-col p-4"
                    onClick={() => setActiveAgent(agent.id)}
                  >
                    <IconComponent className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">{agent.name}</span>
                    <Badge 
                      variant={agent.status === "active" ? "default" : "secondary"} 
                      className="mt-2 text-xs"
                    >
                      {agent.status}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeAgent} onValueChange={setActiveAgent}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="video-feed">Video Feed</TabsTrigger>
            <TabsTrigger value="tracker">Tracker</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="video-feed" className="space-y-4">
            <VideoFeedPanel />
          </TabsContent>

          <TabsContent value="tracker" className="space-y-4">
            <ChickenTracker />
          </TabsContent>

          <TabsContent value="behavior" className="space-y-4">
            <BehaviorAnalyzer />
          </TabsContent>

          <TabsContent value="health" className="space-y-4">
            <HealthRiskClassifier />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <NotificationCenter />
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <ReportGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};