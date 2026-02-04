import Axis from "../components/Axis";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 300;

interface Props {
    labels: string[];
    columnData: number[]; // Data for column chart (left Y-axis)
    lineData: number[]; // Data for line chart (right Y-axis)
    configs: {
        xAxisName?: string;
        leftYAxisName?: string; // Name for left Y-axis (columns)
        rightYAxisName?: string; // Name for right Y-axis (line)
        columnColor?: string | string[]; // Color(s) for columns
        columnBorderColor?: string | string[];
        columnBorderWidth?: number;
        lineColor?: string;
        lineWidth?: number;
        lineDashArray?: string;
        showLinePoints?: boolean;
        pointRadius?: number;
        pointFillColor?: string;
        pointStrokeColor?: string;
        numLeftYTicks?: number;
        numRightYTicks?: number;
    };
}

function DualAxesChart({ configs, columnData, lineData, labels }: Props) {
    const {
        xAxisName,
        leftYAxisName,
        rightYAxisName,
        columnColor = "#3B82F6",
        columnBorderColor,
        columnBorderWidth = 1,
        lineColor = "#EF4444",
        lineWidth = 2,
        lineDashArray,
        showLinePoints = true,
        pointRadius = 4,
        pointFillColor,
        pointStrokeColor = "white",
        numLeftYTicks = 5,
        numRightYTicks = 5,
    } = configs;

    // Left side padding for left Y-axis labels
    const leftPadding = 60;
    // Right side padding for right Y-axis labels
    const rightPadding = 60;
    const x0 = leftPadding;
    const xAxisLength = SVG_WIDTH - leftPadding - rightPadding;

    const y0 = 50;
    const yAxisLength = SVG_HEIGHT - y0 * 2;
    const xAxisY = y0 + yAxisLength;

    // Calculate max values for both axes
    const columnYMax = Math.max(...columnData, 0);
    const lineYMax = Math.max(...lineData, 0);

    // Calculate bar width
    const barPlotWidth = xAxisLength / labels.length;

    // Calculate points for the line
    const pointSpacing = xAxisLength / (lineData.length - 1);
    const linePoints = lineData.map((value, index) => {
        const x = x0 + index * pointSpacing;
        const yRatio = value / lineYMax;
        const y = y0 + (1 - yRatio) * yAxisLength;
        return { x, y, value };
    });

    // Create line path
    const createLinePath = () => {
        const pathParts: string[] = [];
        pathParts.push(`M ${linePoints[0].x} ${linePoints[0].y}`);
        for (let i = 1; i < linePoints.length; i++) {
            pathParts.push(`L ${linePoints[i].x} ${linePoints[i].y}`);
        }
        return pathParts.join(' ');
    };

    // Helper function to render right Y-axis
    const renderRightYAxis = () => {
        const rightAxisX = x0 + xAxisLength;
        const valueRange = lineYMax;

        return (
            <>
                {/* Right Y axis line */}
                <line
                    x1={rightAxisX}
                    y1={y0 + yAxisLength}
                    x2={rightAxisX}
                    y2={y0}
                    stroke="grey"
                />

                {/* Right Y axis ticks and labels */}
                {Array.from({ length: numRightYTicks + 1 }).map((_, index) => {
                    const y = y0 + index * (yAxisLength / numRightYTicks);
                    const yValue = (lineYMax - index * (valueRange / numRightYTicks)).toFixed(1);

                    return (
                        <g key={index}>
                            <line
                                x1={rightAxisX}
                                y1={y}
                                x2={rightAxisX - 5}
                                y2={y}
                                stroke="grey"
                            />
                            <text
                                x={rightAxisX + 5}
                                y={y + 5}
                                textAnchor="start"
                                fontSize="11"
                                fill="#666"
                            >
                                {yValue}
                            </text>
                        </g>
                    );
                })}

                {/* Right Y axis name */}
                {rightYAxisName && (
                    <text
                        x={rightAxisX}
                        y={y0 - 8}
                        textAnchor="middle"
                        fontSize="12"
                        fill="#666"
                    >
                        {rightYAxisName}
                    </text>
                )}
            </>
        );
    };

    return (
        <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
            {/* Left Y-axis (for columns) */}
            <Axis
                x0={x0}
                xAxisY={xAxisY}
                xAxisLength={xAxisLength}
                xAxisName={xAxisName}
                y0={y0}
                yAxisLength={yAxisLength}
                YAxisName={leftYAxisName}
                numYTicks={numLeftYTicks}
                dataYMax={columnYMax}
            />

            {/* Right Y-axis (for line) */}
            {renderRightYAxis()}

            {/* Column bars */}
            {labels.map((label, index) => {
                const x = x0 + index * barPlotWidth;
                const yRatio = columnData[index] / columnYMax;
                const y = y0 + (1 - yRatio) * yAxisLength;
                const height = yRatio * yAxisLength;

                const sidePadding = 10;
                const colColor = Array.isArray(columnColor)
                    ? columnColor[index] || columnColor[0]
                    : columnColor;
                const colBorderColor = Array.isArray(columnBorderColor)
                    ? columnBorderColor[index] || columnBorderColor[0]
                    : columnBorderColor || colColor;

                return (
                    <g key={`column-${index}`}>
                        <rect
                            x={x + sidePadding / 2}
                            y={y}
                            width={barPlotWidth - sidePadding}
                            height={height}
                            fill={colColor}
                            stroke={colBorderColor}
                            strokeWidth={columnBorderWidth}
                            opacity={0.7}
                        />
                        {/* X-axis labels */}
                        <text
                            x={x + barPlotWidth / 2}
                            y={xAxisY + 16}
                            textAnchor="middle"
                            fontSize="12"
                            fill="#333"
                        >
                            {label}
                        </text>
                    </g>
                );
            })}

            {/* Line */}
            <path
                d={createLinePath()}
                fill="none"
                stroke={lineColor}
                strokeWidth={lineWidth}
                strokeDasharray={lineDashArray}
            />

            {/* Line data points */}
            {showLinePoints &&
                linePoints.map((point, index) => (
                    <g key={`point-${index}`}>
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={pointRadius}
                            fill={pointFillColor || lineColor}
                            stroke={pointStrokeColor}
                            strokeWidth={2}
                        />
                    </g>
                ))}
        </svg>
    );
}

export default DualAxesChart;
