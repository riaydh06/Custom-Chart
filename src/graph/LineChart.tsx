import Axis from "../components/Axis";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 300;

interface Props {
  labels: string[];
  data: number[];
  configs: {
    xAxisName?: string;
    YAxisName?: string;
    strokeColor?: string;
    strokeWidth?: number;
    numYTicks?: number;
    showPoints?: boolean;
    pointRadius?: number;
    pointFillColor?: string;
    pointStrokeColor?: string;
    lineDashArray?: string; // For dashed lines, e.g., "5,5"
  };
}

function LineChart({ configs, data, labels }: Props) {
  const {
    strokeColor = "#3B82F6",
    strokeWidth = 2,
    xAxisName,
    YAxisName,
    numYTicks,
    showPoints = true,
    pointRadius = 4,
    pointFillColor,
    pointStrokeColor = "white",
    lineDashArray,
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

  // Calculate points for the line
  const pointSpacing = xAxisLength / (data.length - 1);
  const points = data.map((value, index) => {
    const x = x0 + index * pointSpacing;
    const yRatio = value / dataYMax;
    const y = y0 + (1 - yRatio) * yAxisLength;
    return { x, y, value };
  });

  // Create line path
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
      
      {/* Line */}
      <path
        d={createLinePath()}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={lineDashArray}
      />
      
      {/* Data points */}
      {showPoints && points.map((point, index) => (
        <g key={index}>
          <circle
            cx={point.x}
            cy={point.y}
            r={pointRadius}
            fill={pointFillColor || strokeColor}
            stroke={pointStrokeColor}
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

export default LineChart;
