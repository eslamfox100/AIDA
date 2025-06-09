
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Pause } from "lucide-react";

interface QuickControlsProps {
  isActive: boolean;
  interval: number;
  onIntervalChange: (interval: number) => void;
}

export const QuickControls = ({ isActive, interval, onIntervalChange }: QuickControlsProps) => {
  const quickIntervals = [
    { label: "سريع جداً", value: 100, color: "text-red-400" },
    { label: "سريع", value: 500, color: "text-orange-400" },
    { label: "متوسط", value: 1000, color: "text-cyber-blue" },
    { label: "بطيء", value: 2000, color: "text-green-400" }
  ];

  return (
    <Card className="glass-card md:col-span-2">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-cyber-blue" />
          <h3 className="font-semibold">التحكم السريع</h3>
          <Badge variant="outline" className="text-xs">
            {interval}ms
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          {quickIntervals.map((preset) => (
            <Button
              key={preset.value}
              variant="outline"
              size="sm"
              onClick={() => onIntervalChange(preset.value)}
              className={`cyber-button text-xs ${
                interval === preset.value ? 'bg-cyber-blue/20 border-cyber-blue' : ''
              }`}
              disabled={isActive}
            >
              <span className={preset.color}>●</span>
              {preset.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {Math.round(60000 / interval)} نقرة/دقيقة
          </span>
          {isActive && (
            <span className="flex items-center gap-1 text-cyber-green">
              <Pause className="w-3 h-3 animate-pulse" />
              نشط
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
