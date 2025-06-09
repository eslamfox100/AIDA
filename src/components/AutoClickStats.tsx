
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Clock, Activity, Zap } from "lucide-react";

interface AutoClickStatsProps {
  clickCount: number;
  isActive: boolean;
  interval: number;
}

export const AutoClickStats = ({ clickCount, isActive, interval }: AutoClickStatsProps) => {
  const [totalClicks, setTotalClicks] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [efficiency, setEfficiency] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      timer = setInterval(() => {
        setSessionTime(prev => prev + 1);
        setTotalClicks(prev => prev + 1);
        
        // حساب الكفاءة بناءً على الفاصل الزمني
        const expectedClicks = Math.floor(sessionTime * 1000 / interval);
        setEfficiency(expectedClicks > 0 ? Math.min(100, (totalClicks / expectedClicks) * 100) : 0);
      }, interval);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, interval, sessionTime, totalClicks]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const clicksPerMinute = sessionTime > 0 ? Math.round((totalClicks / sessionTime) * 60) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Clicks */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-cyber-green">
            <Target className="w-4 h-4" />
            إجمالي النقرات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cyber-green">{totalClicks.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">نقرة في هذه الجلسة</p>
        </CardContent>
      </Card>

      {/* Session Time */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-cyber-blue">
            <Clock className="w-4 h-4" />
            وقت الجلسة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cyber-blue">{formatTime(sessionTime)}</div>
          <p className="text-xs text-muted-foreground">دقيقة:ثانية</p>
        </CardContent>
      </Card>

      {/* Clicks Per Minute */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-cyber-purple">
            <Activity className="w-4 h-4" />
            النقرات/الدقيقة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-cyber-purple">{clicksPerMinute}</div>
          <p className="text-xs text-muted-foreground">متوسط السرعة</p>
        </CardContent>
      </Card>

      {/* Efficiency */}
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-foreground">
            <Zap className="w-4 h-4" />
            الكفاءة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{Math.round(efficiency)}%</div>
            <Progress value={efficiency} className="h-2" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">دقة التوقيت</p>
        </CardContent>
      </Card>
    </div>
  );
};
