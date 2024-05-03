import Axis from "../components/Axis";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 300;

interface Props {
  labels: string[];
  data: number[];
  configs: {
    xAxisName?: string;
    YAxisName?: string;
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
    numYTicks?: number;
  };
}

function BarChart({ configs, data, labels }: Props) {
  const {
    backgroundColor,
    borderColor,
    borderWidth,
    xAxisName,
    YAxisName,
    numYTicks,
  } = configs;
  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;

  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;

  const xAxisY = y0 + yAxisLength;

  const dataYMax = data.reduce(
    (currMax, dataY) => Math.max(currMax, dataY),
    -Infinity
  );

  const barPlotWidth = xAxisLength / data.length;

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
      {/* Bar plots */}
      {labels.map((label, index) => {
        const x = x0 + index * barPlotWidth;

        const yRatio = data[index] / dataYMax;

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
