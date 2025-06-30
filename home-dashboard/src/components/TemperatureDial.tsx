type TemperatureDialProps = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

export default function TemperatureDial({ min, max, value, onChange }: TemperatureDialProps) {
  const radius = 60;
  const strokeWidth = 8;
  const centerX = 80;
  const centerY = 80;
  
  // Convert temperature to angle (270° arc, starting from -135°)
  const valueToAngle = (temp: number) => {
    const percentage = (temp - min) / (max - min);
    return -135 + (percentage * 270);
  };
  
  const currentAngle = valueToAngle(value);
  const startAngle = -135;
  const endAngle = 135;
  
  // Convert angle to SVG arc parameters
  const angleToArc = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    const x = centerX + radius * Math.cos(rad);
    const y = centerY + radius * Math.sin(rad);
    return { x, y };
  };
  
  const startPoint = angleToArc(startAngle);
  const endPoint = angleToArc(endAngle);
  const currentPoint = angleToArc(currentAngle);
  
  // Create SVG arc path
  const largeArcFlag = 270 > 180 ? 1 : 0;
  const arcPath = `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y}`;
  
  // Create active arc path (from start to current value)
  const activeArcPath = `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${currentAngle > 45 ? 1 : 0} 1 ${currentPoint.x} ${currentPoint.y}`;
  
  // Handle click on dial
  const handleDialClick = (event: React.MouseEvent<SVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - centerX;
    const y = event.clientY - rect.top - centerY;
    
    // Calculate angle from center
    let angle = Math.atan2(y, x) * 180 / Math.PI;
    
    // Adjust angle to match our dial orientation
    if (angle < -135) angle += 360;
    if (angle > 135) angle = 135;
    
    // Convert angle to temperature
    const percentage = (angle + 135) / 270;
    const newTemp = Math.round(min + (percentage * (max - min)));
    
    // Clamp to min/max
    const clampedTemp = Math.max(min, Math.min(max, newTemp));
    onChange(clampedTemp);
  };

  // Handle touch events for mobile
  const handleTouchStart = (event: React.TouchEvent<SVGElement>) => {
    event.preventDefault();
    const touch = event.touches[0];
    const rect = event.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left - centerX;
    const y = touch.clientY - rect.top - centerY;
    
    // Calculate angle from center
    let angle = Math.atan2(y, x) * 180 / Math.PI;
    
    // Adjust angle to match our dial orientation
    if (angle < -135) angle += 360;
    if (angle > 135) angle = 135;
    
    // Convert angle to temperature
    const percentage = (angle + 135) / 270;
    const newTemp = Math.round(min + (percentage * (max - min)));
    
    // Clamp to min/max
    const clampedTemp = Math.max(min, Math.min(max, newTemp));
    onChange(clampedTemp);
  };
  
  return (
    <div className="relative">
      <svg
        width="160"
        height="160"
        className="cursor-pointer touch-none"
        onClick={handleDialClick}
        onTouchStart={handleTouchStart}
      >
        {/* Background track */}
        <path
          d={arcPath}
          fill="none"
          stroke="rgb(229 231 235)"
          strokeWidth={strokeWidth}
          className="dark:stroke-zinc-700"
        />
        
        {/* Active arc */}
        <path
          d={activeArcPath}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-blue-600 dark:text-blue-400"
        />
        
        {/* Center value */}
        <text
          x={centerX}
          y={centerY + 8}
          textAnchor="middle"
          className="text-xl sm:text-2xl font-bold fill-current"
        >
          {value}°
        </text>
        
        {/* Min label */}
        <text
          x={startPoint.x - 15}
          y={startPoint.y + 5}
          textAnchor="end"
          className="text-xs sm:text-sm fill-current opacity-70"
        >
          {min}°
        </text>
        
        {/* Max label */}
        <text
          x={endPoint.x + 15}
          y={endPoint.y + 5}
          textAnchor="start"
          className="text-xs sm:text-sm fill-current opacity-70"
        >
          {max}°
        </text>
      </svg>
    </div>
  );
} 