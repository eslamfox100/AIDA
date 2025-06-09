
import { useState } from "react";
import { Target, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ClickPositionSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onPositionSelect: (position: { x: number; y: number }) => void;
  currentPosition: { x: number; y: number };
}

export const ClickPositionSelector = ({ 
  isOpen, 
  onClose, 
  onPositionSelect, 
  currentPosition 
}: ClickPositionSelectorProps) => {
  const [selectedPosition, setSelectedPosition] = useState(currentPosition);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleScreenClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelecting) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setSelectedPosition({ x: Math.round(x), y: Math.round(y) });
  };

  const handleConfirmPosition = () => {
    onPositionSelect(selectedPosition);
    setIsSelecting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50">
      {/* Instructions Card */}
      <Card className="absolute top-4 left-1/2 transform -translate-x-1/2 glass-card w-full max-w-md mx-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-cyber-blue flex items-center gap-2 text-lg">
            <Target className="w-5 h-5" />
            تحديد موقع النقر
          </CardTitle>
          <CardDescription>
            {isSelecting 
              ? "انقر على المكان المطلوب الضغط عليه تلقائياً"
              : "اضغط على زر 'بدء التحديد' ثم انقر على الموقع المرغوب"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">الموقع الحالي:</span>
            <span className="text-cyber-green">
              X: {selectedPosition.x}, Y: {selectedPosition.y}
            </span>
          </div>
          
          <div className="flex gap-2">
            {!isSelecting ? (
              <Button 
                onClick={() => setIsSelecting(true)}
                className="cyber-button flex-1"
              >
                <Target className="w-4 h-4 mr-2" />
                بدء التحديد
              </Button>
            ) : (
              <Button 
                onClick={handleConfirmPosition}
                className="cyber-button bg-cyber-green/20 border-cyber-green text-cyber-green flex-1"
              >
                <Check className="w-4 h-4 mr-2" />
                تأكيد الموقع
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={onClose}
              className="cyber-button"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Click Area */}
      <div 
        className={`absolute inset-0 ${isSelecting ? 'cursor-crosshair' : 'cursor-default'}`}
        onClick={handleScreenClick}
      >
        {/* Crosshair indicator */}
        {isSelecting && selectedPosition.x > 0 && selectedPosition.y > 0 && (
          <div 
            className="absolute w-8 h-8 border-2 border-cyber-green rounded-full animate-pulse"
            style={{
              left: selectedPosition.x - 16,
              top: selectedPosition.y - 16,
              transform: 'translate(0, 0)'
            }}
          >
            <div className="absolute inset-0 bg-cyber-green/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyber-green rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        )}
      </div>
    </div>
  );
};
