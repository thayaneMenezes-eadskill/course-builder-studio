import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ onClick, isActive, children, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size="icon"
        variant="ghost"
        onClick={onClick}
        className={cn(isActive ? "bg-muted" : "", className)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

ToolbarButton.displayName = "ToolbarButton";