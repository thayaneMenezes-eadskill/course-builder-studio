
import * as React from "react";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`tiptap-separator ${className || ""}`}
        data-orientation={orientation}
        role="separator"
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";
