import type { Meta, StoryObj } from '@storybook/react-webpack5';
import LineChart from '../graph/LineChart';

const meta: Meta<typeof LineChart> = {
    title: 'Components/LineChart',
    component: LineChart,
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
        data: [10, 20, 30, 25, 40, 35],
        configs: {},
    },
};

export const WithAxisNames: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [100, 150, 120, 180],
        configs: {
            xAxisName: 'Quarter',
            YAxisName: 'Sales',
        },
    },
};

export const CustomColors: Story = {
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [45, 52, 38, 61, 55, 48, 42],
        configs: {
            xAxisName: 'Day',
            YAxisName: 'Visitors',
            strokeColor: '#4BC0C0',
            strokeWidth: 3,
        },
    },
};

export const WithoutPoints: Story = {
    args: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        data: [1000, 1500, 2000, 1800, 2500],
        configs: {
            xAxisName: 'Year',
            YAxisName: 'Revenue',
            strokeColor: '#9C27B0',
            strokeWidth: 2,
            showPoints: false,
        },
    },
};

export const ThickLine: Story = {
    args: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [50, 75, 60, 90],
        configs: {
            xAxisName: 'Week',
            YAxisName: 'Users',
            strokeColor: '#F44336',
            strokeWidth: 4,
            pointRadius: 6,
        },
    },
};

export const DashedLine: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        data: [20, 25, 30, 28, 35, 40, 38, 45],
        configs: {
            xAxisName: 'Month',
            YAxisName: 'Growth',
            strokeColor: '#4CAF50',
            strokeWidth: 2,
            lineDashArray: '5,5',
        },
    },
};

export const ManyDataPoints: Story = {
    args: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        data: [23, 45, 56, 78, 34, 67, 89, 12, 45, 67, 89, 34],
        configs: {
            xAxisName: 'Month',
            YAxisName: 'Value',
            strokeColor: '#2196F3',
            strokeWidth: 2,
            pointRadius: 3,
        },
    },
};

export const CustomPointColors: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [30, 45, 35, 55, 50, 60],
        configs: {
            xAxisName: 'Month',
            YAxisName: 'Performance',
            strokeColor: '#FF9800',
            strokeWidth: 3,
            pointFillColor: '#FF5722',
            pointStrokeColor: '#FF9800',
            pointRadius: 5,
        },
    },
};

export const SmoothLine: Story = {
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        data: [100, 120, 110, 130, 125],
        configs: {
            xAxisName: 'Day',
            YAxisName: 'Score',
            strokeColor: '#673AB7',
            strokeWidth: 2.5,
            showPoints: true,
            pointRadius: 4,
        },
    },
};
