import type { Meta, StoryObj } from '@storybook/react-webpack5';
import DualAxesChart from '../graph/DualAxesChart';

const meta: Meta<typeof DualAxesChart> = {
    title: 'Components/DualAxesChart',
    component: DualAxesChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        columnData: [100, 120, 150, 180, 200, 220],
        lineData: [20, 25, 30, 35, 40, 45],
        configs: {},
    },
};

export const SalesAndProfit: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        columnData: [50000, 60000, 55000, 70000], // Sales (columns)
        lineData: [12, 15, 13, 18], // Profit margin % (line)
        configs: {
            leftYAxisName: 'Sales ($)',
            rightYAxisName: 'Profit Margin (%)',
            columnColor: '#3B82F6',
            lineColor: '#10B981',
            xAxisName: 'Quarter',
        },
    },
};

export const TemperatureAndRainfall: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        columnData: [80, 120, 150, 180, 200, 150, 100, 90], // Rainfall (mm)
        lineData: [25, 28, 32, 35, 38, 36, 33, 30], // Temperature (°C)
        configs: {
            leftYAxisName: 'Rainfall (mm)',
            rightYAxisName: 'Temperature (°C)',
            columnColor: '#60A5FA',
            lineColor: '#F59E0B',
            xAxisName: 'Month',
            columnBorderWidth: 1,
        },
    },
};

export const RevenueAndGrowth: Story = {
    args: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        columnData: [1000000, 1200000, 1500000, 1800000, 2200000], // Revenue
        lineData: [5, 8, 12, 15, 18], // Growth rate %
        configs: {
            leftYAxisName: 'Revenue ($)',
            rightYAxisName: 'Growth Rate (%)',
            columnColor: '#8B5CF6',
            lineColor: '#EF4444',
            xAxisName: 'Year',
            showLinePoints: true,
        },
    },
};

export const CustomColors: Story = {
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        columnData: [45, 52, 38, 61, 55],
        lineData: [85, 90, 75, 95, 88],
        configs: {
            leftYAxisName: 'Orders',
            rightYAxisName: 'Satisfaction (%)',
            columnColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            lineColor: '#10B981',
            columnBorderColor: 'white',
            columnBorderWidth: 2,
        },
    },
};

export const DashedLine: Story = {
    args: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        columnData: [200, 250, 300, 280],
        lineData: [15, 18, 20, 17],
        configs: {
            leftYAxisName: 'Units Sold',
            rightYAxisName: 'Return Rate (%)',
            columnColor: '#3B82F6',
            lineColor: '#EF4444',
            lineDashArray: '5,5',
            showLinePoints: true,
        },
    },
};

export const WithoutLinePoints: Story = {
    args: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D'],
        columnData: [500, 600, 450, 700],
        lineData: [30, 35, 28, 40],
        configs: {
            leftYAxisName: 'Sales',
            rightYAxisName: 'Market Share (%)',
            columnColor: '#6366F1',
            lineColor: '#F59E0B',
            showLinePoints: false,
        },
    },
};

export const DifferentScales: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        columnData: [1000, 1200, 1500, 1800, 2000], // Large values
        lineData: [2, 3, 2.5, 4, 3.5], // Small values
        configs: {
            leftYAxisName: 'Page Views',
            rightYAxisName: 'Bounce Rate (%)',
            columnColor: '#3B82F6',
            lineColor: '#EF4444',
            numLeftYTicks: 6,
            numRightYTicks: 4,
        },
    },
};

export const ManyDataPoints: Story = {
    args: {
        labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        columnData: [100, 120, 150, 180, 200, 220, 210, 190, 180, 200, 230, 250],
        lineData: [20, 25, 30, 35, 40, 45, 42, 38, 35, 40, 45, 50],
        configs: {
            leftYAxisName: 'Revenue ($K)',
            rightYAxisName: 'Growth (%)',
            columnColor: '#3B82F6',
            lineColor: '#10B981',
            xAxisName: 'Month',
        },
    },
};
