
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  icon?: React.ReactNode; // Add icon prop to interface
  title?: string; // Add title prop for better accessibility
}

export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ onClick, isActive, children, className, icon, title, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size="icon"
        variant="ghost"
        onClick={onClick}
        title={title}
        className={cn(isActive ? "bg-muted" : "", className)}
        {...props}
      >
        {icon || children}
      </Button>
    );
  }
);

ToolbarButton.displayName = "ToolbarButton";
