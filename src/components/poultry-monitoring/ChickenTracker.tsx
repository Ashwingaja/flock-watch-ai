import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface TrackedChicken {
  id: string;
  confidence: number;
  lastSeen: string;
  zone: string;
  behaviorScore: number;
  status: "normal" | "watch" | "alert";
}

export const ChickenTracker = () => {
  const trackedChickens: TrackedChicken[] = [
    { id: "CH001", confidence: 98.5, lastSeen: "2s ago", zone: "Barn A-1", behaviorScore: 85, status: "normal" },
    { id: "CH002", confidence: 96.2, lastSeen: "1s ago", zone: "Barn A-1", behaviorScore: 92, status: "normal" },
    { id: "CH003", confidence: 94.8, lastSeen: "3s ago", zone: "Barn A-2", behaviorScore: 45, status: "alert" },
    { id: "CH004", confidence: 97.1, lastSeen: "1s ago", zone: "Barn A-1", behaviorScore: 68, status: "watch" },
    { id: "CH005", confidence: 95.5, lastSeen: "2s ago", zone: "Outdoor-1", behaviorScore: 88, status: "normal" },
    { id: "CH006", confidence: 93.2, lastSeen: "4s ago", zone: "Barn B-1", behaviorScore: 91, status: "normal" },
    { id: "CH007", confidence: 96.8, lastSeen: "1s ago", zone: "Barn A-2", behaviorScore: 52, status: "watch" },
    { id: "CH008", confidence: 98.1, lastSeen: "2s ago", zone: "Outdoor-1", behaviorScore: 95, status: "normal" },
  ];

  const totalTracked = 245;
  const activeTracking = 238;
  const confidenceThreshold = 95;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "text-green-600 bg-green-100";
      case "watch": return "text-yellow-600 bg-yellow-100";
      case "alert": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getBehaviorColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
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
                <p className="text-2xl font-bold">{totalTracked}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Actively Tracked</p>
                <p className="text-2xl font-bold text-green-600">{activeTracking}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tracking Accuracy</p>
                <p className="text-2xl font-bold text-purple-600">{((activeTracking / totalTracked) * 100).toFixed(1)}%</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Confidence</p>
                <p className="text-2xl font-bold text-orange-600">96.2%</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                AI
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Tracking Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tracking Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Live Tracking Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gray-100 rounded-lg h-64 overflow-hidden">
              {/* Simulated tracking display */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  animate={{
                    x: [
                      Math.random() * 300,
                      Math.random() * 300,
                      Math.random() * 300
                    ],
                    y: [
                      Math.random() * 200,
                      Math.random() * 200,
                      Math.random() * 200
                    ]
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
                    <div className="absolute -top-6 -left-4 bg-black text-white text-xs px-1 rounded">
                      CH{String(i + 1).padStart(3, '0')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Blue dots represent tracked chickens with YOLOv8 + DeepSORT
            </div>
          </CardContent>
        </Card>

        {/* Detailed Tracking List */}
        <Card>
          <CardHeader>
            <CardTitle>Individual Bird Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {trackedChickens.map((chicken) => (
                <div key={chicken.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                      {chicken.id.slice(-2)}
                    </div>
                    <div>
                      <div className="font-medium">{chicken.id}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {chicken.zone}
                        <Clock className="h-3 w-3 ml-2" />
                        {chicken.lastSeen}
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className={getStatusColor(chicken.status)}>
                      {chicken.status}
                    </Badge>
                    <div className="text-sm">
                      <div className="text-muted-foreground">Confidence: {chicken.confidence}%</div>
                      <div className={`font-medium ${getBehaviorColor(chicken.behaviorScore)}`}>
                        Behavior: {chicken.behaviorScore}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tracking Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Tracking Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Detection Accuracy</span>
                <span className="text-sm text-muted-foreground">96.8%</span>
              </div>
              <Progress value={96.8} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Track Retention</span>
                <span className="text-sm text-muted-foreground">94.2%</span>
              </div>
              <Progress value={94.2} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">ID Consistency</span>
                <span className="text-sm text-muted-foreground">91.5%</span>
              </div>
              <Progress value={91.5} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};