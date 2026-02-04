const SVG_WIDTH = 600;
const SVG_HEIGHT = 400;

interface Props {
  labels: string[];
  data: number[];
  configs: {
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
    showLabels?: boolean; // Show percentage labels inside slices
    showLegend?: boolean;
    legendType?: 'box' | 'pin'; // 'box' for traditional legend, 'pin' for pin-type with lines
    legendPosition?: 'top' | 'bottom' | 'left' | 'right'; // Only used for box type
    labelRadius?: number; // Percentage of radius for label position (0-1), default 0.7
    pinLength?: number; // Length of pin line for pin-type legend, default 30
    showPinValues?: boolean; // Show values in pin-type legend labels
  };
}

function PieChart({ configs, data, labels }: Props) {
  const {
    backgroundColor,
    borderColor,
    borderWidth,
    showLabels = true,
    showLegend = true,
    legendType = 'box',
    legendPosition = 'right',
    labelRadius = 0.7,
    pinLength = 30,
    showPinValues = true,
  } = configs;

  const centerX = SVG_WIDTH / 2;
  const centerY = SVG_HEIGHT / 2;
  const radius = Math.min(SVG_WIDTH, SVG_HEIGHT) / 2 - 40;

  // Calculate total for percentages
  const total = data.reduce((sum, value) => sum + value, 0);

  // Calculate angles for each segment
  let currentAngle = -90; // Start from top
  const segments = data.map((value, index) => {
    const percentage = value / total;
    const angle = percentage * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    return {
      value,
      percentage,
      startAngle,
      endAngle,
      label: labels[index],
      color: backgroundColor?.[index] || `hsl(${(index * 360) / data.length}, 70%, 50%)`,
      borderColor: borderColor?.[index] || 'white',
    };
  });

  // Helper function to convert angle to coordinates
  const getCoordinates = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian),
    };
  };

  // Helper function to create pie slice path
  const createPieSlicePath = (startAngle: number, endAngle: number, r: number) => {
    const start = getCoordinates(startAngle, r);
    const end = getCoordinates(endAngle, r);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return [
      `M ${centerX} ${centerY}`,
      `L ${start.x} ${start.y}`,
      `A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
      'Z',
    ].join(' ');
  };

  // Calculate legend position
  const getLegendPosition = () => {
    const legendWidth = 150;
    const legendHeight = labels.length * 25 + 20;

    switch (legendPosition) {
      case 'top':
        return { x: centerX - legendWidth / 2, y: 20 };
      case 'bottom':
        return { x: centerX - legendWidth / 2, y: SVG_HEIGHT - legendHeight };
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
      {/* Pie slices */}
      {segments.map((segment, index) => {
        const midAngle = (segment.startAngle + segment.endAngle) / 2;
        const labelPos = getCoordinates(midAngle, radius * labelRadius);

        return (
          <g key={index}>
            <path
              d={createPieSlicePath(segment.startAngle, segment.endAngle, radius)}
              fill={segment.color}
              stroke={segment.borderColor}
              strokeWidth={borderWidth || 2}
            />
            {showLabels && segment.percentage > 0.05 && (
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fill="white"
                fontWeight="bold"
              >
                {`${(segment.percentage * 100).toFixed(1)}%`}
              </text>
            )}
          </g>
        );
      })}

      {/* Pin-type Legend (labels with connecting lines) - ALL segments get pins */}
      {showLegend && legendType === 'pin' && segments.map((segment, index) => {
        const midAngle = (segment.startAngle + segment.endAngle) / 2;
        const midAngleRad = (midAngle * Math.PI) / 180;

        // Calculate positions for pin line
        const sliceEdge = getCoordinates(midAngle, radius);
        const pinEnd = getCoordinates(midAngle, radius + pinLength);

        // Determine label position (further out) - ensure all labels are visible
        const labelDistance = radius + pinLength + 25;
        const labelPos = getCoordinates(midAngle, labelDistance);

        // Determine text anchor and position based on angle
        const isLeftSide = midAngle > 90 && midAngle < 270;
        const textAnchor = isLeftSide ? 'end' : 'start';
        const labelX = isLeftSide ? labelPos.x - 8 : labelPos.x + 8;

        // For very small segments, ensure label is still visible
        const minLabelDistance = radius + pinLength + 15;
        const adjustedLabelPos = segment.percentage < 0.05
          ? getCoordinates(midAngle, minLabelDistance)
          : labelPos;

        return (
          <g key={index}>
            {/* Pin line (connector) - always shown for all segments */}
            <line
              x1={sliceEdge.x}
              y1={sliceEdge.y}
              x2={pinEnd.x}
              y2={pinEnd.y}
              stroke="#666"
              strokeWidth={1.5}
              opacity={0.6}
            />
            {/* Color dot at pin end - always shown */}
            <circle
              cx={pinEnd.x}
              cy={pinEnd.y}
              r={5}
              fill={segment.color}
              stroke={segment.borderColor || 'white'}
              strokeWidth={borderWidth || 1.5}
            />
            {/* Label text - always shown for all segments */}
            <text
              x={isLeftSide ? adjustedLabelPos.x - 8 : adjustedLabelPos.x + 8}
              y={adjustedLabelPos.y}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              fontSize="11"
              fill="#333"
              fontWeight="500"
            >
              {segment.label}
              {showPinValues && ` (${segment.value}${segment.percentage < 0.01 ? '' : ` - ${(segment.percentage * 100).toFixed(1)}%`})`}
            </text>
          </g>
        );
      })}

      {/* Box-type Legend (traditional legend box) */}
      {showLegend && legendType === 'box' && (
        <g>
          <defs>
            <filter id="legendShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" />
            </filter>
          </defs>
          <rect
            x={legendPos.x}
            y={legendPos.y}
            width={180}
            height={labels.length * 25 + 30}
            fill="white"
            stroke="#ccc"
            strokeWidth={1}
            rx={5}
            opacity={0.95}
            filter="url(#legendShadow)"
          />
          <text
            x={legendPos.x + 10}
            y={legendPos.y + 20}
            fontSize="13"
            fontWeight="bold"
            fill="#333"
          >
            Legend
          </text>
          {segments.map((segment, index) => (
            <g key={index}>
              <rect
                x={legendPos.x + 10}
                y={legendPos.y + 30 + index * 25}
                width={15}
                height={15}
                fill={segment.color}
                stroke={segment.borderColor}
                strokeWidth={borderWidth || 1}
                rx={2}
              />
              <text
                x={legendPos.x + 30}
                y={legendPos.y + 42 + index * 25}
                fontSize="12"
                fill="#333"
              >
                {segment.label} ({segment.value})
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

export default PieChart;
