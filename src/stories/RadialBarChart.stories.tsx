import type { Meta, StoryObj } from '@storybook/react-webpack5';
import RadialBarChart from '../graph/RadialBarChart';

const meta: Meta<typeof RadialBarChart> = {
    title: 'Components/RadialBarChart',
    component: RadialBarChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [45, 52, 38, 61, 55, 48, 42],
        configs: {},
    },
};

export const WithCustomColors: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [100, 150, 120, 180],
        configs: {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            borderWidth: 2,
        },
    },
};

export const PerformanceMetrics: Story = {
    args: {
        labels: ['CPU', 'Memory', 'Storage', 'Network', 'Graphics', 'Battery'],
        data: [85, 90, 75, 80, 88, 70],
        configs: {
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0', '#00BCD4'],
            borderColor: ['white', 'white', 'white', 'white', 'white', 'white'],
            borderWidth: 2,
            showValues: true,
        },
    },
};

export const WithoutGrid: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [20, 25, 30, 28, 35, 40],
        configs: {
            backgroundColor: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#FF6384'],
            borderColor: ['white', 'white', 'white', 'white', 'white', 'white'],
            borderWidth: 2,
            showGrid: false,
        },
    },
};

export const WithoutValues: Story = {
    args: {
        labels: ['North', 'South', 'East', 'West', 'Central'],
        data: [150, 120, 180, 100, 90],
        configs: {
            backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#F44336', '#9C27B0'],
            borderColor: ['white', 'white', 'white', 'white', 'white'],
            borderWidth: 2,
            showValues: false,
        },
    },
};

export const LargeInnerRadius: Story = {
    args: {
        labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
        data: [80, 90, 70, 85, 75],
        configs: {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            borderColor: ['white', 'white', 'white', 'white', 'white'],
            borderWidth: 2,
            innerRadius: 0.4,
        },
    },
};

export const SmallInnerRadius: Story = {
    args: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [50, 75, 60, 90],
        configs: {
            backgroundColor: ['#9C27B0', '#00BCD4', '#FFC107', '#4CAF50'],
            borderColor: ['white', 'white', 'white', 'white'],
            borderWidth: 2,
            innerRadius: 0.1,
        },
    },
};

export const ManyBars: Story = {
    args: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        data: [23, 45, 56, 78, 34, 67, 89, 12, 45, 67, 89, 34],
        configs: {
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
            ],
            borderColor: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
            borderWidth: 1.5,
            barWidth: 20,
        },
    },
};

export const HalfCircle: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
        data: [100, 120, 110, 130, 125, 140],
        configs: {
            backgroundColor: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#FF6384'],
            borderColor: ['white', 'white', 'white', 'white', 'white', 'white'],
            borderWidth: 2,
            startAngle: -90,
            endAngle: 90, // Half circle
        },
    },
};

export const CustomBarWidth: Story = {
    args: {
        labels: ['A', 'B', 'C', 'D', 'E'],
        data: [60, 80, 70, 90, 75],
        configs: {
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0'],
            borderColor: ['white', 'white', 'white', 'white', 'white'],
            borderWidth: 2,
            barWidth: 50, // Custom bar width in degrees
        },
    },
};
