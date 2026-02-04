import type { Meta, StoryObj } from '@storybook/react-webpack5';
import PieChart from '../graph/PieChart';

const meta: Meta<typeof PieChart> = {
    title: 'Components/PieChart',
    component: PieChart,
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

export const SalesByRegion: Story = {
    args: {
        labels: ['North', 'South', 'East', 'West', 'Central'],
        data: [150, 120, 180, 100, 90],
        configs: {
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0'],
            borderColor: ['#1565C0', '#2E7D32', '#E65100', '#C62828', '#6A1B9A'],
            borderWidth: 2,
        },
    },
};

export const WithoutLabels: Story = {
    args: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D'],
        data: [35, 25, 20, 20],
        configs: {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            borderColor: ['white', 'white', 'white', 'white'],
            borderWidth: 2,
            showLabels: false,
        },
    },
};

export const WithoutLegend: Story = {
    args: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        data: [45, 40, 15],
        configs: {
            backgroundColor: ['#9C27B0', '#00BCD4', '#FFC107'],
            borderColor: ['#6A1B9A', '#0097A7', '#FF8F00'],
            borderWidth: 2,
            showLegend: false,
        },
    },
};

export const LegendTop: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [100, 150, 120, 180],
        configs: {
            backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#F44336'],
            borderColor: ['#2E7D32', '#1565C0', '#E65100', '#C62828'],
            borderWidth: 2,
            legendPosition: 'top',
        },
    },
};

export const LegendBottom: Story = {
    args: {
        labels: ['Apple', 'Banana', 'Orange', 'Grape', 'Mango'],
        data: [30, 25, 20, 15, 10],
        configs: {
            backgroundColor: ['#FF6384', '#FFCE56', '#FF9800', '#9C27B0', '#4CAF50'],
            borderColor: ['white', 'white', 'white', 'white', 'white'],
            borderWidth: 2,
            legendPosition: 'bottom',
        },
    },
};

export const ManySegments: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        data: [12, 15, 18, 14, 16, 20, 22, 19, 17],
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
            ],
            borderColor: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
            borderWidth: 2,
            labelRadius: 0.6,
        },
    },
};

export const CustomLabelPosition: Story = {
    args: {
        labels: ['Category 1', 'Category 2', 'Category 3'],
        data: [40, 35, 25],
        configs: {
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800'],
            borderColor: ['#1565C0', '#2E7D32', '#E65100'],
            borderWidth: 2,
            labelRadius: 0.5,
        },
    },
};

export const WithLegend: Story = {
    args: {
        labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
        data: [45, 35, 15, 5],
        configs: {
            backgroundColor: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c'],
            borderColor: ['white', 'white', 'white', 'white'],
            borderWidth: 2,
            showLegend: true,
            legendPosition: 'right',
            showLabels: true,
        },
    },
};

export const LegendLeft: Story = {
    args: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D'],
        data: [100, 80, 60, 40],
        configs: {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            borderColor: ['white', 'white', 'white', 'white'],
            borderWidth: 2,
            legendPosition: 'left',
        },
    },
};

export const LegendWithValues: Story = {
    args: {
        labels: ['Sales', 'Marketing', 'Support', 'Development', 'Operations'],
        data: [150, 120, 100, 180, 90],
        configs: {
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0'],
            borderColor: ['#1565C0', '#2E7D32', '#E65100', '#C62828', '#6A1B9A'],
            borderWidth: 2,
            showLegend: true,
            legendPosition: 'bottom',
        },
    },
};

export const LargeLegend: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'],
        data: [100, 120, 110, 130, 125, 140, 135, 150],
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
            showLegend: true,
            legendType: 'box',
            legendPosition: 'right',
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
            showLabels: false, // Hide percentage labels inside when using pin legend
            showPinValues: true,
        },
    },
};

export const PinTypeLegendNoValues: Story = {
    args: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D'],
        data: [100, 80, 60, 40],
        configs: {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            borderColor: ['white', 'white', 'white', 'white'],
            borderWidth: 2,
            showLegend: true,
            legendType: 'pin',
            showPinValues: false,
        },
    },
};

export const PinTypeLegendLongPin: Story = {
    args: {
        labels: ['Sales', 'Marketing', 'Support', 'Development', 'Operations'],
        data: [150, 120, 100, 180, 90],
        configs: {
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0'],
            borderColor: ['white', 'white', 'white', 'white', 'white'],
            borderWidth: 2,
            showLegend: true,
            legendType: 'pin',
            pinLength: 50,
            showPinValues: true,
        },
    },
};

export const PinTypeLegendManySegments: Story = {
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
            showLegend: true,
            legendType: 'pin',
            showLabels: false,
            showPinValues: true,
        },
    },
};

export const PinTypeAllSegments: Story = {
    args: {
        labels: ['Large', 'Medium', 'Small', 'Tiny', 'Micro'],
        data: [100, 50, 20, 5, 2], // Includes very small segments
        configs: {
            backgroundColor: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9'],
            borderColor: ['white', 'white', 'white', 'white', 'white'],
            borderWidth: 2,
            showLegend: true,
            legendType: 'pin',
            showLabels: false, // Hide inner labels when using pin legend
            showPinValues: true,
            pinLength: 35,
        },
    },
};

export const PinTypeAllItems: Story = {
    args: {
        labels: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E', 'Category F'],
        data: [150, 120, 100, 80, 30, 20], // All segments get pins
        configs: {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            borderColor: ['white', 'white', 'white', 'white', 'white', 'white'],
            borderWidth: 2,
            showLegend: true,
            legendType: 'pin',
            showLabels: false,
            showPinValues: true,
        },
    },
};
