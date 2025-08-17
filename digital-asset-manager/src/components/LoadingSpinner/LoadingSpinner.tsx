import { Loader2 } from "lucide-react";
import { memo } from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

export const LoadingSpinner = memo<LoadingSpinnerProps>(({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-8 h-8",
  };

  return <Loader2 className={`${sizeClasses[size]} animate-spin`} />;
});

LoadingSpinner.displayName = "LoadingSpinner";
