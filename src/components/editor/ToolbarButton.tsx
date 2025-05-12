
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}

export const ToolbarButton = ({ onClick, isActive, children }: ToolbarButtonProps) => {
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={onClick}
      className={cn(isActive ? "bg-muted" : "")}
    >
      {children}
    </Button>
  );
};
