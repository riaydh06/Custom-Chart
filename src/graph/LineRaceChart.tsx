import React, { useState, useEffect } from "react";
import Axis from "../components/Axis";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 400;

interface DataSeries {
  name: string;
  data: number[];
  color?: string;
}

interface Props {
  labels: string[]; // Time periods (e.g., ['2020', '2021', '2022'])
  dataSeries: DataSeries[]; // Multiple series to race
  configs: {
    xAxisName?: string;
    YAxisName?: string;
    numYTicks?: number;
    strokeWidth?: number;
    showPoints?: boolean;
    pointRadius?: number;
    animated?: boolean;
    animationDuration?: number; // milliseconds per frame
    showLegend?: boolean;
    legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  };
}

function LineRaceChart({ configs, dataSeries, labels }: Props) {
  const {
    strokeWidth = 2,
    xAxisName,
    YAxisName,
    numYTicks,
    showPoints = true,
    pointRadius = 4,
    animated = false,
    animationDuration = 100,
    showLegend = true,
    legendPosition = 'right',
  } = configs;

  const [currentFrame, setCurrentFrame] = useState(animated ? 0 : labels.length - 1);

  // Find max value across all series and all time periods
  const dataYMax = Math.max(
    ...dataSeries.flatMap(series => series.data),
    -Infinity
  );

  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;

  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;

  const xAxisY = y0 + yAxisLength;

  // Animation effect
  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev >= labels.length - 1) {
          return 0; // Reset to start
        }
        return prev + 1;
      });
    }, animationDuration);

    return () => clearInterval(interval);
  }, [animated, labels.length, animationDuration]);

  // Calculate points for each series up to current frame
  const pointSpacing = xAxisLength / (labels.length - 1);
  
  const seriesPaths = dataSeries.map((series, seriesIndex) => {
    const visibleData = animated 
      ? series.data.slice(0, currentFrame + 1)
      : series.data;
    
    const points = visibleData.map((value, index) => {
      const x = x0 + index * pointSpacing;
      const yRatio = value / dataYMax;
      const y = y0 + (1 - yRatio) * yAxisLength;
      return { x, y, value, label: labels[index] };
    });

    // Create line path
    const createLinePath = () => {
      if (points.length === 0) return '';
      const pathParts: string[] = [];
      pathParts.push(`M ${points[0].x} ${points[0].y}`);
      for (let i = 1; i < points.length; i++) {
        pathParts.push(`L ${points[i].x} ${points[i].y}`);
      }
      return pathParts.join(' ');
    };

    return {
      name: series.name,
      color: series.color || `hsl(${(seriesIndex * 360) / dataSeries.length}, 70%, 50%)`,
      points,
      path: createLinePath(),
    };
  });

  // Calculate legend position
  const getLegendPosition = () => {
    const legendWidth = 150;
    const legendHeight = dataSeries.length * 25 + 20;
    
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

  const centerX = SVG_WIDTH / 2;
  const centerY = SVG_HEIGHT / 2;
  const legendPos = getLegendPosition();

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
      
      {/* Draw all racing lines */}
      {seriesPaths.map((series, seriesIndex) => (
        <g key={seriesIndex}>
          {/* Line */}
          <path
            d={series.path}
            fill="none"
            stroke={series.color}
            strokeWidth={strokeWidth}
          />
          
          {/* Data points */}
          {showPoints && series.points.map((point, pointIndex) => (
            <g key={pointIndex}>
              <circle
                cx={point.x}
                cy={point.y}
                r={pointRadius}
                fill={series.color}
                stroke="white"
                strokeWidth={2}
              />
            </g>
          ))}
        </g>
      ))}
      
      {/* X-axis labels */}
      {labels.map((label, index) => {
        const x = x0 + index * pointSpacing;
        const isVisible = !animated || index <= currentFrame;
        return (
          <text
            key={index}
            x={x}
            y={xAxisY + 16}
            textAnchor="middle"
            fontSize="12"
            opacity={isVisible ? 1 : 0.3}
          >
            {label}
          </text>
        );
      })}

      {/* Current frame indicator (for animated mode) */}
      {animated && (
        <text
          x={centerX}
          y={y0 - 10}
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#333"
        >
          {labels[currentFrame]}
        </text>
      )}

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
            opacity={0.9}
          />
          {seriesPaths.map((series, index) => (
            <g key={index}>
              <line
                x1={legendPos.x + 10}
                y1={legendPos.y + 20 + index * 25}
                x2={legendPos.x + 25}
                y2={legendPos.y + 20 + index * 25}
                stroke={series.color}
                strokeWidth={strokeWidth + 2}
              />
              <text
                x={legendPos.x + 30}
                y={legendPos.y + 25 + index * 25}
                fontSize="12"
                fill="black"
              >
                {series.name}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

export default LineRaceChart;
