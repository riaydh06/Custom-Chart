import type { Meta, StoryObj } from '@storybook/react-webpack5';
import DonutChart from '../graph/DonutChart';

const meta: Meta<typeof DonutChart> = {
    title: 'Components/DonutChart',
    component: DonutChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        labels: ['Category A', 'Category B', 'Category C', 'Category D'],
        data: [30, 25, 20, 25],
        configs: {},
    },
};

export const WithCustomColors: Story = {
    args: {
        labels: ['Red', 'Blue', 'Green', 'Yellow', 'Purple'],
        data: [20, 30, 15, 25, 10],
        configs: {
            backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56', '#9966FF'],
            borderColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56', '#9966FF'],
            borderWidth: 3,
        },
    },
};

export const ThinDonut: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [100, 150, 120, 180],
        configs: {
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800', '#F44336'],
            borderColor: ['#1565C0', '#2E7D32', '#E65100', '#C62828'],
            borderWidth: 2,
            innerRadius: 0.7,
        },
    },
};

export const ThickDonut: Story = {
    args: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        data: [45, 40, 15],
        configs: {
            backgroundColor: ['#9C27B0', '#00BCD4', '#FFC107'],
            borderColor: ['#6A1B9A', '#0097A7', '#FF8F00'],
            borderWidth: 2,
            innerRadius: 0.3,
        },
    },
};

export const WithoutLabels: Story = {
    args: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
        data: [25, 20, 15, 20, 20],
        configs: {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            borderColor: ['white', 'white', 'white', 'white', 'white'],
            borderWidth: 2,
            showLabels: false,
        },
    },
};

export const WithoutLegend: Story = {
    args: {
        labels: ['North', 'South', 'East', 'West'],
        data: [35, 25, 20, 20],
        configs: {
            backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#F44336'],
            borderColor: ['#2E7D32', '#1565C0', '#E65100', '#C62828'],
            borderWidth: 2,
            showLegend: false,
        },
    },
};

export const LegendTop: Story = {
    args: {
        labels: ['Apple', 'Banana', 'Orange', 'Grape', 'Mango'],
        data: [30, 25, 20, 15, 10],
        configs: {
            backgroundColor: ['#FF6384', '#FFCE56', '#FF9800', '#9C27B0', '#4CAF50'],
            borderColor: ['white', 'white', 'white', 'white', 'white'],
            borderWidth: 2,
            legendPosition: 'top',
        },
    },
};

export const ManySegments: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        data: [12, 15, 18, 14, 16, 20, 22, 19],
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
            ],
            borderColor: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
            borderWidth: 2,
            innerRadius: 0.5,
        },
    },
};

export const PinTypeLegend: Story = {
    args: {
        labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
        data: [45, 35, 15, 5],
        configs: {
            backgroundColor: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c'],
            borderColor: ['white', 'white', 'white', 'white'],
            borderWidth: 2,
            showLegend: true,
            legendType: 'pin',
            showLabels: false,
            showPinValues: true,
        },
    },
};

export const PinTypeLegendAllItems: Story = {
    args: {
        labels: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'],
        data: [100, 80, 60, 40, 20], // All segments get pins
        configs: {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            borderColor: ['white', 'white', 'white', 'white', 'white'],
            borderWidth: 2,
            showLegend: true,
            legendType: 'pin',
            showLabels: false,
            showPinValues: true,
            pinLength: 35,
        },
    },
};
