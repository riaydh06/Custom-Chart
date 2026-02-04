import React, { useState } from "react";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 400;

interface DrilldownData {
  name: string;
  value: number;
  color?: string;
}

interface DrilldownLevels {
  [key: string]: DrilldownData[]; // Key matches label or index
}

interface Props {
  labels: string[];
  data: number[];
  drilldown?: DrilldownLevels; // Optional drilldown data, keyed by label or index
  configs: {
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
    showLabels?: boolean;
    showLegend?: boolean;
    legendType?: 'box' | 'pin';
    legendPosition?: 'top' | 'bottom' | 'left' | 'right';
    labelRadius?: number;
    pinLength?: number;
    showPinValues?: boolean;
    onDrilldown?: (drilldownKey: string) => void;
    onDrillup?: () => void;
  };
}

function PieDrilldownChart({ configs, data, labels, drilldown }: Props) {
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
    onDrilldown,
    onDrillup,
  } = configs;

  const [currentDrilldown, setCurrentDrilldown] = useState<string | null>(null);
  const [drilldownHistory, setDrilldownHistory] = useState<string[]>([]);

  const centerX = SVG_WIDTH / 2;
  const centerY = SVG_HEIGHT / 2;
  const radius = Math.min(SVG_WIDTH, SVG_HEIGHT) / 2 - 60;

  // Determine current data to display
  const getCurrentData = (): Array<{ name: string; value: number; color?: string; drilldownKey?: string }> => {
    if (currentDrilldown && drilldown && drilldown[currentDrilldown]) {
      return drilldown[currentDrilldown].map(item => ({
        name: item.name,
        value: item.value,
        color: item.color,
      }));
    }
    // Main level data
    return labels.map((label, index) => {
      const drilldownKey = drilldown 
        ? (Object.keys(drilldown).find(key => label === key || index.toString() === key) || undefined)
        : undefined;
      return {
        name: label,
        value: data[index],
        color: backgroundColor?.[index],
        drilldownKey,
      };
    });
  };

  const currentData = getCurrentData();
  const total = currentData.reduce((sum, item) => sum + item.value, 0);

  // Calculate angles for each segment
  let currentAngle = -90; // Start from top
  const segments = currentData.map((item, index) => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    return {
      value: item.value,
      percentage,
      startAngle,
      endAngle,
      label: item.name,
      color: item.color || `hsl(${(index * 360) / currentData.length}, 70%, 50%)`,
      borderColor: borderColor?.[index] || 'white',
      hasDrilldown: !!item.drilldownKey,
      drilldownKey: item.drilldownKey,
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

  const handleSliceClick = (drilldownKey: string | undefined) => {
    if (drilldownKey && drilldown && drilldown[drilldownKey]) {
      setCurrentDrilldown(drilldownKey);
      setDrilldownHistory([...drilldownHistory, drilldownKey]);
      if (onDrilldown) {
        onDrilldown(drilldownKey);
      }
    }
  };

  const handleDrillup = () => {
    if (drilldownHistory.length > 0) {
      const newHistory = drilldownHistory.slice(0, -1);
      setDrilldownHistory(newHistory);
      setCurrentDrilldown(newHistory.length > 0 ? newHistory[newHistory.length - 1] : null);
    } else {
      setCurrentDrilldown(null);
      setDrilldownHistory([]);
    }
    if (onDrillup) {
      onDrillup();
    }
  };

  // Calculate legend position
  const getLegendPosition = () => {
    const legendWidth = 150;
    const legendHeight = segments.length * 25 + 20;
    
    switch (legendPosition) {
      case 'top':
        return { x: centerX - legendWidth / 2, y: 20 };
      case 'bottom':
        return { x: centerX - legendWidth / 2, y: SVG_HEIGHT - legendHeight - 40 };
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
      {/* Back button (if drilled down) */}
      {currentDrilldown && (
        <g>
          <rect
            x={20}
            y={20}
            width={80}
            height={30}
            fill="#2196F3"
            stroke="#1565C0"
            strokeWidth={1}
            rx={5}
            cursor="pointer"
            onClick={handleDrillup}
          />
          <text
            x={60}
            y={39}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="white"
            fontWeight="bold"
            cursor="pointer"
          >
            ← Back
          </text>
        </g>
      )}

      {/* Current level indicator */}
      {currentDrilldown && (
        <text
          x={centerX}
          y={30}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#333"
        >
          {currentDrilldown}
        </text>
      )}

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
              cursor={segment.hasDrilldown ? 'pointer' : 'default'}
              onClick={() => segment.hasDrilldown && handleSliceClick(segment.drilldownKey)}
              style={{
                opacity: segment.hasDrilldown ? 0.9 : 0.8,
              }}
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
                pointerEvents="none"
              >
                {`${(segment.percentage * 100).toFixed(1)}%`}
              </text>
            )}
            {/* Drilldown indicator */}
            {segment.hasDrilldown && (
              <text
                x={labelPos.x}
                y={labelPos.y + 15}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fill="white"
                fontWeight="bold"
                pointerEvents="none"
              >
                ▼
              </text>
            )}
          </g>
        );
      })}

      {/* Pin-type Legend */}
      {showLegend && legendType === 'pin' && segments.map((segment, index) => {
        const midAngle = (segment.startAngle + segment.endAngle) / 2;
        const sliceEdge = getCoordinates(midAngle, radius);
        const pinEnd = getCoordinates(midAngle, radius + pinLength);
        const labelDistance = radius + pinLength + 25;
        const labelPos = getCoordinates(midAngle, labelDistance);
        const isLeftSide = midAngle > 90 && midAngle < 270;
        const textAnchor = isLeftSide ? 'end' : 'start';
        const minLabelDistance = radius + pinLength + 15;
        const adjustedLabelPos = segment.percentage < 0.05 
          ? getCoordinates(midAngle, minLabelDistance)
          : labelPos;

        return (
          <g key={index}>
            <line
              x1={sliceEdge.x}
              y1={sliceEdge.y}
              x2={pinEnd.x}
              y2={pinEnd.y}
              stroke="#666"
              strokeWidth={1.5}
              opacity={0.6}
            />
            <circle
              cx={pinEnd.x}
              cy={pinEnd.y}
              r={5}
              fill={segment.color}
              stroke={segment.borderColor || 'white'}
              strokeWidth={borderWidth || 1.5}
            />
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

      {/* Box-type Legend */}
      {showLegend && legendType === 'box' && (
        <g>
          <defs>
            <filter id="drilldownLegendShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.1" />
            </filter>
          </defs>
          <rect
            x={legendPos.x}
            y={legendPos.y}
            width={180}
            height={segments.length * 25 + 30}
            fill="white"
            stroke="#ccc"
            strokeWidth={1}
            rx={5}
            opacity={0.95}
            filter="url(#drilldownLegendShadow)"
          />
          <text
            x={legendPos.x + 10}
            y={legendPos.y + 20}
            fontSize="13"
            fontWeight="bold"
            fill="#333"
          >
            {currentDrilldown ? 'Drilldown' : 'Legend'}
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
                {segment.hasDrilldown && ' ▼'}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

export default PieDrilldownChart;
