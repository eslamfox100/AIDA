
import { useState } from "react";
import { Play, Pause, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingButtonProps {
  isActive: boolean;
  onClick: () => void;
  onSettingsClick: () => void;
}

export const FloatingButton = ({ isActive, onClick, onSettingsClick }: FloatingButtonProps) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu Options */}
      {showMenu && (
        <div className="absolute bottom-20 right-0 flex flex-col gap-2 animate-fade-in">
          <Button
            size="sm"
            variant="outline"
            onClick={onSettingsClick}
            className="cyber-button bg-dark-card/80 backdrop-blur-lg border-cyber-blue/50"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Main Floating Button */}
      <div
        className={`floating-button ${isActive ? 'active' : ''}`}
        onClick={() => setShowMenu(!showMenu)}
        onDoubleClick={onClick}
      >
        {isActive ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6" />
        )}
      </div>

      {/* Quick Action Button */}
      <div
        className="absolute -top-16 right-0 w-12 h-12 bg-cyber-blue/20 border border-cyber-blue/50 rounded-full flex items-center justify-center text-cyber-blue cursor-pointer transition-all duration-300 hover:bg-cyber-blue/30"
        onClick={onClick}
      >
        {isActive ? "⏸️" : "▶️"}
      </div>
    </div>
  );
};
