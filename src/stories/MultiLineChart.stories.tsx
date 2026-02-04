import type { Meta, StoryObj } from '@storybook/react-webpack5';
import MultiLineChart from '../graph/MultiLineChart';

const meta: Meta<typeof MultiLineChart> = {
    title: 'Components/MultiLineChart',
    component: MultiLineChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoLines: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        series: [
            {
                data: [100, 120, 150, 180, 200, 220],
                strokeColor: '#3B82F6',
                label: 'Sales',
            },
            {
                data: [80, 100, 120, 140, 160, 180],
                strokeColor: '#10B981',
                label: 'Revenue',
            },
        ],
        configs: {},
    },
};

export const ThreeLines: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        series: [
            {
                data: [100, 120, 110, 130],
                strokeColor: '#FF6384',
                label: 'Product A',
            },
            {
                data: [80, 90, 85, 95],
                strokeColor: '#36A2EB',
                label: 'Product B',
            },
            {
                data: [60, 70, 65, 75],
                strokeColor: '#FFCE56',
                label: 'Product C',
            },
        ],
        configs: {},
    },
};

export const WithDashedLine: Story = {
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        series: [
            {
                data: [45, 52, 38, 61, 55],
                strokeColor: '#3B82F6',
                label: 'Actual',
                strokeWidth: 2,
            },
            {
                data: [50, 55, 45, 65, 60],
                strokeColor: '#EF4444',
                label: 'Target',
                strokeWidth: 2,
                lineDashArray: '5,5',
            },
        ],
        configs: {},
    },
};

export const WithoutPoints: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        series: [
            {
                data: [100, 120, 150, 180, 200],
                strokeColor: '#3B82F6',
                label: 'Series 1',
                showPoints: false,
            },
            {
                data: [80, 100, 120, 140, 160],
                strokeColor: '#10B981',
                label: 'Series 2',
                showPoints: false,
            },
        ],
        configs: {},
    },
};

export const CustomStrokeWidth: Story = {
    args: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        series: [
            {
                data: [100, 120, 110, 130],
                strokeColor: '#3B82F6',
                label: 'Thin Line',
                strokeWidth: 1,
            },
            {
                data: [80, 90, 85, 95],
                strokeColor: '#10B981',
                label: 'Medium Line',
                strokeWidth: 3,
            },
            {
                data: [60, 70, 65, 75],
                strokeColor: '#F59E0B',
                label: 'Thick Line',
                strokeWidth: 5,
            },
        ],
        configs: {},
    },
};

export const SalesMetrics: Story = {
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
        series: [
            {
                data: [5000, 6000, 5500, 7000, 6500, 8000, 7500, 7000, 7500, 8000, 8500, 9000],
                strokeColor: '#3B82F6',
                label: 'Revenue',
            },
            {
                data: [3000, 3500, 3200, 4000, 3800, 4500, 4200, 4000, 4300, 4500, 4800, 5000],
                strokeColor: '#10B981',
                label: 'Profit',
            },
            {
                data: [2000, 2500, 2300, 3000, 2800, 3500, 3200, 3000, 3300, 3500, 3800, 4000],
                strokeColor: '#F59E0B',
                label: 'Cost',
            },
        ],
        configs: {
            xAxisName: 'Month',
            YAxisName: 'Amount ($)',
        },
    },
};

export const WithoutLegend: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        series: [
            {
                data: [100, 120, 110, 130],
                strokeColor: '#3B82F6',
            },
            {
                data: [80, 90, 85, 95],
                strokeColor: '#10B981',
            },
        ],
        configs: {
            showLegend: false,
        },
    },
};

export const LegendBottom: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        series: [
            {
                data: [100, 120, 150, 180, 200],
                strokeColor: '#3B82F6',
                label: 'North',
            },
            {
                data: [80, 100, 120, 140, 160],
                strokeColor: '#10B981',
                label: 'South',
            },
            {
                data: [60, 80, 100, 120, 140],
                strokeColor: '#F59E0B',
                label: 'East',
            },
        ],
        configs: {
            legendPosition: 'bottom',
        },
    },
};

export const ManyLines: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        series: [
            {
                data: [50, 60, 55, 70, 65, 80],
                strokeColor: '#FF6384',
                label: 'Series 1',
            },
            {
                data: [40, 50, 45, 60, 55, 70],
                strokeColor: '#36A2EB',
                label: 'Series 2',
            },
            {
                data: [30, 40, 35, 50, 45, 60],
                strokeColor: '#FFCE56',
                label: 'Series 3',
            },
            {
                data: [20, 30, 25, 40, 35, 50],
                strokeColor: '#4BC0C0',
                label: 'Series 4',
            },
            {
                data: [10, 20, 15, 30, 25, 40],
                strokeColor: '#9966FF',
                label: 'Series 5',
            },
        ],
        configs: {},
    },
};

export const MixedStyles: Story = {
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        series: [
            {
                data: [100, 120, 110, 130, 125],
                strokeColor: '#3B82F6',
                label: 'Solid Line',
                strokeWidth: 2,
                showPoints: true,
            },
            {
                data: [80, 90, 85, 95, 88],
                strokeColor: '#10B981',
                label: 'Dashed Line',
                strokeWidth: 2,
                lineDashArray: '5,5',
                showPoints: true,
            },
            {
                data: [60, 70, 65, 75, 70],
                strokeColor: '#F59E0B',
                label: 'Dotted Line',
                strokeWidth: 2,
                lineDashArray: '2,2',
                showPoints: false,
            },
        ],
        configs: {},
    },
};

export const CustomPointColors: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        series: [
            {
                data: [100, 120, 110, 130],
                strokeColor: '#3B82F6',
                label: 'Series 1',
                pointFillColor: '#FF6384',
                pointStrokeColor: '#333',
                pointRadius: 5,
            },
            {
                data: [80, 90, 85, 95],
                strokeColor: '#10B981',
                label: 'Series 2',
                pointFillColor: '#36A2EB',
                pointStrokeColor: '#333',
                pointRadius: 5,
            },
        ],
        configs: {},
    },
};
