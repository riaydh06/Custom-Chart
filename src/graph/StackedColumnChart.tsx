import Axis from "../components/Axis";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 400;

interface DataSeries {
    name: string;
    data: number[];
    color?: string;
}

interface Props {
    labels: string[];
    dataSeries: DataSeries[];
    configs: {
        xAxisName?: string;
        YAxisName?: string;
        borderColor?: string[];
        borderWidth?: number;
        numYTicks?: number;
        showLegend?: boolean;
        legendPosition?: 'top' | 'bottom' | 'left' | 'right';
    };
}

function StackedColumnChart({ configs, dataSeries, labels }: Props) {
    const {
        borderColor,
        borderWidth = 1,
        xAxisName,
        YAxisName,
        numYTicks,
        showLegend = true,
        legendPosition = 'right',
    } = configs;

    const x0 = 50;
    const xAxisLength = SVG_WIDTH - x0 * 2;

    const y0 = 50;
    const yAxisLength = SVG_HEIGHT - y0 * 2;

    const xAxisY = y0 + yAxisLength;

    // Calculate total for each category (sum of all series for that category)
    const categoryTotals = labels.map((_, categoryIndex) => {
        return dataSeries.reduce((sum, series) => sum + (series.data[categoryIndex] || 0), 0);
    });

    const dataYMax = Math.max(...categoryTotals, -Infinity);

    const columnWidth = xAxisLength / labels.length;
    const sidePadding = 10;

    // Calculate legend position
    const getLegendPosition = () => {
        const legendWidth = 150;
        const legendHeight = dataSeries.length * 25 + 20;
        const centerX = SVG_WIDTH / 2;
        const centerY = SVG_HEIGHT / 2;

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

            {/* Stacked columns */}
            {labels.map((label, categoryIndex) => {
                const columnX = x0 + categoryIndex * columnWidth;
                let cumulativeY = xAxisY; // Start from bottom

                return (
                    <g key={categoryIndex}>
                        {/* Draw each series segment stacked */}
                        {dataSeries.map((series, seriesIndex) => {
                            const value = series.data[categoryIndex] || 0;
                            const heightRatio = value / dataYMax;
                            const segmentHeight = heightRatio * yAxisLength;

                            const segmentY = cumulativeY - segmentHeight;
                            const color = series.color || `hsl(${(seriesIndex * 360) / dataSeries.length}, 70%, 50%)`;
                            const border = borderColor?.[seriesIndex] || color;

                            const segment = (
                                <rect
                                    key={seriesIndex}
                                    x={columnX + sidePadding / 2}
                                    y={segmentY}
                                    width={columnWidth - sidePadding}
                                    height={segmentHeight}
                                    fill={color}
                                    stroke={border}
                                    strokeWidth={borderWidth}
                                />
                            );

                            cumulativeY = segmentY; // Move up for next segment
                            return segment;
                        })}

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
                    {dataSeries.map((series, index) => {
                        const color = series.color || `hsl(${(index * 360) / dataSeries.length}, 70%, 50%)`;
                        return (
                            <g key={index}>
                                <rect
                                    x={legendPos.x + 10}
                                    y={legendPos.y + 15 + index * 25}
                                    width={15}
                                    height={15}
                                    fill={color}
                                    stroke={borderColor?.[index] || color}
                                    strokeWidth={borderWidth}
                                />
                                <text
                                    x={legendPos.x + 30}
                                    y={legendPos.y + 27 + index * 25}
                                    fontSize="12"
                                    fill="black"
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

export default StackedColumnChart;
