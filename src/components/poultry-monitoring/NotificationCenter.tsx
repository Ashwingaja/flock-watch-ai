import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, AlertTriangle, Info, CheckCircle, X, Eye, Settings, Send } from "lucide-react";
import { format } from "date-fns";

interface Notification {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  message: string;
  chickenId?: string;
  zone: string;
  timestamp: Date;
  isRead: boolean;
  snapshot?: string;
  coordinates?: { x: number; y: number };
}

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "N001",
      type: "critical",
      title: "Critical Health Alert",
      message: "Bird CH003 showing severe lethargy and isolation behavior. Immediate veterinary attention required.",
      chickenId: "CH003",
      zone: "Barn A-2",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      isRead: false,
      coordinates: { x: 156, y: 89 }
    },
    {
      id: "N002",
      type: "warning",
      title: "Behavioral Anomaly Detected", 
      message: "Bird CH007 exhibiting reduced movement patterns. Monitoring for 24 hours recommended.",
      chickenId: "CH007",
      zone: "Barn A-2",
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      isRead: false,
      coordinates: { x: 203, y: 134 }
    },
    {
      id: "N003",
      type: "warning",
      title: "Environmental Alert",
      message: "Temperature in Barn B-1 has risen above optimal range (25.2°C). Check ventilation system.",
      zone: "Barn B-1",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isRead: true
    },
    {
      id: "N004",
      type: "info",
      title: "Daily Health Summary",
      message: "Flock health assessment completed. 94.1% of birds showing normal behavior patterns.",
      zone: "All Zones",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true
    },
    {
      id: "N005",
      type: "critical",
      title: "Equipment Malfunction",
      message: "Camera feed from Barn A-3 offline. Manual inspection may be required.",
      zone: "Barn A-3",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      isRead: false
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif)
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "critical": return AlertTriangle;
      case "warning": return Bell;
      case "info": return Info;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "critical": return "text-red-600 bg-red-100 border-red-200";
      case "warning": return "text-yellow-600 bg-yellow-100 border-yellow-200"; 
      case "info": return "text-blue-600 bg-blue-100 border-blue-200";
      default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const criticalCount = notifications.filter(n => n.type === "critical" && !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Alerts</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold text-orange-600">{unreadCount}</p>
              </div>
              <div className="relative">
                <Bell className="h-8 w-8 text-orange-600" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    {unreadCount}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                <p className="text-2xl font-bold text-green-600">2.3m</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts Banner */}
      {criticalCount > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-red-700">
                  {criticalCount} Critical Alert{criticalCount > 1 ? 's' : ''} Requiring Immediate Attention
                </span>
              </div>
              <Button size="sm" variant="destructive">
                View Critical Alerts
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Notification Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="warning">Warnings</TabsTrigger>
          <TabsTrigger value="info">Information</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Notifications</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button size="sm" variant="outline">
                    Mark All Read
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => {
                  const TypeIcon = getTypeIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg ${getTypeColor(notification.type)} ${
                        !notification.isRead ? 'ring-2 ring-blue-500/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <TypeIcon className="h-5 w-5 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{notification.title}</h4>
                              {!notification.isRead && (
                                <Badge variant="secondary" className="text-xs">NEW</Badge>
                              )}
                            </div>
                            <p className="text-sm opacity-90 mb-2">{notification.message}</p>
                            <div className="flex items-center gap-4 text-xs opacity-75">
                              <span>{notification.zone}</span>
                              <span>{format(notification.timestamp, 'MMM dd, HH:mm')}</span>
                              {notification.chickenId && (
                                <span>Bird: {notification.chickenId}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {notification.coordinates && (
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          )}
                          {!notification.isRead && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => dismissNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Critical Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications
                  .filter(n => n.type === "critical")
                  .map((notification) => (
                    <Alert key={notification.id} className="border-red-300">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{notification.title}</div>
                            <div className="text-sm">{notification.message}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {notification.zone} • {format(notification.timestamp, 'MMM dd, HH:mm')}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="destructive">
                              <Send className="h-4 w-4 mr-1" />
                              Alert Farm Manager
                            </Button>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-yellow-600">Warning Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications
                  .filter(n => n.type === "warning")
                  .map((notification) => (
                    <div key={notification.id} className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Bell className="h-4 w-4 text-yellow-600" />
                        <span className="font-semibold text-yellow-700">{notification.title}</span>
                      </div>
                      <p className="text-sm text-yellow-700">{notification.message}</p>
                      <div className="text-xs text-yellow-600 mt-1">
                        {notification.zone} • {format(notification.timestamp, 'MMM dd, HH:mm')}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications
                  .filter(n => n.type === "info")
                  .map((notification) => (
                    <div key={notification.id} className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Info className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-700">{notification.title}</span>
                      </div>
                      <p className="text-sm text-blue-700">{notification.message}</p>
                      <div className="text-xs text-blue-600 mt-1">
                        {notification.zone} • {format(notification.timestamp, 'MMM dd, HH:mm')}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};