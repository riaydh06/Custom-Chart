import type { Meta, StoryObj } from '@storybook/react-webpack5';
import ColumnWithNegativeChart from '../graph/ColumnWithNegativeChart';

const meta: Meta<typeof ColumnWithNegativeChart> = {
    title: 'Components/ColumnWithNegativeChart',
    component: ColumnWithNegativeChart,
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
        data: [100, -50, 150, -80, 200, -30],
        configs: {},
    },
};

export const ProfitAndLoss: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [50000, -20000, 80000, -10000],
        configs: {
            xAxisName: 'Quarter',
            YAxisName: 'Profit/Loss ($)',
            positiveColor: '#10B981',
            negativeColor: '#EF4444',
        },
    },
};

export const TemperatureVariation: Story = {
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [5, -3, 8, -2, 10, -5, 7],
        configs: {
            xAxisName: 'Day',
            YAxisName: 'Temperature Variation (°C)',
            positiveColor: '#F59E0B',
            negativeColor: '#3B82F6',
        },
    },
};

export const StockPriceChange: Story = {
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        data: [2.5, -1.2, 3.8, -0.5, 1.9],
        configs: {
            xAxisName: 'Day',
            YAxisName: 'Price Change (%)',
            positiveColor: '#10B981',
            negativeColor: '#EF4444',
            borderWidth: 2,
        },
    },
};

export const AllPositive: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        data: [100, 150, 120, 180, 200],
        configs: {
            positiveColor: '#3B82F6',
        },
    },
};

export const AllNegative: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        data: [-100, -150, -120, -180, -200],
        configs: {
            negativeColor: '#EF4444',
        },
    },
};

export const CustomColors: Story = {
    args: {
        labels: ['A', 'B', 'C', 'D', 'E', 'F'],
        data: [50, -30, 80, -20, 100, -40],
        configs: {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            borderColor: 'white',
            borderWidth: 2,
        },
    },
};

export const WithoutZeroLine: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        data: [100, -50, 150, -80, 200],
        configs: {
            positiveColor: '#10B981',
            negativeColor: '#EF4444',
            showZeroLine: false,
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
        data: [100, -50, 150, -80, 200, -30, 180, -60, 120, -40, 160, -20],
        configs: {
            xAxisName: 'Month',
            YAxisName: 'Value',
            positiveColor: '#3B82F6',
            negativeColor: '#EF4444',
        },
    },
};

export const SmallValues: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [0.5, -0.3, 0.8, -0.2],
        configs: {
            xAxisName: 'Quarter',
            YAxisName: 'Change',
            positiveColor: '#10B981',
            negativeColor: '#EF4444',
        },
    },
};

export const LargeRange: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        data: [1000, -500, 2000, -800, 1500],
        configs: {
            xAxisName: 'Month',
            YAxisName: 'Value',
            positiveColor: '#10B981',
            negativeColor: '#EF4444',
            numYTicks: 8,
        },
    },
};
