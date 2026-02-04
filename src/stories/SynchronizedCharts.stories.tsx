import type { Meta, StoryObj } from '@storybook/react-webpack5';
import SynchronizedCharts from '../graph/SynchronizedCharts';

const meta: Meta<typeof SynchronizedCharts> = {
    title: 'Components/SynchronizedCharts',
    component: SynchronizedCharts,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LineAndBar: Story = {
    args: {
        charts: [
            {
                type: 'line',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [20, 25, 30, 35, 40, 45],
                configs: {
                    YAxisName: 'Temperature (°C)',
                    strokeColor: '#3B82F6',
                },
            },
            {
                type: 'bar',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [100, 120, 150, 180, 200, 220],
                configs: {
                    YAxisName: 'Sales ($)',
                    backgroundColor: '#10B981',
                },
            },
        ],
    },
};

export const MultipleLines: Story = {
    args: {
        charts: [
            {
                type: 'line',
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                data: [100, 120, 110, 130],
                configs: {
                    YAxisName: 'Revenue ($K)',
                    strokeColor: '#3B82F6',
                },
            },
            {
                type: 'line',
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                data: [80, 90, 85, 95],
                configs: {
                    YAxisName: 'Profit ($K)',
                    strokeColor: '#10B981',
                },
            },
            {
                type: 'line',
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                data: [15, 18, 16, 20],
                configs: {
                    YAxisName: 'Growth (%)',
                    strokeColor: '#F59E0B',
                },
            },
        ],
    },
};

export const LineAreaAndBar: Story = {
    args: {
        charts: [
            {
                type: 'line',
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                data: [45, 52, 38, 61, 55],
                configs: {
                    YAxisName: 'Orders',
                    strokeColor: '#3B82F6',
                },
            },
            {
                type: 'area',
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                data: [85, 90, 75, 95, 88],
                configs: {
                    YAxisName: 'Satisfaction (%)',
                    strokeColor: '#10B981',
                    fillOpacity: 0.3,
                },
            },
            {
                type: 'bar',
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                data: [200, 250, 180, 300, 280],
                configs: {
                    YAxisName: 'Revenue ($)',
                    backgroundColor: '#F59E0B',
                },
            },
        ],
    },
};

export const SalesMetrics: Story = {
    args: {
        charts: [
            {
                type: 'bar',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [50000, 60000, 55000, 70000, 65000, 80000],
                configs: {
                    YAxisName: 'Sales ($)',
                    backgroundColor: '#3B82F6',
                },
            },
            {
                type: 'line',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [12, 15, 13, 18, 16, 20],
                configs: {
                    YAxisName: 'Growth Rate (%)',
                    strokeColor: '#10B981',
                },
            },
            {
                type: 'area',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                data: [500, 600, 550, 700, 650, 800],
                configs: {
                    YAxisName: 'Orders',
                    strokeColor: '#F59E0B',
                    fillOpacity: 0.4,
                },
            },
        ],
    },
};

export const HorizontalLayout: Story = {
    args: {
        layout: 'horizontal',
        charts: [
            {
                type: 'line',
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                data: [100, 120, 110, 130],
                configs: {
                    YAxisName: 'Users',
                    strokeColor: '#3B82F6',
                },
            },
            {
                type: 'bar',
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                data: [200, 250, 230, 280],
                configs: {
                    YAxisName: 'Page Views',
                    backgroundColor: '#10B981',
                },
            },
        ],
    },
};

export const CustomHighlightColor: Story = {
    args: {
        highlightColor: '#FF6384',
        highlightOpacity: 0.4,
        charts: [
            {
                type: 'line',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                data: [20, 25, 30, 35, 40],
                configs: {
                    YAxisName: 'Temperature (°C)',
                    strokeColor: '#3B82F6',
                },
            },
            {
                type: 'bar',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                data: [100, 120, 150, 180, 200],
                configs: {
                    YAxisName: 'Rainfall (mm)',
                    backgroundColor: '#60A5FA',
                },
            },
        ],
    },
};

export const ManyDataPoints: Story = {
    args: {
        charts: [
            {
                type: 'line',
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
                data: [100, 120, 150, 180, 200, 220, 210, 190, 180, 200, 230, 250],
                configs: {
                    YAxisName: 'Revenue ($K)',
                    strokeColor: '#3B82F6',
                },
            },
            {
                type: 'bar',
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
                data: [20, 25, 30, 35, 40, 45, 42, 38, 35, 40, 45, 50],
                configs: {
                    YAxisName: 'Growth (%)',
                    backgroundColor: '#10B981',
                },
            },
        ],
    },
};

export const MixedChartTypes: Story = {
    args: {
        charts: [
            {
                type: 'bar',
                labels: ['Product A', 'Product B', 'Product C', 'Product D'],
                data: [500, 600, 450, 700],
                configs: {
                    YAxisName: 'Sales',
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                },
            },
            {
                type: 'line',
                labels: ['Product A', 'Product B', 'Product C', 'Product D'],
                data: [30, 35, 28, 40],
                configs: {
                    YAxisName: 'Market Share (%)',
                    strokeColor: '#F59E0B',
                },
            },
            {
                type: 'area',
                labels: ['Product A', 'Product B', 'Product C', 'Product D'],
                data: [80, 85, 75, 90],
                configs: {
                    YAxisName: 'Satisfaction (%)',
                    strokeColor: '#8B5CF6',
                    fillOpacity: 0.3,
                },
            },
        ],
    },
};
