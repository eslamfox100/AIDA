
import { useState } from "react";
import { X, Target, Clock, Smartphone, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  interval: number;
  onIntervalChange: (interval: number) => void;
}

export const SettingsPanel = ({ isOpen, onClose, interval, onIntervalChange }: SettingsPanelProps) => {
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [autoStart, setAutoStart] = useState(false);
  const [targetApp, setTargetApp] = useState("");
  const [localInterval, setLocalInterval] = useState(interval);

  const handleSave = () => {
    onIntervalChange(localInterval);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-cyber-blue flex items-center gap-2">
              <Target className="w-5 h-5" />
              إعدادات النقر التلقائي
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription>
            قم بتخصيص إعدادات النقر التلقائي حسب احتياجاتك
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Click Position */}
          <div className="space-y-3">
            <Label className="text-cyber-green flex items-center gap-2">
              <Target className="w-4 h-4" />
              موقع النقر
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground">X</Label>
                <Input
                  type="number"
                  value={clickPosition.x}
                  onChange={(e) => setClickPosition(prev => ({ ...prev, x: Number(e.target.value) }))}
                  className="cyber-input"
                  placeholder="الإحداثي X"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Y</Label>
                <Input
                  type="number"
                  value={clickPosition.y}
                  onChange={(e) => setClickPosition(prev => ({ ...prev, y: Number(e.target.value) }))}
                  className="cyber-input"
                  placeholder="الإحداثي Y"
                />
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full cyber-button">
              اختيار موقع النقر من الشاشة
            </Button>
          </div>

          {/* Click Interval */}
          <div className="space-y-3">
            <Label className="text-cyber-blue flex items-center gap-2">
              <Clock className="w-4 h-4" />
              فاصل النقر (ميلي ثانية)
            </Label>
            <div className="space-y-2">
              <Slider
                value={[localInterval]}
                onValueChange={(value) => setLocalInterval(value[0])}
                max={5000}
                min={100}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>100ms (سريع جداً)</span>
                <span className="text-cyber-blue font-semibold">{localInterval}ms</span>
                <span>5000ms (بطيء)</span>
              </div>
            </div>
            <Input
              type="number"
              value={localInterval}
              onChange={(e) => setLocalInterval(Number(e.target.value))}
              className="cyber-input"
              placeholder="أدخل القيمة يدوياً"
            />
          </div>

          {/* Target App */}
          <div className="space-y-3">
            <Label className="text-cyber-purple flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              التطبيق المستهدف
            </Label>
            <Input
              value={targetApp}
              onChange={(e) => setTargetApp(e.target.value)}
              className="cyber-input"
              placeholder="اسم التطبيق أو اللعبة"
            />
          </div>

          {/* Auto Start */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-cyber-green">التشغيل التلقائي</Label>
              <p className="text-xs text-muted-foreground">
                بدء النقر عند فتح التطبيق المستهدف
              </p>
            </div>
            <Switch
              checked={autoStart}
              onCheckedChange={setAutoStart}
            />
          </div>

          {/* Quick Presets */}
          <div className="space-y-3">
            <Label className="text-foreground">إعدادات سريعة</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setLocalInterval(500)}
                className="cyber-button"
              >
                سريع (500ms)
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setLocalInterval(1000)}
                className="cyber-button"
              >
                متوسط (1s)
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setLocalInterval(2000)}
                className="cyber-button"
              >
                بطيء (2s)
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setLocalInterval(100)}
                className="cyber-button"
              >
                سريع جداً (100ms)
              </Button>
            </div>
          </div>

          {/* Save Button */}
          <Button 
            onClick={handleSave}
            className="w-full cyber-button bg-cyber-green/20 border-cyber-green text-cyber-green hover:bg-cyber-green/30"
          >
            <Save className="w-4 h-4 mr-2" />
            حفظ الإعدادات
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
