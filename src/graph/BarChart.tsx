const SVG_WIDTH = 600;
const SVG_HEIGHT = 300;

interface Props {
  configs: {
    labels: string[];
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
  };
}

function BarChart({ configs }: Props) {
  const { labels, data, backgroundColor, borderColor, borderWidth } = configs;
  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;

  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;

  const xAxisY = y0 + yAxisLength;

  const dataYMax = data.reduce(
    (currMax, dataY) => Math.max(currMax, dataY),
    -Infinity
  );

  const dataYRange = dataYMax;

  const numYTicks = 5;

  const barPlotWidth = xAxisLength / data.length;

  return (
    <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
      {/* X axis */}
      <line
        x1={x0}
        y1={xAxisY}
        x2={x0 + xAxisLength}
        y2={xAxisY}
        stroke="grey"
      />
      <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
        Day
      </text>

      {/* Y axis */}
      <line x1={x0} y1={y0 + yAxisLength} x2={x0} y2={y0} stroke="grey" />
      {Array.from({ length: numYTicks }).map((_, index) => {
        const y = y0 + index * (yAxisLength / numYTicks);

        console.log({ y0, y, yAxisLength, dataYRange });

        const yValue = (dataYMax - index * (dataYRange / numYTicks)).toFixed(1);

        return (
          <g key={index}>
            <line
              x1={x0}
              y1={y}
              x2={x0 + xAxisLength}
              y2={y}
              stroke="rgba(201, 203, 207, 0.4)"
            />
            <text x={x0 - 5} y={y + 5} textAnchor="end">
              {yValue}
            </text>
          </g>
        );
      })}
      <text x={x0} y={y0 - 8} textAnchor="middle">
        $
      </text>

      {/* Bar plots */}
      {labels.map((label, index) => {
        const x = x0 + index * barPlotWidth;

        const yRatio = data[index] / dataYRange;

        const y = y0 + (1 - yRatio) * yAxisLength;
        const height = yRatio * yAxisLength;

        const sidePadding = 10;

        return (
          <g key={index}>
            <rect
              x={x + sidePadding / 2}
              y={y}
              width={barPlotWidth - sidePadding}
              height={height}
              fill={backgroundColor?.[index] || "black"}
              stroke={borderColor?.[index] || "black"}
              strokeWidth={borderWidth || 1}
            />
            <text x={x + barPlotWidth / 2} y={xAxisY + 16} textAnchor="middle">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default BarChart;
