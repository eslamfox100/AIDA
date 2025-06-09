
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FloatingButton } from "@/components/FloatingButton";
import { SettingsPanel } from "@/components/SettingsPanel";
import { PermissionManager } from "@/components/PermissionManager";
import { AutoClickStats } from "@/components/AutoClickStats";
import { QuickControls } from "@/components/QuickControls";
import { Play, Pause, Settings, Shield, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAutoClickActive, setIsAutoClickActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [interval, setInterval] = useState(1000);
  const { toast } = useToast();

  const toggleAutoClick = () => {
    setIsAutoClickActive(!isAutoClickActive);
    if (!isAutoClickActive) {
      toast({
        title: "تم تفعيل النقر التلقائي",
        description: "يعمل التطبيق الآن في الخلفية",
      });
    } else {
      toast({
        title: "تم إيقاف النقر التلقائي",
        description: "تم إيقاف العملية بنجاح",
      });
    }
  };

  const handleSettingsUpdate = (newInterval: number) => {
    setInterval(newInterval);
    toast({
      title: "تم حفظ الإعدادات",
      description: `تم تحديث الفاصل الزمني إلى ${newInterval}ms`,
    });
  };

  return (
    <div className="min-h-screen bg-dark-gradient p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,212,255,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(57,255,20,0.1),transparent_70%)]" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-cyber-gradient bg-clip-text text-transparent mb-4">
            Auto Clicker Pro
          </h1>
          <p className="text-muted-foreground text-lg">
            تطبيق النقر التلقائي المتقدم للألعاب والتطبيقات
          </p>
        </div>

        {/* Status Card */}
        <Card className="glass-card mb-6">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              {isAutoClickActive ? (
                <Play className="w-6 h-6 text-cyber-green" />
              ) : (
                <Pause className="w-6 h-6 text-muted-foreground" />
              )}
              حالة التطبيق
            </CardTitle>
            <CardDescription>
              <Badge 
                variant={isAutoClickActive ? "default" : "secondary"}
                className={isAutoClickActive ? "bg-cyber-green/20 text-cyber-green border-cyber-green" : ""}
              >
                {isAutoClickActive ? "نشط" : "متوقف"}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Button
                onClick={toggleAutoClick}
                size="lg"
                className={`cyber-button w-full h-16 text-xl ${
                  isAutoClickActive ? "animate-pulse-glow" : ""
                }`}
              >
                {isAutoClickActive ? "إيقاف النقر التلقائي" : "بدء النقر التلقائي"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <QuickControls 
            isActive={isAutoClickActive}
            interval={interval}
            onIntervalChange={setInterval}
          />
          
          {/* Settings Button */}
          <Card className="glass-card cursor-pointer hover:bg-dark-card/90 transition-all duration-300">
            <CardContent className="p-4 text-center" onClick={() => setShowSettings(true)}>
              <Settings className="w-8 h-8 text-cyber-blue mx-auto mb-2" />
              <h3 className="font-semibold">الإعدادات</h3>
              <p className="text-sm text-muted-foreground">تخصيص التطبيق</p>
            </CardContent>
          </Card>

          {/* Permissions Button */}
          <Card className="glass-card cursor-pointer hover:bg-dark-card/90 transition-all duration-300">
            <CardContent className="p-4 text-center" onClick={() => setShowPermissions(true)}>
              <Shield className="w-8 h-8 text-cyber-purple mx-auto mb-2" />
              <h3 className="font-semibold">الصلاحيات</h3>
              <p className="text-sm text-muted-foreground">إدارة الأذونات</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <AutoClickStats 
          clickCount={clickCount}
          isActive={isAutoClickActive}
          interval={interval}
        />

        {/* Android Notice */}
        <Card className="glass-card mt-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-cyber-green" />
              <div>
                <h4 className="font-semibold text-cyber-green">مصمم لـ Android</h4>
                <p className="text-sm text-muted-foreground">
                  يدعم التطبيق العمل فوق التطبيقات الأخرى والعمل في الخلفية
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Button */}
      <FloatingButton 
        isActive={isAutoClickActive}
        onClick={toggleAutoClick}
        onSettingsClick={() => setShowSettings(true)}
      />

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          interval={interval}
          onIntervalChange={handleSettingsUpdate}
        />
      )}

      {/* Permissions Panel */}
      {showPermissions && (
        <PermissionManager
          isOpen={showPermissions}
          onClose={() => setShowPermissions(false)}
        />
      )}
    </div>
  );
};

export default Index;
