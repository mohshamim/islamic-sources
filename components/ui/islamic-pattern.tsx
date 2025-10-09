import React from "react";

interface IslamicPatternProps {
  className?: string;
  variant?: "styleOne" | "styleTwo" | "styleThree";
  opacity?: number;
}

export const IslamicPattern: React.FC<IslamicPatternProps> = ({
  className = "",
  variant = "styleOne",
  opacity = 0.5,
}) => {
  return (
    <div
      className={`islamic-pattern ${variant} ${className}`}
      style={{ opacity }}
    />
  );
};

export default IslamicPattern;
