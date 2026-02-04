const SVG_WIDTH = 600;
const SVG_HEIGHT = 600;

interface Props {
  labels: string[];
  data: number[];
  configs: {
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
    innerRadius?: number; // Inner radius as percentage (0-1), default 0.2
    maxRadius?: number; // Maximum radius as percentage (0-1), default 0.9
    showLabels?: boolean;
    showValues?: boolean;
    showGrid?: boolean;
    numRings?: number; // Number of concentric grid circles
    startAngle?: number; // Starting angle in degrees, default -90 (top)
    endAngle?: number; // Ending angle in degrees, default 270 (full circle)
    barWidth?: number; // Width of bars in degrees, default auto
  };
}

function RadialBarChart({ configs, data, labels }: Props) {
  const {
    backgroundColor,
    borderColor,
    borderWidth,
    innerRadius = 0.2,
    maxRadius = 0.9,
    showLabels = true,
    showValues = true,
    showGrid = true,
    numRings = 5,
    startAngle = -90,
    endAngle = 270,
    barWidth,
  } = configs;

  const centerX = SVG_WIDTH / 2;
  const centerY = SVG_HEIGHT / 2;
  const baseRadius = Math.min(SVG_WIDTH, SVG_HEIGHT) / 2 - 60;

  const innerRadiusValue = baseRadius * innerRadius;
  const outerRadius = baseRadius * maxRadius;

  // Calculate max value for scaling
  const dataYMax = Math.max(...data, -Infinity);

  // Calculate angle range and step
  const totalAngle = endAngle - startAngle;
  const angleStep = totalAngle / data.length;
  const barAngleWidth = barWidth || angleStep * 0.8; // 80% of step for spacing
  const barSpacing = angleStep - barAngleWidth;

  // Helper function to convert angle to coordinates
  const getCoordinates = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian),
    };
  };

  // Helper function to create radial bar path
  const createRadialBarPath = (
    startAngle: number,
    endAngle: number,
    innerR: number,
    outerR: number
  ) => {
    const startInner = getCoordinates(startAngle, innerR);
    const endInner = getCoordinates(endAngle, innerR);
    const startOuter = getCoordinates(startAngle, outerR);
    const endOuter = getCoordinates(endAngle, outerR);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return [
      `M ${startInner.x} ${startInner.y}`,
      `A ${innerR} ${innerR} 0 ${largeArcFlag} 1 ${endInner.x} ${endInner.y}`,
      `L ${endOuter.x} ${endOuter.y}`,
      `A ${outerR} ${outerR} 0 ${largeArcFlag} 0 ${startOuter.x} ${startOuter.y}`,
      'Z',
    ].join(' ');
  };

  return (
    <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
      {/* Grid circles */}
      {showGrid && Array.from({ length: numRings }).map((_, ringIndex) => {
        const ringRadius = innerRadiusValue + 
          (ringIndex + 1) * ((outerRadius - innerRadiusValue) / numRings);
        const value = (dataYMax * (ringIndex + 1)) / numRings;
        
        return (
          <g key={ringIndex}>
            <circle
              cx={centerX}
              cy={centerY}
              r={ringRadius}
              fill="none"
              stroke="rgba(200, 200, 200, 0.3)"
              strokeWidth={1}
            />
            {/* Value label */}
            {ringIndex > 0 && (
              <text
                x={centerX}
                y={centerY - ringRadius - 5}
                textAnchor="middle"
                fontSize="10"
                fill="#666"
              >
                {value.toFixed(1)}
              </text>
            )}
          </g>
        );
      })}

      {/* Radial bars */}
      {labels.map((label, index) => {
        const value = data[index];
        const valueRatio = value / dataYMax;
        const barOuterRadius = innerRadiusValue + 
          (outerRadius - innerRadiusValue) * valueRatio;

        // Calculate bar angles
        const barStartAngle = startAngle + index * angleStep + barSpacing / 2;
        const barEndAngle = barStartAngle + barAngleWidth;

        const color = backgroundColor?.[index] || 
          `hsl(${(index * 360) / labels.length}, 70%, 50%)`;
        const border = borderColor?.[index] || color;

        // Label position (at outer edge)
        const labelAngle = startAngle + index * angleStep + angleStep / 2;
        const labelPos = getCoordinates(labelAngle, outerRadius + 25);

        // Value label position (mid-bar)
        const midAngle = (barStartAngle + barEndAngle) / 2;
        const valueRadius = innerRadiusValue + (barOuterRadius - innerRadiusValue) / 2;
        const valuePos = getCoordinates(midAngle, valueRadius);

        return (
          <g key={index}>
            {/* Radial bar */}
            <path
              d={createRadialBarPath(barStartAngle, barEndAngle, innerRadiusValue, barOuterRadius)}
              fill={color}
              stroke={border}
              strokeWidth={borderWidth || 1}
              opacity={0.9}
            />

            {/* Value label inside bar */}
            {showValues && valueRatio > 0.1 && (
              <text
                x={valuePos.x}
                y={valuePos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fill="white"
                fontWeight="bold"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
              >
                {value}
              </text>
            )}

            {/* Category label */}
            {showLabels && (
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fill="#333"
                fontWeight="500"
              >
                {label}
              </text>
            )}
          </g>
        );
      })}

      {/* Center circle (optional, for donut-like appearance) */}
      {innerRadius > 0 && (
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadiusValue}
          fill="white"
          stroke="#ddd"
          strokeWidth={1}
        />
      )}
    </svg>
  );
}

export default RadialBarChart;
