import React from "react";
import Axis from "../components/Axis";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 300;

interface AreaSeries {
    data: number[];
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    fillOpacity?: number;
    label?: string;
    showPoints?: boolean;
    pointRadius?: number;
}

interface Props {
    labels: string[];
    series: AreaSeries[];
    configs: {
        xAxisName?: string;
        YAxisName?: string;
        numYTicks?: number;
        stacked?: boolean; // If true, areas are stacked; if false, they overlap
        showLegend?: boolean;
        legendPosition?: 'top' | 'bottom' | 'left' | 'right';
    };
}

function MultiAreaChart({ configs, series, labels }: Props) {
    const {
        xAxisName,
        YAxisName,
        numYTicks,
        stacked = false,
        showLegend = true,
        legendPosition = 'top',
    } = configs;

    const x0 = 50;
    const xAxisLength = SVG_WIDTH - x0 * 2;
    const y0 = 50;
    const yAxisLength = SVG_HEIGHT - y0 * 2;
    const xAxisY = y0 + yAxisLength;

    // Calculate max value for scaling
    let dataYMax: number;
    if (stacked) {
        // For stacked, sum all series at each point and find max
        const stackedMax = labels.map((_, index) => {
            return series.reduce((sum, s) => sum + (s.data[index] || 0), 0);
        });
        dataYMax = Math.max(...stackedMax, 0);
    } else {
        // For overlapping, find max across all series
        dataYMax = Math.max(
            ...series.flatMap(s => s.data),
            0
        );
    }

    const pointSpacing = labels.length > 1 ? xAxisLength / (labels.length - 1) : xAxisLength;

    // Calculate points for each series
    const seriesPoints = series.map((serie, seriesIndex) => {
        if (stacked) {
            // For stacked, accumulate values from previous series
            const cumulativeData = labels.map((_, index) => {
                let sum = 0;
                for (let i = 0; i <= seriesIndex; i++) {
                    sum += series[i].data[index] || 0;
                }
                return sum;
            });

            return cumulativeData.map((value, index) => {
                const x = x0 + index * pointSpacing;
                const yRatio = dataYMax > 0 ? value / dataYMax : 0;
                const y = y0 + (1 - yRatio) * yAxisLength;
                return { x, y, value, originalValue: serie.data[index] || 0 };
            });
        } else {
            // For overlapping, each series is independent
            return serie.data.map((value, index) => {
                const x = x0 + index * pointSpacing;
                const yRatio = dataYMax > 0 ? value / dataYMax : 0;
                const y = y0 + (1 - yRatio) * yAxisLength;
                return { x, y, value, originalValue: value };
            });
        }
    });

    // Create area path for a series
    const createAreaPath = (points: typeof seriesPoints[0], baseY: number = xAxisY) => {
        if (points.length === 0) return '';

        const pathParts: string[] = [];

        // Start at first point on base line
        pathParts.push(`M ${points[0].x} ${baseY}`);

        // Draw line to first data point
        pathParts.push(`L ${points[0].x} ${points[0].y}`);

        // Draw line through all data points
        for (let i = 1; i < points.length; i++) {
            pathParts.push(`L ${points[i].x} ${points[i].y}`);
        }

        // Draw line to last point on base line
        pathParts.push(`L ${points[points.length - 1].x} ${baseY}`);

        // Close the path
        pathParts.push('Z');

        return pathParts.join(' ');
    };

    // Create line path (just the top line)
    const createLinePath = (points: typeof seriesPoints[0]) => {
        if (points.length === 0) return '';

        const pathParts: string[] = [];
        pathParts.push(`M ${points[0].x} ${points[0].y}`);

        for (let i = 1; i < points.length; i++) {
            pathParts.push(`L ${points[i].x} ${points[i].y}`);
        }

        return pathParts.join(' ');
    };

    // Get base points for stacked areas (bottom of current stack)
    const getBasePoints = (seriesIndex: number) => {
        if (!stacked || seriesIndex === 0) {
            return labels.map((_, index) => ({ x: x0 + index * pointSpacing, y: xAxisY }));
        }

        // Calculate cumulative values up to previous series
        return labels.map((_, index) => {
            let sum = 0;
            for (let i = 0; i < seriesIndex; i++) {
                sum += series[i].data[index] || 0;
            }
            const yRatio = dataYMax > 0 ? sum / dataYMax : 0;
            const y = y0 + (1 - yRatio) * yAxisLength;
            return { x: x0 + index * pointSpacing, y };
        });
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

                {/* Render areas (from bottom to top for proper layering) */}
                {seriesPoints.map((points, seriesIndex) => {
                    const serie = series[seriesIndex];
                    const fillColor = serie.fillColor || `hsl(${(seriesIndex * 360) / series.length}, 70%, 50%)`;
                    const strokeColor = serie.strokeColor || fillColor;
                    const fillOpacity = serie.fillOpacity ?? 0.3;
                    const strokeWidth = serie.strokeWidth ?? 2;

                    // For stacked, calculate base points
                    const basePoints = getBasePoints(seriesIndex);

                    // Create area path with base
                    const areaPath = stacked
                        ? (() => {
                            const pathParts: string[] = [];
                            // Start from first base point
                            pathParts.push(`M ${basePoints[0].x} ${basePoints[0].y}`);
                            // Draw along base (left to right)
                            for (let i = 1; i < basePoints.length; i++) {
                                pathParts.push(`L ${basePoints[i].x} ${basePoints[i].y}`);
                            }
                            // Draw along top (right to left)
                            for (let i = points.length - 1; i >= 0; i--) {
                                pathParts.push(`L ${points[i].x} ${points[i].y}`);
                            }
                            pathParts.push('Z');
                            return pathParts.join(' ');
                        })()
                        : createAreaPath(points);

                    return (
                        <g key={seriesIndex}>
                            {/* Area fill */}
                            <path
                                d={areaPath}
                                fill={fillColor}
                                fillOpacity={fillOpacity}
                            />

                            {/* Top line/border */}
                            <path
                                d={createLinePath(points)}
                                fill="none"
                                stroke={strokeColor}
                                strokeWidth={strokeWidth}
                            />

                            {/* Data points */}
                            {(serie.showPoints ?? false) && points.map((point, index) => (
                                <circle
                                    key={index}
                                    cx={point.x}
                                    cy={point.y}
                                    r={serie.pointRadius ?? 4}
                                    fill={strokeColor}
                                    stroke="white"
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
                        const fillColor = serie.fillColor || `hsl(${(index * 360) / series.length}, 70%, 50%)`;
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
                                        width: '15px',
                                        height: '15px',
                                        backgroundColor: fillColor,
                                        border: `1px solid ${serie.strokeColor || fillColor}`,
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

export default MultiAreaChart;
