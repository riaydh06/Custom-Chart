const SVG_WIDTH = 600;
const SVG_HEIGHT = 600;

interface DataSeries {
  name: string;
  data: number[];
  color?: string;
  fillOpacity?: number;
}

interface Props {
  labels: string[];
  dataSeries: DataSeries[];
  configs: {
    maxValue?: number; // Maximum value for scaling (auto if not provided)
    numRings?: number; // Number of concentric circles (grid lines)
    showGrid?: boolean;
    showLabels?: boolean;
    showLegend?: boolean;
    legendPosition?: 'top' | 'bottom' | 'left' | 'right';
    strokeWidth?: number;
    pointRadius?: number;
    showPoints?: boolean;
  };
}

function PolarChart({ configs, dataSeries, labels }: Props) {
  const {
    maxValue,
    numRings = 5,
    showGrid = true,
    showLabels = true,
    showLegend = true,
    legendPosition = 'right',
    strokeWidth = 2,
    pointRadius = 4,
    showPoints = true,
  } = configs;

  const centerX = SVG_WIDTH / 2;
  const centerY = SVG_HEIGHT / 2;
  const radius = Math.min(SVG_WIDTH, SVG_HEIGHT) / 2 - 80;

  // Calculate max value if not provided
  const calculatedMax = maxValue || Math.max(
    ...dataSeries.flatMap(series => series.data),
    -Infinity
  );

  const numAxes = labels.length;
  const angleStep = (2 * Math.PI) / numAxes;

  // Helper function to convert polar to cartesian coordinates
  const polarToCartesian = (angle: number, distance: number) => {
    return {
      x: centerX + distance * Math.cos(angle - Math.PI / 2),
      y: centerY + distance * Math.sin(angle - Math.PI / 2),
    };
  };

  // Calculate legend position
  const getLegendPosition = () => {
    const legendWidth = 150;
    const legendHeight = dataSeries.length * 25 + 20;
    
    switch (legendPosition) {
      case 'top':
        return { x: centerX - legendWidth / 2, y: 20 };
      case 'bottom':
        return { x: centerX - legendWidth / 2, y: SVG_HEIGHT - legendHeight - 20 };
      case 'left':
        return { x: 20, y: centerY - legendHeight / 2 };
      case 'right':
      default:
        return { x: SVG_WIDTH - legendWidth - 20, y: centerY - legendHeight / 2 };
    }
  };

  const legendPos = getLegendPosition();

  return (
    <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
      {/* Grid circles (concentric rings) */}
      {showGrid && Array.from({ length: numRings }).map((_, ringIndex) => {
        const ringRadius = (radius * (ringIndex + 1)) / numRings;
        const value = (calculatedMax * (ringIndex + 1)) / numRings;
        
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
            {/* Value label on first axis */}
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

      {/* Axis lines */}
      {labels.map((label, index) => {
        const angle = index * angleStep;
        const endPoint = polarToCartesian(angle, radius);
        
        return (
          <g key={index}>
            <line
              x1={centerX}
              y1={centerY}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="rgba(200, 200, 200, 0.5)"
              strokeWidth={1}
            />
            {/* Axis label */}
            {showLabels && (
              <text
                x={endPoint.x * 1.15}
                y={endPoint.y * 1.15}
                textAnchor="middle"
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

      {/* Data series */}
      {dataSeries.map((series, seriesIndex) => {
        const color = series.color || `hsl(${(seriesIndex * 360) / dataSeries.length}, 70%, 50%)`;
        const fillOpacity = series.fillOpacity !== undefined ? series.fillOpacity : 0.2;

        // Calculate points for this series
        const points = series.data.map((value, index) => {
          const angle = index * angleStep;
          const distance = (value / calculatedMax) * radius;
          return polarToCartesian(angle, distance);
        });

        // Create path for polygon
        const pathData = points
          .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
          .join(' ') + ' Z';

        return (
          <g key={seriesIndex}>
            {/* Filled polygon */}
            <path
              d={pathData}
              fill={color}
              fillOpacity={fillOpacity}
              stroke={color}
              strokeWidth={strokeWidth}
            />
            
            {/* Data points */}
            {showPoints && points.map((point, pointIndex) => (
              <circle
                key={pointIndex}
                cx={point.x}
                cy={point.y}
                r={pointRadius}
                fill={color}
                stroke="white"
                strokeWidth={2}
              />
            ))}
          </g>
        );
      })}

      {/* Center point */}
      <circle
        cx={centerX}
        cy={centerY}
        r={3}
        fill="#333"
      />

      {/* Legend */}
      {showLegend && (
        <g>
          <rect
            x={legendPos.x}
            y={legendPos.y}
            width={150}
            height={dataSeries.length * 25 + 20}
            fill="white"
            stroke="grey"
            strokeWidth={1}
            rx={5}
            opacity={0.95}
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
          />
          {dataSeries.map((series, index) => {
            const color = series.color || `hsl(${(index * 360) / dataSeries.length}, 70%, 50%)`;
            return (
              <g key={index}>
                <line
                  x1={legendPos.x + 10}
                  y1={legendPos.y + 20 + index * 25}
                  x2={legendPos.x + 25}
                  y2={legendPos.y + 20 + index * 25}
                  stroke={color}
                  strokeWidth={strokeWidth + 2}
                />
                <text
                  x={legendPos.x + 30}
                  y={legendPos.y + 25 + index * 25}
                  fontSize="12"
                  fill="#333"
                >
                  {series.name}
                </text>
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
}

export default PolarChart;
