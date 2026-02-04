import type { Meta, StoryObj } from '@storybook/react-webpack5';
import AreaChart from '../graph/AreaChart';

const meta: Meta<typeof AreaChart> = {
    title: 'Components/AreaChart',
    component: AreaChart,
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
            fillColor: '#4BC0C0',
            strokeColor: '#2E9B9B',
            strokeWidth: 3,
            fillOpacity: 0.4,
        },
    },
};

export const WithPoints: Story = {
    args: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        data: [1000, 1500, 2000, 1800, 2500],
        configs: {
            xAxisName: 'Year',
            YAxisName: 'Revenue',
            fillColor: '#9C27B0',
            strokeColor: '#6A1B9A',
            strokeWidth: 2,
            fillOpacity: 0.3,
            showPoints: true,
            pointRadius: 5,
        },
    },
};

export const HighOpacity: Story = {
    args: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [50, 75, 60, 90],
        configs: {
            xAxisName: 'Week',
            YAxisName: 'Users',
            fillColor: '#F44336',
            strokeColor: '#C62828',
            strokeWidth: 2,
            fillOpacity: 0.7,
        },
    },
};

export const LowOpacity: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        data: [20, 25, 30, 28, 35, 40, 38, 45],
        configs: {
            xAxisName: 'Month',
            YAxisName: 'Growth',
            fillColor: '#4CAF50',
            strokeColor: '#2E7D32',
            strokeWidth: 2,
            fillOpacity: 0.2,
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
            fillColor: '#2196F3',
            strokeColor: '#1565C0',
            strokeWidth: 2,
            fillOpacity: 0.3,
            showPoints: true,
            pointRadius: 3,
        },
    },
};

export const SmoothGradient: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [30, 45, 35, 55, 50, 60],
        configs: {
            xAxisName: 'Month',
            YAxisName: 'Performance',
            fillColor: '#FF9800',
            strokeColor: '#E65100',
            strokeWidth: 3,
            fillOpacity: 0.4,
        },
    },
};
