import Axis from "../components/Axis";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 300;

interface Props {
  labels: string[];
  data: number[];
  configs: {
    xAxisName?: string;
    YAxisName?: string;
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    numYTicks?: number;
    fillOpacity?: number;
    showPoints?: boolean;
    pointRadius?: number;
  };
}

function AreaChart({ configs, data, labels }: Props) {
  const {
    fillColor = "#3B82F6",
    strokeColor = "#2563EB",
    strokeWidth = 2,
    xAxisName,
    YAxisName,
    numYTicks,
    fillOpacity = 0.3,
    showPoints = false,
    pointRadius = 4,
  } = configs;

  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;

  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;

  const xAxisY = y0 + yAxisLength;

  const dataYMax = data.reduce(
    (currMax, dataY) => Math.max(currMax, dataY),
    -Infinity
  );

  // Calculate points for the area path
  const pointSpacing = xAxisLength / (data.length - 1);
  const points = data.map((value, index) => {
    const x = x0 + index * pointSpacing;
    const yRatio = value / dataYMax;
    const y = y0 + (1 - yRatio) * yAxisLength;
    return { x, y, value };
  });

  // Create area path (closed path from x-axis to points and back)
  const createAreaPath = () => {
    const pathParts: string[] = [];
    
    // Start at first point on x-axis
    pathParts.push(`M ${points[0].x} ${xAxisY}`);
    
    // Draw line to first data point
    pathParts.push(`L ${points[0].x} ${points[0].y}`);
    
    // Draw line through all data points
    for (let i = 1; i < points.length; i++) {
      pathParts.push(`L ${points[i].x} ${points[i].y}`);
    }
    
    // Draw line to last point on x-axis
    pathParts.push(`L ${points[points.length - 1].x} ${xAxisY}`);
    
    // Close the path
    pathParts.push('Z');
    
    return pathParts.join(' ');
  };

  // Create line path (just the top line, no fill)
  const createLinePath = () => {
    const pathParts: string[] = [];
    
    pathParts.push(`M ${points[0].x} ${points[0].y}`);
    
    for (let i = 1; i < points.length; i++) {
      pathParts.push(`L ${points[i].x} ${points[i].y}`);
    }
    
    return pathParts.join(' ');
  };

  return (
    <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
      <Axis
        x0={x0}
        xAxisY={xAxisY}
        xAxisLength={xAxisLength}
        xAxisName={xAxisName}
        y0={y0}
        yAxisLength={yAxisLength}
        YAxisName={YAxisName}
        numYTicks={numYTicks}
        dataYMax={dataYMax}
      />
      
      {/* Area fill */}
      <path
        d={createAreaPath()}
        fill={fillColor}
        fillOpacity={fillOpacity}
      />
      
      {/* Top line/border */}
      <path
        d={createLinePath()}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      
      {/* Data points */}
      {showPoints && points.map((point, index) => (
        <g key={index}>
          <circle
            cx={point.x}
            cy={point.y}
            r={pointRadius}
            fill={strokeColor}
            stroke="white"
            strokeWidth={2}
          />
        </g>
      ))}
      
      {/* X-axis labels */}
      {labels.map((label, index) => {
        const x = x0 + index * pointSpacing;
        return (
          <text
            key={index}
            x={x}
            y={xAxisY + 16}
            textAnchor="middle"
            fontSize="12"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}

export default AreaChart;
