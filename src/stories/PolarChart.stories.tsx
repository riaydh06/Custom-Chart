import type { Meta, StoryObj } from '@storybook/react-webpack5';
import PolarChart from '../graph/PolarChart';

const meta: Meta<typeof PolarChart> = {
    title: 'Components/PolarChart',
    component: PolarChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
        dataSeries: [
            {
                name: 'Product A',
                data: [80, 90, 70, 85, 75],
                color: '#7cb5ec',
            },
        ],
        configs: {},
    },
};

export const MultipleSeries: Story = {
    args: {
        labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
        dataSeries: [
            {
                name: 'Product A',
                data: [80, 90, 70, 85, 75],
                color: '#7cb5ec',
            },
            {
                name: 'Product B',
                data: [70, 85, 90, 80, 88],
                color: '#434348',
            },
            {
                name: 'Product C',
                data: [90, 75, 85, 90, 70],
                color: '#90ed7d',
            },
        ],
        configs: {},
    },
};

export const PerformanceMetrics: Story = {
    args: {
        labels: ['CPU', 'Memory', 'Storage', 'Network', 'Graphics', 'Battery'],
        dataSeries: [
            {
                name: 'Device A',
                data: [85, 90, 75, 80, 88, 70],
                color: '#FF6384',
            },
            {
                name: 'Device B',
                data: [75, 85, 90, 85, 75, 85],
                color: '#36A2EB',
            },
        ],
        configs: {
            numRings: 5,
            strokeWidth: 2,
            showPoints: true,
        },
    },
};

export const SkillsAssessment: Story = {
    args: {
        labels: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'CSS', 'Testing'],
        dataSeries: [
            {
                name: 'Developer A',
                data: [90, 85, 80, 75, 70, 65],
                color: '#4BC0C0',
            },
            {
                name: 'Developer B',
                data: [70, 90, 85, 80, 75, 80],
                color: '#FFCE56',
            },
        ],
        configs: {
            maxValue: 100,
            numRings: 5,
            fillOpacity: 0.3,
        },
    },
};

export const WithoutGrid: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        dataSeries: [
            {
                name: 'Sales',
                data: [100, 150, 120, 180],
                color: '#9C27B0',
            },
        ],
        configs: {
            showGrid: false,
            strokeWidth: 3,
        },
    },
};

export const WithoutPoints: Story = {
    args: {
        labels: ['North', 'South', 'East', 'West', 'Central'],
        dataSeries: [
            {
                name: 'Region A',
                data: [60, 80, 70, 90, 75],
                color: '#2196F3',
            },
            {
                name: 'Region B',
                data: [70, 75, 85, 80, 70],
                color: '#4CAF50',
            },
        ],
        configs: {
            showPoints: false,
            fillOpacity: 0.4,
        },
    },
};

export const WithoutLegend: Story = {
    args: {
        labels: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
        dataSeries: [
            {
                name: 'Version 1.0',
                data: [80, 70, 90, 85],
                color: '#FF9800',
            },
        ],
        configs: {
            showLegend: false,
        },
    },
};

export const HighOpacity: Story = {
    args: {
        labels: ['Design', 'Functionality', 'Performance', 'Usability', 'Support'],
        dataSeries: [
            {
                name: 'App A',
                data: [85, 90, 80, 75, 88],
                color: '#F44336',
            },
            {
                name: 'App B',
                data: [75, 85, 90, 85, 80],
                color: '#00BCD4',
            },
        ],
        configs: {
            fillOpacity: 0.6,
            strokeWidth: 2.5,
        },
    },
};

export const ManyAxes: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dataSeries: [
            {
                name: '2023',
                data: [50, 60, 55, 70, 65, 80, 75, 85, 80, 90, 85, 95],
                color: '#7cb5ec',
            },
            {
                name: '2024',
                data: [55, 65, 60, 75, 70, 85, 80, 90, 85, 95, 90, 100],
                color: '#434348',
            },
        ],
        configs: {
            numRings: 5,
            showPoints: true,
        },
    },
};

export const LegendTop: Story = {
    args: {
        labels: ['Speed', 'Quality', 'Price', 'Service'],
        dataSeries: [
            {
                name: 'Company A',
                data: [90, 85, 70, 80],
                color: '#FF6384',
            },
            {
                name: 'Company B',
                data: [80, 90, 85, 75],
                color: '#36A2EB',
            },
        ],
        configs: {
            legendPosition: 'top',
        },
    },
};
