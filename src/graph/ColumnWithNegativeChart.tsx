import Axis from "../components/Axis";

const SVG_WIDTH = 600;
const SVG_HEIGHT = 300;

interface Props {
  labels: string[];
  data: number[];
  configs: {
    xAxisName?: string;
    YAxisName?: string;
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    numYTicks?: number;
    positiveColor?: string; // Color for positive values
    negativeColor?: string; // Color for negative values
    showZeroLine?: boolean; // Show a distinct line at zero
  };
}

function ColumnWithNegativeChart({ configs, data, labels }: Props) {
  const {
    backgroundColor,
    borderColor,
    borderWidth,
    xAxisName,
    YAxisName,
    numYTicks,
    positiveColor,
    negativeColor,
    showZeroLine = true,
  } = configs;

  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;

  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;

  // Calculate min and max values
  const dataYMax = Math.max(...data, 0);
  const dataYMin = Math.min(...data, 0);
  const dataRange = dataYMax - dataYMin;

  // Calculate zero line position
  const zeroRatio = dataYMax > 0 && dataYMin < 0 
    ? dataYMax / dataRange 
    : dataYMin < 0 ? 1 : 0;
  const zeroLineY = y0 + (1 - zeroRatio) * yAxisLength;

  // X-axis should be at zero line if there are negative values
  const xAxisY = dataYMin < 0 ? zeroLineY : y0 + yAxisLength;

  const barPlotWidth = xAxisLength / data.length;

  // Helper to get color for a value
  const getColor = (value: number, index: number): string => {
    if (value >= 0 && positiveColor) return positiveColor;
    if (value < 0 && negativeColor) return negativeColor;
    if (Array.isArray(backgroundColor)) {
      return backgroundColor[index] || backgroundColor[0] || "#3B82F6";
    }
    return backgroundColor || "#3B82F6";
  };

  const getBorderColor = (value: number, index: number): string => {
    if (Array.isArray(borderColor)) {
      return borderColor[index] || borderColor[0] || getColor(value, index);
    }
    return borderColor || getColor(value, index);
  };

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

      {/* Zero line highlight */}
      {showZeroLine && dataYMin < 0 && (
        <line
          x1={x0}
          y1={zeroLineY}
          x2={x0 + xAxisLength}
          y2={zeroLineY}
          stroke="#333"
          strokeWidth={2}
          strokeDasharray="none"
        />
      )}

      {/* Column bars */}
      {labels.map((label, index) => {
        const value = data[index];
        const x = x0 + index * barPlotWidth;
        const sidePadding = 10;

        let barY: number;
        let barHeight: number;

        if (value >= 0) {
          // Positive value: bar extends upward from zero line
          const valueRatio = dataRange > 0 ? value / dataRange : 0;
          barHeight = valueRatio * yAxisLength;
          barY = zeroLineY - barHeight;
        } else {
          // Negative value: bar extends downward from zero line
          const valueRatio = dataRange > 0 ? Math.abs(value) / dataRange : 0;
          barHeight = valueRatio * yAxisLength;
          barY = zeroLineY;
        }

        const color = getColor(value, index);
        const border = getBorderColor(value, index);

        return (
          <g key={index}>
            <rect
              x={x + sidePadding / 2}
              y={barY}
              width={barPlotWidth - sidePadding}
              height={barHeight}
              fill={color}
              stroke={border}
              strokeWidth={borderWidth || 1}
            />
            
            {/* Value label inside bar (if space allows) */}
            {Math.abs(value) > 0 && barHeight > 20 && (
              <text
                x={x + barPlotWidth / 2}
                y={value >= 0 ? barY + barHeight / 2 : barY + barHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fill="white"
                fontWeight="bold"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
              >
                {value}
              </text>
            )}

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
    </svg>
  );
}

export default ColumnWithNegativeChart;
