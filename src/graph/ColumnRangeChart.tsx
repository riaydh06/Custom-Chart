import Axis from "../components/Axis";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 400;

interface RangeData {
    low: number;
    high: number;
}

interface Props {
    labels: string[];
    data: RangeData[]; // Array of {low, high} values
    configs: {
        xAxisName?: string;
        YAxisName?: string;
        backgroundColor?: string[];
        borderColor?: string[];
        borderWidth?: number;
        numYTicks?: number;
        showValues?: boolean; // Show low/high values on bars
    };
}

function ColumnRangeChart({ configs, data, labels }: Props) {
    const {
        backgroundColor,
        borderColor,
        borderWidth,
        xAxisName,
        YAxisName,
        numYTicks,
        showValues = false,
    } = configs;

    const x0 = 50;
    const xAxisLength = SVG_WIDTH - x0 * 2;

    const y0 = 50;
    const yAxisLength = SVG_HEIGHT - y0 * 2;

    const xAxisY = y0 + yAxisLength;

    // Find max and min values across all ranges
    const dataYMax = Math.max(
        ...data.map(range => range.high),
        -Infinity
    );
    const dataYMin = Math.min(
        ...data.map(range => range.low),
        Infinity
    );

    // Calculate the range for scaling
    const valueRange = dataYMax - dataYMin || 1;

    const columnWidth = xAxisLength / data.length;
    const sidePadding = 10;

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
                dataYMin={dataYMin}
            />

            {/* Column range bars */}
            {labels.map((label, index) => {
                const range = data[index];
                if (!range) return null;

                const columnX = x0 + index * columnWidth;

                // Calculate positions for low and high values
                const lowRatio = (range.low - dataYMin) / valueRange;
                const highRatio = (range.high - dataYMin) / valueRange;

                const lowY = y0 + (1 - lowRatio) * yAxisLength;
                const highY = y0 + (1 - highRatio) * yAxisLength;
                const rangeHeight = highY - lowY;

                const color = backgroundColor?.[index] || "#7cb5ec";
                const border = borderColor?.[index] || color;

                return (
                    <g key={index}>
                        {/* Range bar */}
                        <rect
                            x={columnX + sidePadding / 2}
                            y={lowY}
                            width={columnWidth - sidePadding}
                            height={rangeHeight}
                            fill={color}
                            stroke={border}
                            strokeWidth={borderWidth || 1}
                        />

                        {/* Low value marker (horizontal line) */}
                        <line
                            x1={columnX + sidePadding / 2}
                            y1={lowY}
                            x2={columnX + columnWidth - sidePadding / 2}
                            y2={lowY}
                            stroke={border}
                            strokeWidth={borderWidth ? borderWidth + 1 : 2}
                        />

                        {/* High value marker (horizontal line) */}
                        <line
                            x1={columnX + sidePadding / 2}
                            y1={highY}
                            x2={columnX + columnWidth - sidePadding / 2}
                            y2={highY}
                            stroke={border}
                            strokeWidth={borderWidth ? borderWidth + 1 : 2}
                        />

                        {/* Value labels */}
                        {showValues && (
                            <>
                                <text
                                    x={columnX + columnWidth / 2}
                                    y={lowY - 5}
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="#333"
                                    fontWeight="bold"
                                >
                                    {range.low.toFixed(1)}
                                </text>
                                <text
                                    x={columnX + columnWidth / 2}
                                    y={highY - 5}
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="#333"
                                    fontWeight="bold"
                                >
                                    {range.high.toFixed(1)}
                                </text>
                            </>
                        )}

                        {/* Category label */}
                        <text
                            x={columnX + columnWidth / 2}
                            y={xAxisY + 16}
                            textAnchor="middle"
                            fontSize="12"
                        >
                            {label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

export default ColumnRangeChart;
