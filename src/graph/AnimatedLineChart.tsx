import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
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
    lineDashArray?: string;
}

interface Props {
    labels: string[];
    data?: number[];
    series?: LineSeries[];
    configs: {
        xAxisName?: string;
        YAxisName?: string;
        numYTicks?: number;
        showLegend?: boolean;
        legendPosition?: 'top' | 'bottom' | 'left' | 'right';
        animationDuration?: number;
        animationDelay?: number;
        animationType?: 'draw' | 'fade' | 'slide' | 'bounce';
        enableAnimation?: boolean;
        pointAnimationDelay?: number;
        seriesAnimationDelay?: number;
    };
}

function AnimatedLineChart({ configs, data, series, labels }: Props) {
    const {
        xAxisName,
        YAxisName,
        numYTicks,
        showLegend = true,
        legendPosition = 'top',
        animationDuration = 1500,
        animationDelay = 0,
        animationType = 'draw',
        enableAnimation = true,
        pointAnimationDelay = 100,
        seriesAnimationDelay = 200,
    } = configs;

    // Convert single data to series format - memoized
    const lineSeries: LineSeries[] = useMemo(() => {
        return series || (data ? [{ data }] : []);
    }, [series, data]);

    const pathRefs = useRef<(SVGPathElement | null)[]>([]);
    const [pathLengths, setPathLengths] = useState<number[]>([]);
    const [visiblePoints, setVisiblePoints] = useState<Set<string>>(new Set());
    const animationIdRef = useRef<string>(`anim-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`);
    const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

    const x0 = 50;
    const xAxisLength = SVG_WIDTH - x0 * 2;
    const y0 = 50;
    const yAxisLength = SVG_HEIGHT - y0 * 2;
    const xAxisY = y0 + yAxisLength;

    // Memoize max value calculation
    const dataYMax = useMemo(() => {
        return Math.max(...lineSeries.flatMap(s => s.data), 0);
    }, [lineSeries]);

    const pointSpacing = useMemo(() => {
        return labels.length > 1 ? xAxisLength / (labels.length - 1) : xAxisLength;
    }, [labels.length]);

    // Memoize points calculation
    const seriesPoints = useMemo(() => {
        return lineSeries.map((serie) => {
            return serie.data.map((value, index) => {
                const x = x0 + index * pointSpacing;
                const yRatio = dataYMax > 0 ? value / dataYMax : 0;
                const y = y0 + (1 - yRatio) * yAxisLength;
                return { x, y, value };
            });
        });
    }, [lineSeries, dataYMax, pointSpacing]);

    // Memoize line path creation
    const createLinePath = useCallback((points: typeof seriesPoints[0]) => {
        if (points.length === 0) return '';
        let path = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            path += ` L ${points[i].x} ${points[i].y}`;
        }
        return path;
    }, []);

    // Calculate path lengths - only when needed
    useEffect(() => {
        if (!enableAnimation || animationType !== 'draw') {
            setPathLengths([]);
            return;
        }

        const lengths = pathRefs.current.map(ref => ref?.getTotalLength() || 0);
        setPathLengths(lengths);
    }, [enableAnimation, animationType, seriesPoints.length]);

    // Cleanup timeouts on unmount or dependency change
    useEffect(() => {
        return () => {
            timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
            timeoutRefs.current = [];
        };
    }, []);

    // Optimized point animation - batch updates
    useEffect(() => {
        // Clear previous timeouts
        timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
        timeoutRefs.current = [];

        if (!enableAnimation) {
            const allPoints = new Set<string>();
            lineSeries.forEach((_, seriesIndex) => {
                lineSeries[seriesIndex].data.forEach((_, pointIndex) => {
                    allPoints.add(`${seriesIndex}-${pointIndex}`);
                });
            });
            setVisiblePoints(allPoints);
            return;
        }

        setVisiblePoints(new Set());

        lineSeries.forEach((serie, seriesIndex) => {
            const points = seriesPoints[seriesIndex];
            const seriesDelay = animationDelay + (seriesIndex * seriesAnimationDelay);
            const showPoints = serie.showPoints ?? true;

            if (!showPoints) {
                points.forEach((_, pointIndex) => {
                    setVisiblePoints(prev => new Set(prev).add(`${seriesIndex}-${pointIndex}`));
                });
                return;
            }

            if (animationType === 'draw') {
                points.forEach((_, index) => {
                    const delay = seriesDelay + (animationDuration * (index / Math.max(points.length - 1, 1)));
                    const timeout = setTimeout(() => {
                        setVisiblePoints(prev => new Set(prev).add(`${seriesIndex}-${index}`));
                    }, delay);
                    timeoutRefs.current.push(timeout);
                });
            } else {
                points.forEach((_, index) => {
                    const delay = seriesDelay + animationDuration + (index * pointAnimationDelay);
                    const timeout = setTimeout(() => {
                        setVisiblePoints(prev => new Set(prev).add(`${seriesIndex}-${index}`));
                    }, delay);
                    timeoutRefs.current.push(timeout);
                });
            }
        });
    }, [enableAnimation, animationType, animationDuration, animationDelay, pointAnimationDelay, seriesAnimationDelay, lineSeries.length, seriesPoints.length]);

    // Memoize animation styles
    const getAnimationStyle = useCallback((seriesIndex: number): React.CSSProperties => {
        if (!enableAnimation) return {};

        const pathLength = pathLengths[seriesIndex] || 0;
        const seriesDelay = animationDelay + (seriesIndex * seriesAnimationDelay);

        switch (animationType) {
            case 'draw':
                return {
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength,
                    animation: `drawLine-${animationIdRef.current}-${seriesIndex} ${animationDuration}ms ease-in-out ${seriesDelay}ms forwards`,
                };
            case 'fade':
                return {
                    opacity: 0,
                    animation: `fadeIn-${animationIdRef.current}-${seriesIndex} ${animationDuration}ms ease-in-out ${seriesDelay}ms forwards`,
                };
            case 'slide':
                return {
                    animation: `slideIn-${animationIdRef.current}-${seriesIndex} ${animationDuration}ms ease-out ${seriesDelay}ms forwards`,
                };
            case 'bounce':
                return {
                    transformOrigin: 'bottom',
                    animation: `bounceIn-${animationIdRef.current}-${seriesIndex} ${animationDuration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55) ${seriesDelay}ms forwards`,
                };
            default:
                return {};
        }
    }, [enableAnimation, animationType, animationDuration, animationDelay, seriesAnimationDelay, pathLengths]);

    // Memoize point animation style
    const getPointAnimationStyle = useCallback((seriesIndex: number, pointIndex: number) => {
        const key = `${seriesIndex}-${pointIndex}`;
        const isVisible = visiblePoints.has(key);

        if (!enableAnimation || isVisible) {
            return { opacity: 1, transform: 'scale(1)' };
        }

        return {
            opacity: 0,
            transform: animationType === 'bounce' ? 'scale(0)' : 'translateY(-20px)',
            transition: 'opacity 300ms ease-in-out, transform 300ms ease-in-out',
        };
    }, [enableAnimation, visiblePoints, animationType]);

    // Memoize legend style
    const legendStyle = useMemo((): React.CSSProperties => {
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
    }, [legendPosition]);

    // Memoize keyframes - only generate once per animation type
    const keyframes = useMemo(() => {
        if (!enableAnimation) return '';

        return lineSeries.map((_, seriesIndex) => {
            const pathLength = pathLengths[seriesIndex] || 0;
            return `
        @keyframes drawLine-${animationIdRef.current}-${seriesIndex} {
          from { stroke-dashoffset: ${pathLength}; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeIn-${animationIdRef.current}-${seriesIndex} {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn-${animationIdRef.current}-${seriesIndex} {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes bounceIn-${animationIdRef.current}-${seriesIndex} {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
      `;
        }).join('\n');
    }, [enableAnimation, lineSeries.length, pathLengths, animationIdRef.current]);

    // Memoize label visibility check
    const isLabelVisible = useCallback((index: number) => {
        if (!enableAnimation) return true;
        return lineSeries.some((_, seriesIndex) =>
            visiblePoints.has(`${seriesIndex}-${index}`)
        );
    }, [enableAnimation, lineSeries.length, visiblePoints]);

    return (
        <div style={{ position: 'relative', width: SVG_WIDTH, height: SVG_HEIGHT }}>
            {keyframes && <style>{keyframes}</style>}
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

                {seriesPoints.map((points, seriesIndex) => {
                    const serie = lineSeries[seriesIndex];
                    const strokeColor = serie.strokeColor || `hsl(${(seriesIndex * 360) / lineSeries.length}, 70%, 50%)`;
                    const strokeWidth = serie.strokeWidth ?? 2;

                    return (
                        <g key={seriesIndex}>
                            <path
                                ref={(el) => {
                                    pathRefs.current[seriesIndex] = el;
                                }}
                                d={createLinePath(points)}
                                fill="none"
                                stroke={strokeColor}
                                strokeWidth={strokeWidth}
                                strokeDasharray={serie.lineDashArray}
                                style={getAnimationStyle(seriesIndex)}
                            />

                            {(serie.showPoints ?? true) && points.map((point, index) => (
                                <circle
                                    key={index}
                                    cx={point.x}
                                    cy={point.y}
                                    r={serie.pointRadius ?? 4}
                                    fill={serie.pointFillColor || strokeColor}
                                    stroke={serie.pointStrokeColor || "white"}
                                    strokeWidth={2}
                                    style={getPointAnimationStyle(seriesIndex, index)}
                                />
                            ))}
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
                            style={
                                enableAnimation
                                    ? {
                                        opacity: isLabelVisible(index) ? 1 : 0.3,
                                        transition: 'opacity 300ms ease-in-out',
                                    }
                                    : {}
                            }
                        >
                            {label}
                        </text>
                    );
                })}
            </svg>

            {showLegend && lineSeries.length > 1 && (
                <div style={{ ...legendStyle, display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    {lineSeries.map((serie, index) => {
                        const strokeColor = serie.strokeColor || `hsl(${(index * 360) / lineSeries.length}, 70%, 50%)`;
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

export default AnimatedLineChart;
