import React from "react";
import Axis from "../components/Axis";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 300;

interface LineSeries {
  data: number[];
  strokeColor?: string;
  strokeWidth?: number;
  label?: string;
  showPoints?: boolean;
  pointRadius?: number;
  pointFillColor?: string;
  pointStrokeColor?: string;
  lineDashArray?: string; // For dashed lines, e.g., "5,5"
}

interface Props {
  labels: string[];
  series: LineSeries[];
  configs: {
    xAxisName?: string;
    YAxisName?: string;
    numYTicks?: number;
    showLegend?: boolean;
    legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  };
}

function MultiLineChart({ configs, series, labels }: Props) {
  const {
    xAxisName,
    YAxisName,
    numYTicks,
    showLegend = true,
    legendPosition = 'top',
  } = configs;

  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;
  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;
  const xAxisY = y0 + yAxisLength;

  // Calculate max value across all series for scaling
  const dataYMax = Math.max(
    ...series.flatMap(s => s.data),
    0
  );

  const pointSpacing = labels.length > 1 ? xAxisLength / (labels.length - 1) : xAxisLength;

  // Calculate points for each series
  const seriesPoints = series.map((serie) => {
    return serie.data.map((value, index) => {
      const x = x0 + index * pointSpacing;
      const yRatio = dataYMax > 0 ? value / dataYMax : 0;
      const y = y0 + (1 - yRatio) * yAxisLength;
      return { x, y, value };
    });
  });

  // Create line path for a series
  const createLinePath = (points: typeof seriesPoints[0]) => {
    if (points.length === 0) return '';
    
    const pathParts: string[] = [];
    pathParts.push(`M ${points[0].x} ${points[0].y}`);
    
    for (let i = 1; i < points.length; i++) {
      pathParts.push(`L ${points[i].x} ${points[i].y}`);
    }
    
    return pathParts.join(' ');
  };

  // Legend positioning
  const getLegendStyle = (): React.CSSProperties => {
    switch (legendPosition) {
      case 'top':
        return { position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom':
        return { position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)' };
      case 'left':
        return { position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', flexDirection: 'column' };
      case 'right':
        return { position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', flexDirection: 'column' };
      default:
        return { position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)' };
    }
  };

  return (
    <div style={{ position: 'relative', width: SVG_WIDTH, height: SVG_HEIGHT }}>
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

        {/* Render lines */}
        {seriesPoints.map((points, seriesIndex) => {
          const serie = series[seriesIndex];
          const strokeColor = serie.strokeColor || `hsl(${(seriesIndex * 360) / series.length}, 70%, 50%)`;
          const strokeWidth = serie.strokeWidth ?? 2;

          return (
            <g key={seriesIndex}>
              {/* Line */}
              <path
                d={createLinePath(points)}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={serie.lineDashArray}
              />
              
              {/* Data points */}
              {(serie.showPoints ?? true) && points.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r={serie.pointRadius ?? 4}
                  fill={serie.pointFillColor || strokeColor}
                  stroke={serie.pointStrokeColor || "white"}
                  strokeWidth={2}
                />
              ))}
            </g>
          );
        })}

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
              fill="#333"
            >
              {label}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      {showLegend && series.length > 0 && (
        <div style={{ ...getLegendStyle(), display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {series.map((serie, index) => {
            const strokeColor = serie.strokeColor || `hsl(${(index * 360) / series.length}, 70%, 50%)`;
            const label = serie.label || `Series ${index + 1}`;
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '12px',
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '2px',
                    backgroundColor: strokeColor,
                    border: 'none',
                  }}
                />
                <span style={{ color: '#333' }}>{label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MultiLineChart;
