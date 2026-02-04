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
    groupSpacing?: number; // Spacing between groups (default: 10)
  };
}

function GroupedColumnChart({ configs, dataSeries, labels }: Props) {
  const {
    borderColor,
    borderWidth = 1,
    xAxisName,
    YAxisName,
    numYTicks,
    showLegend = true,
    legendPosition = 'right',
    groupSpacing = 10,
  } = configs;

  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;

  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;

  const xAxisY = y0 + yAxisLength;

  // Find max value across all series
  const dataYMax = Math.max(
    ...dataSeries.flatMap(series => series.data),
    -Infinity
  );

  const groupWidth = xAxisLength / labels.length;
  const barWidth = (groupWidth - groupSpacing) / dataSeries.length;
  const barSpacing = groupSpacing / (dataSeries.length + 1);

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

      {/* Grouped columns */}
      {labels.map((label, categoryIndex) => {
        const groupX = x0 + categoryIndex * groupWidth;

        return (
          <g key={categoryIndex}>
            {/* Draw each series bar side by side */}
            {dataSeries.map((series, seriesIndex) => {
              const value = series.data[categoryIndex] || 0;
              const heightRatio = value / dataYMax;
              const barHeight = heightRatio * yAxisLength;
              
              const barX = groupX + barSpacing + seriesIndex * (barWidth + barSpacing);
              const barY = xAxisY - barHeight;
              
              const color = series.color || `hsl(${(seriesIndex * 360) / dataSeries.length}, 70%, 50%)`;
              const border = borderColor?.[seriesIndex] || color;

              return (
                <rect
                  key={seriesIndex}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={color}
                  stroke={border}
                  strokeWidth={borderWidth}
                />
              );
            })}

            {/* Category label */}
            <text
              x={groupX + groupWidth / 2}
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

export default GroupedColumnChart;
