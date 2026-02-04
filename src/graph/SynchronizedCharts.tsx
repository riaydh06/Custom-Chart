import React, { useState } from "react";
import Axis from "../components/Axis";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 300;

interface ChartConfig {
  type: 'line' | 'bar' | 'area';
  labels: string[];
  data: number[];
  configs: {
    xAxisName?: string;
    YAxisName?: string;
    strokeColor?: string;
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    strokeWidth?: number;
    numYTicks?: number;
    showPoints?: boolean;
    pointRadius?: number;
    lineDashArray?: string;
    fillOpacity?: number;
  };
}

interface Props {
  charts: ChartConfig[];
  highlightColor?: string;
  highlightOpacity?: number;
  layout?: 'vertical' | 'horizontal' | 'grid';
}

function SynchronizedCharts({ charts, highlightColor = "#FFD700", highlightOpacity = 0.3, layout = 'vertical' }: Props) {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const renderChart = (chart: ChartConfig, chartIndex: number) => {
    const {
      type,
      labels,
      data,
      configs: {
        xAxisName,
        YAxisName,
        strokeColor = "#3B82F6",
        backgroundColor = "#3B82F6",
        borderColor,
        borderWidth = 1,
        strokeWidth = 2,
        numYTicks = 5,
        showPoints = true,
        pointRadius = 4,
        lineDashArray,
        fillOpacity = 0.3,
      },
    } = chart;

    const x0 = 50;
    const xAxisLength = SVG_WIDTH - x0 * 2;
    const y0 = 50;
    const yAxisLength = SVG_HEIGHT - y0 * 2;
    const xAxisY = y0 + yAxisLength;

    const dataYMax = Math.max(...data, 0);

    // Calculate positions for bars
    const barPlotWidth = xAxisLength / labels.length;
    
    // Calculate positions for line/area points
    const pointSpacing = labels.length > 1 ? xAxisLength / (labels.length - 1) : xAxisLength;
    const points = data.map((value, index) => {
      const x = x0 + (labels.length > 1 ? index * pointSpacing : xAxisLength / 2);
      const yRatio = dataYMax > 0 ? value / dataYMax : 0;
      const y = y0 + (1 - yRatio) * yAxisLength;
      return { x, y, value, index };
    });

    // Create line/area path
    const createPath = (closePath = false) => {
      if (points.length === 0) return '';
      const pathParts: string[] = [];
      pathParts.push(`M ${points[0].x} ${points[0].y}`);
      for (let i = 1; i < points.length; i++) {
        pathParts.push(`L ${points[i].x} ${points[i].y}`);
      }
      if (closePath) {
        pathParts.push(`L ${points[points.length - 1].x} ${xAxisY}`);
        pathParts.push(`L ${points[0].x} ${xAxisY}`);
        pathParts.push('Z');
      }
      return pathParts.join(' ');
    };

    // Get color for a specific index
    const getColor = (index: number) => {
      if (Array.isArray(backgroundColor)) {
        return backgroundColor[index] || backgroundColor[0] || strokeColor;
      }
      return backgroundColor;
    };

    const getBorderColor = (index: number) => {
      if (Array.isArray(borderColor)) {
        return borderColor[index] || borderColor[0] || getColor(index);
      }
      return borderColor || getColor(index);
    };

    return (
      <svg
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        key={chartIndex}
        style={{ display: 'block' }}
      >
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

        {/* Highlight overlay */}
        {highlightedIndex !== null && (
          <rect
            x={
              type === 'bar'
                ? x0 + highlightedIndex * barPlotWidth
                : x0 + highlightedIndex * pointSpacing - pointSpacing / 2
            }
            y={y0}
            width={type === 'bar' ? barPlotWidth : pointSpacing}
            height={yAxisLength}
            fill={highlightColor}
            opacity={highlightOpacity}
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* Render based on chart type */}
        {type === 'bar' && labels.map((label, index) => {
          const x = x0 + index * barPlotWidth;
          const yRatio = data[index] / dataYMax;
          const y = y0 + (1 - yRatio) * yAxisLength;
          const height = yRatio * yAxisLength;
          const sidePadding = 10;
          const isHighlighted = highlightedIndex === index;

          return (
            <g
              key={index}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseLeave={() => setHighlightedIndex(null)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={x + sidePadding / 2}
                y={y}
                width={barPlotWidth - sidePadding}
                height={height}
                fill={getColor(index)}
                stroke={getBorderColor(index)}
                strokeWidth={isHighlighted ? borderWidth + 2 : borderWidth}
                opacity={isHighlighted ? 1 : 0.8}
              />
              <text
                x={x + barPlotWidth / 2}
                y={xAxisY + 16}
                textAnchor="middle"
                fontSize="12"
                fill="#333"
                fontWeight={isHighlighted ? 'bold' : 'normal'}
              >
                {label}
              </text>
            </g>
          );
        })}

        {type === 'line' && (
          <>
            <path
              d={createPath()}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={lineDashArray}
            />
            {showPoints && points.map((point) => {
              const isHighlighted = highlightedIndex === point.index;
              return (
                <g
                  key={point.index}
                  onMouseEnter={() => setHighlightedIndex(point.index)}
                  onMouseLeave={() => setHighlightedIndex(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isHighlighted ? pointRadius + 2 : pointRadius}
                    fill={strokeColor}
                    stroke="white"
                    strokeWidth={isHighlighted ? 3 : 2}
                  />
                </g>
              );
            })}
            {labels.map((label, index) => {
              const x = x0 + index * pointSpacing;
              return (
                <text
                  key={index}
                  x={x}
                  y={xAxisY + 16}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#333"
                  fontWeight={highlightedIndex === index ? 'bold' : 'normal'}
                >
                  {label}
                </text>
              );
            })}
          </>
        )}

        {type === 'area' && (
          <>
            <path
              d={createPath(true)}
              fill={strokeColor}
              fillOpacity={fillOpacity}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            {showPoints && points.map((point) => {
              const isHighlighted = highlightedIndex === point.index;
              return (
                <g
                  key={point.index}
                  onMouseEnter={() => setHighlightedIndex(point.index)}
                  onMouseLeave={() => setHighlightedIndex(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={isHighlighted ? pointRadius + 2 : pointRadius}
                    fill={strokeColor}
                    stroke="white"
                    strokeWidth={isHighlighted ? 3 : 2}
                  />
                </g>
              );
            })}
            {labels.map((label, index) => {
              const x = x0 + index * pointSpacing;
              return (
                <text
                  key={index}
                  x={x}
                  y={xAxisY + 16}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#333"
                  fontWeight={highlightedIndex === index ? 'bold' : 'normal'}
                >
                  {label}
                </text>
              );
            })}
          </>
        )}
      </svg>
    );
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: layout === 'horizontal' ? 'row' : 'column',
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: layout === 'grid' ? 'wrap' : 'nowrap',
  };

  return (
    <div style={containerStyle}>
      {charts.map((chart, index) => renderChart(chart, index))}
    </div>
  );
}

export default SynchronizedCharts;
