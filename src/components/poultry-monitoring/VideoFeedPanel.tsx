import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, Camera, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface VideoFeed {
  id: string;
  name: string;
  location: string;
  status: "live" | "offline" | "recording";
  chickenCount: number;
  temperature: number;
  humidity: number;
}

export const VideoFeedPanel = () => {
  const [selectedFeed, setSelectedFeed] = useState("barn-a-1");
  
  const feeds: VideoFeed[] = [
    {
      id: "barn-a-1",
      name: "Barn A - Zone 1",
      location: "North Section",
      status: "live",
      chickenCount: 245,
      temperature: 22.5,
      humidity: 65
    },
    {
      id: "barn-a-2", 
      name: "Barn A - Zone 2",
      location: "South Section",
      status: "live",
      chickenCount: 198,
      temperature: 23.1,
      humidity: 62
    },
    {
      id: "barn-b-1",
      name: "Barn B - Zone 1", 
      location: "East Section",
      status: "recording",
      chickenCount: 167,
      temperature: 21.8,
      humidity: 68
    },
    {
      id: "outdoor-1",
      name: "Outdoor Run 1",
      location: "Free Range Area",
      status: "live",
      chickenCount: 89,
      temperature: 18.5,
      humidity: 45
    }
  ];

  const selectedFeedData = feeds.find(feed => feed.id === selectedFeed);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-red-500";
      case "recording": return "bg-yellow-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Feed Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Feeds</h3>
        {feeds.map((feed) => (
          <Card 
            key={feed.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedFeed === feed.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedFeed(feed.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{feed.name}</h4>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(feed.status)}`} />
                  <Badge variant="outline" className="text-xs">
                    {feed.status}
                  </Badge>
                </div>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  {feed.location}
                </div>
                <div>Count: {feed.chickenCount} birds</div>
                <div>{feed.temperature}°C • {feed.humidity}% humidity</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Video Feed */}
      <div className="lg:col-span-3 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                {selectedFeedData?.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Play className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Pause className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Square className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Simulated Video Feed */}
            <div className="relative bg-gray-900 rounded-lg aspect-video overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-yellow-900/20">
                {/* Simulated chicken movements */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-white rounded-full opacity-80"
                    animate={{
                      x: [
                        Math.random() * 400,
                        Math.random() * 400,
                        Math.random() * 400
                      ],
                      y: [
                        Math.random() * 200,
                        Math.random() * 200,
                        Math.random() * 200
                      ]
                    }}
                    transition={{
                      duration: 5 + Math.random() * 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>
              
              {/* Overlay Info */}
              <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  LIVE
                </div>
                <div>Birds Detected: {selectedFeedData?.chickenCount}</div>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded text-sm">
                {new Date().toLocaleTimeString()}
              </div>
            </div>

            {/* Feed Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedFeedData?.chickenCount}</div>
                  <div className="text-sm text-muted-foreground">Birds Detected</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedFeedData?.temperature}°C</div>
                  <div className="text-sm text-muted-foreground">Temperature</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedFeedData?.humidity}%</div>
                  <div className="text-sm text-muted-foreground">Humidity</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};