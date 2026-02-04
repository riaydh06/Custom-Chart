import type { Meta, StoryObj } from '@storybook/react-webpack5';
import VariableRadiusPieChart from '../graph/VariableRadiusPieChart';

const meta: Meta<typeof VariableRadiusPieChart> = {
    title: 'Components/VariableRadiusPieChart',
    component: VariableRadiusPieChart,
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
        angleData: [30, 25, 20, 25],
        radiusData: [100, 150, 80, 120],
        configs: {
            backgroundColor: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c'],
            borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
            borderWidth: 2,
            innerRadius: 0.3,
        },
    },
};

export const WithCustomColors: Story = {
    args: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
        angleData: [20, 30, 15, 25, 10],
        radiusData: [200, 300, 150, 250, 100],
        configs: {
            backgroundColor: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9'],
            borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
            borderWidth: 2,
            innerRadius: 0.3,
        },
    },
};

export const LargeInnerRadius: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        angleData: [100, 150, 120, 180],
        radiusData: [95, 105, 98, 102],
        configs: {
            backgroundColor: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c'],
            borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
            borderWidth: 2,
            innerRadius: 0.5,
        },
    },
};

export const SmallInnerRadius: Story = {
    args: {
        labels: ['North', 'South', 'East', 'West'],
        angleData: [35, 25, 20, 20],
        radiusData: [1000, 1500, 800, 1200],
        configs: {
            backgroundColor: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9'],
            borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
            borderWidth: 2,
            innerRadius: 0.1,
        },
    },
};

export const SalesAndRevenue: Story = {
    args: {
        labels: ['North', 'South', 'East', 'West'],
        angleData: [35, 25, 20, 20], // Sales proportion
        radiusData: [1000, 1500, 800, 1200], // Revenue amount
        configs: {
            backgroundColor: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9'],
            borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
            borderWidth: 2,
            innerRadius: 0.3,
        },
    },
};

export const WideRadiusRange: Story = {
    args: {
        labels: ['Small', 'Medium', 'Large', 'XLarge'],
        angleData: [25, 25, 25, 25],
        radiusData: [10, 50, 100, 200],
        configs: {
            backgroundColor: ['#9C27B0', '#00BCD4', '#FFC107', '#4CAF50'],
            borderColor: ['#6A1B9A', '#0097A7', '#FF8F00', '#2E7D32'],
            borderWidth: 2,
            minRadius: 0.1,
            maxRadius: 0.95,
        },
    },
};

export const NarrowRadiusRange: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        angleData: [100, 150, 120, 180],
        radiusData: [95, 105, 98, 102],
        configs: {
            backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#F44336'],
            borderColor: ['#2E7D32', '#1565C0', '#E65100', '#C62828'],
            borderWidth: 2,
            minRadius: 0.4,
            maxRadius: 0.6,
        },
    },
};

export const WithoutLabels: Story = {
    args: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        angleData: [45, 40, 15],
        radiusData: [500, 400, 150],
        configs: {
            backgroundColor: ['#9C27B0', '#00BCD4', '#FFC107'],
            borderColor: ['white', 'white', 'white'],
            borderWidth: 2,
            showLabels: false,
        },
    },
};

export const WithoutLegend: Story = {
    args: {
        labels: ['Region 1', 'Region 2', 'Region 3', 'Region 4'],
        angleData: [30, 25, 25, 20],
        radiusData: [200, 180, 160, 140],
        configs: {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            borderColor: ['white', 'white', 'white', 'white'],
            borderWidth: 2,
            showLegend: false,
        },
    },
};

export const ManySegments: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        angleData: [12, 15, 18, 14, 16, 20, 22, 19],
        radiusData: [100, 120, 150, 110, 130, 180, 200, 160],
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
            labelRadius: 0.5,
        },
    },
};

export const CustomLabelRadius: Story = {
    args: {
        labels: ['Category 1', 'Category 2', 'Category 3'],
        angleData: [40, 35, 25],
        radiusData: [100, 200, 150],
        configs: {
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800'],
            borderColor: ['#1565C0', '#2E7D32', '#E65100'],
            borderWidth: 2,
            labelRadius: 0.4,
        },
    },
};

export const PinTypeLegend: Story = {
    args: {
        labels: ['Category A', 'Category B', 'Category C', 'Category D'],
        angleData: [30, 25, 20, 25],
        radiusData: [100, 150, 80, 120],
        configs: {
            backgroundColor: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c'],
            borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
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
        labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
        angleData: [20, 30, 15, 25, 10],
        radiusData: [200, 300, 150, 250, 100],
        configs: {
            backgroundColor: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9'],
            borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
            borderWidth: 2,
            showLegend: true,
            legendType: 'pin',
            showLabels: false,
            showPinValues: true,
            pinLength: 40,
        },
    },
};
