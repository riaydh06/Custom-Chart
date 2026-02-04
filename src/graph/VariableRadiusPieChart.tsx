const SVG_WIDTH = 600;
const SVG_HEIGHT = 400;

interface Props {
    labels: string[];
    angleData: number[]; // Data for determining slice angles (proportions)
    radiusData: number[]; // Data for determining outer radii (sizes)
    configs: {
        backgroundColor?: string[];
        borderColor?: string[];
        borderWidth?: number;
        showLabels?: boolean;
        showLegend?: boolean;
        legendType?: 'box' | 'pin'; // 'box' for traditional legend, 'pin' for pin-type with lines
        legendPosition?: 'top' | 'bottom' | 'left' | 'right'; // Only used for box type
        innerRadius?: number; // Inner radius as percentage (0-1), default 0.3 (donut hole)
        minRadius?: number; // Minimum outer radius as percentage (0-1), default 0.5
        maxRadius?: number; // Maximum outer radius as percentage (0-1), default 0.95
        labelRadius?: number; // Percentage between inner and outer radius for label position (0-1), default 0.5
        pinLength?: number; // Length of pin line for pin-type legend, default 30
        showPinValues?: boolean; // Show values in pin-type legend labels
    };
}

function VariableRadiusPieChart({ configs, angleData, radiusData, labels }: Props) {
    const {
        backgroundColor,
        borderColor,
        borderWidth = 2,
        showLabels = true,
        showLegend = true,
        legendType = 'box',
        legendPosition = 'right',
        innerRadius = 0.3,
        minRadius = 0.5,
        maxRadius = 0.95,
        labelRadius = 0.5,
        pinLength = 30,
        showPinValues = true,
    } = configs;

    const centerX = SVG_WIDTH / 2;
    const centerY = SVG_HEIGHT / 2;
    const baseRadius = Math.min(SVG_WIDTH, SVG_HEIGHT) / 2 - 60;

    // Fixed inner radius (donut hole)
    const innerRadiusValue = baseRadius * innerRadius;

    // Calculate total for angle percentages
    const angleTotal = angleData.reduce((sum, value) => sum + value, 0);

    // Normalize radius data to fit within minRadius and maxRadius range
    const radiusMin = Math.min(...radiusData);
    const radiusMax = Math.max(...radiusData);
    const radiusRange = radiusMax - radiusMin || 1; // Avoid division by zero

    // Calculate angles and radii for each segment
    let currentAngle = -90; // Start from top
    const segments = labels.map((label, index) => {
        // Calculate angle based on angleData
        const angleValue = angleData[index] || 0;
        const anglePercentage = angleValue / angleTotal;
        const angle = anglePercentage * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;
        currentAngle = endAngle;

        // Calculate outer radius based on radiusData
        const radiusValue = radiusData[index] || 0;
        const normalizedRadius = (radiusValue - radiusMin) / radiusRange;
        const outerRadius = baseRadius * (minRadius + normalizedRadius * (maxRadius - minRadius));

        return {
            angleValue,
            anglePercentage,
            startAngle,
            endAngle,
            innerRadius: innerRadiusValue,
            outerRadius,
            radiusValue,
            label,
            color: backgroundColor?.[index] || `hsl(${(index * 360) / labels.length}, 70%, 55%)`,
            borderColor: borderColor?.[index] || '#ffffff',
        };
    });

    // Helper function to convert angle to coordinates
    const getCoordinates = (angle: number, radius: number) => {
        const radian = (angle * Math.PI) / 180;
        return {
            x: centerX + radius * Math.cos(radian),
            y: centerY + radius * Math.sin(radian),
        };
    };

    // Helper function to create variable radius donut slice path (like Highcharts)
    const createVariableRadiusDonutPath = (
        startAngle: number,
        endAngle: number,
        innerR: number,
        outerR: number
    ) => {
        const startOuter = getCoordinates(startAngle, outerR);
        const endOuter = getCoordinates(endAngle, outerR);
        const startInner = getCoordinates(startAngle, innerR);
        const endInner = getCoordinates(endAngle, innerR);

        const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

        return [
            `M ${startOuter.x} ${startOuter.y}`,
            `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
            `L ${endInner.x} ${endInner.y}`,
            `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}`,
            'Z',
        ].join(' ');
    };

    // Calculate legend position
    const getLegendPosition = () => {
        const legendWidth = 180;
        const legendHeight = labels.length * 35 + 20; // Increased for two-line entries

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
            {/* Variable radius donut slices (like Highcharts) */}
            {segments.map((segment, index) => {
                const midAngle = (segment.startAngle + segment.endAngle) / 2;
                // Label position between inner and outer radius
                const labelRadiusValue = segment.innerRadius +
                    (segment.outerRadius - segment.innerRadius) * labelRadius;
                const labelPos = getCoordinates(midAngle, labelRadiusValue);
                const outerLabelPos = getCoordinates(midAngle, segment.outerRadius + 20);

                return (
                    <g key={index}>
                        <path
                            d={createVariableRadiusDonutPath(
                                segment.startAngle,
                                segment.endAngle,
                                segment.innerRadius,
                                segment.outerRadius
                            )}
                            fill={segment.color}
                            stroke={segment.borderColor}
                            strokeWidth={borderWidth}
                            opacity={0.9}
                        />
                        {showLabels && segment.anglePercentage > 0.05 && (
                            <>
                                {/* Label inside slice */}
                                <text
                                    x={labelPos.x}
                                    y={labelPos.y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="11"
                                    fill="white"
                                    fontWeight="bold"
                                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                                >
                                    {`${(segment.anglePercentage * 100).toFixed(1)}%`}
                                </text>
                                {/* Label outside slice (category name) */}
                                {segment.outerRadius > baseRadius * 0.6 && (
                                    <g>
                                        <line
                                            x1={getCoordinates(midAngle, segment.outerRadius).x}
                                            y1={getCoordinates(midAngle, segment.outerRadius).y}
                                            x2={outerLabelPos.x}
                                            y2={outerLabelPos.y}
                                            stroke="#666"
                                            strokeWidth={1}
                                            opacity={0.5}
                                        />
                                        <text
                                            x={outerLabelPos.x}
                                            y={outerLabelPos.y}
                                            textAnchor={midAngle > 90 && midAngle < 270 ? 'end' : 'start'}
                                            dominantBaseline="middle"
                                            fontSize="11"
                                            fill="#333"
                                            fontWeight="500"
                                        >
                                            {segment.label}
                                        </text>
                                    </g>
                                )}
                            </>
                        )}
                    </g>
                );
            })}

            {/* Pin-type Legend (labels with connecting lines) - ALL segments get pins */}
            {showLegend && legendType === 'pin' && segments.map((segment, index) => {
                const midAngle = (segment.startAngle + segment.endAngle) / 2;

                // Calculate positions for pin line (from outer edge of segment)
                const sliceEdge = getCoordinates(midAngle, segment.outerRadius);
                const pinEnd = getCoordinates(midAngle, segment.outerRadius + pinLength);

                // Determine label position (further out)
                const labelDistance = segment.outerRadius + pinLength + 25;
                const labelPos = getCoordinates(midAngle, labelDistance);

                // Determine text anchor and position based on angle
                const isLeftSide = midAngle > 90 && midAngle < 270;
                const textAnchor = isLeftSide ? 'end' : 'start';
                const labelX = isLeftSide ? labelPos.x - 8 : labelPos.x + 8;

                // For very small segments, ensure label is still visible
                const minLabelDistance = segment.outerRadius + pinLength + 15;
                const adjustedLabelPos = segment.anglePercentage < 0.05
                    ? getCoordinates(midAngle, minLabelDistance)
                    : labelPos;

                return (
                    <g key={index}>
                        {/* Pin line (connector) - always shown for all segments */}
                        <line
                            x1={sliceEdge.x}
                            y1={sliceEdge.y}
                            x2={pinEnd.x}
                            y2={pinEnd.y}
                            stroke="#666"
                            strokeWidth={1.5}
                            opacity={0.6}
                        />
                        {/* Color dot at pin end - always shown */}
                        <circle
                            cx={pinEnd.x}
                            cy={pinEnd.y}
                            r={5}
                            fill={segment.color}
                            stroke={segment.borderColor || 'white'}
                            strokeWidth={borderWidth || 1.5}
                        />
                        {/* Label text - always shown for all segments */}
                        <text
                            x={isLeftSide ? adjustedLabelPos.x - 8 : adjustedLabelPos.x + 8}
                            y={adjustedLabelPos.y}
                            textAnchor={textAnchor}
                            dominantBaseline="middle"
                            fontSize="11"
                            fill="#333"
                            fontWeight="500"
                        >
                            {segment.label}
                            {showPinValues && ` (A:${segment.angleValue.toFixed(1)}, R:${segment.radiusValue.toFixed(1)})`}
                        </text>
                    </g>
                );
            })}

            {/* Box-type Legend (traditional legend box) */}
            {showLegend && legendType === 'box' && (
                <g>
                    <rect
                        x={legendPos.x}
                        y={legendPos.y}
                        width={180}
                        height={labels.length * 25 + 20}
                        fill="white"
                        stroke="grey"
                        strokeWidth={1}
                        rx={5}
                        opacity={0.9}
                    />
                    {segments.map((segment, index) => (
                        <g key={index}>
                            <rect
                                x={legendPos.x + 10}
                                y={legendPos.y + 15 + index * 35}
                                width={15}
                                height={15}
                                fill={segment.color}
                                stroke={segment.borderColor}
                                strokeWidth={borderWidth}
                            />
                            <text
                                x={legendPos.x + 30}
                                y={legendPos.y + 25 + index * 35}
                                fontSize="11"
                                fill="#333"
                                fontWeight="500"
                            >
                                {segment.label}
                            </text>
                            <text
                                x={legendPos.x + 30}
                                y={legendPos.y + 38 + index * 35}
                                fontSize="9"
                                fill="#666"
                            >
                                Angle: {segment.angleValue.toFixed(1)} | Outer R: {segment.radiusValue.toFixed(1)}
                            </text>
                        </g>
                    ))}
                </g>
            )}
        </svg>
    );
}

export default VariableRadiusPieChart;
