import type { Meta, StoryObj } from '@storybook/react-webpack5';
import BarChart from '../graph/BarChart';

const meta: Meta<typeof BarChart> = {
    title: 'Components/BarChart',
    component: BarChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        data: [10, 20, 30, 40, 50],
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

export const WithCustomColors: Story = {
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [45, 52, 38, 61, 55, 48, 42],
        configs: {
            xAxisName: 'Day',
            YAxisName: 'Visitors',
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'],
            borderWidth: 2,
        },
    },
};

export const WithCustomYTicks: Story = {
    args: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D'],
        data: [250, 180, 320, 210],
        configs: {
            xAxisName: 'Product',
            YAxisName: 'Revenue ($)',
            backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#F44336'],
            borderColor: ['#2E7D32', '#1565C0', '#E65100', '#C62828'],
            borderWidth: 3,
            numYTicks: 8,
        },
    },
};

export const SingleBar: Story = {
    args: {
        labels: ['Total'],
        data: [75],
        configs: {
            xAxisName: 'Category',
            YAxisName: 'Value',
            backgroundColor: ['#9C27B0'],
            borderColor: ['#6A1B9A'],
            borderWidth: 2,
        },
    },
};

export const ManyBars: Story = {
    args: {
        labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
        data: [23, 45, 56, 78, 34, 67, 89, 12, 45, 67, 89, 34],
        configs: {
            xAxisName: 'Category',
            YAxisName: 'Count',
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            borderWidth: 1,
            numYTicks: 6,
        },
    },
};

export const LargeValues: Story = {
    args: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        data: [1000, 1500, 2000, 1800, 2500],
        configs: {
            xAxisName: 'Year',
            YAxisName: 'Revenue (K)',
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0', '#F44336'],
            borderColor: ['#1565C0', '#2E7D32', '#E65100', '#6A1B9A', '#C62828'],
            borderWidth: 2,
            numYTicks: 5,
        },
    },
};
