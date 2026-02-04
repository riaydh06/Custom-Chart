import type { Meta, StoryObj } from '@storybook/react-webpack5';
import MultiAreaChart from '../graph/MultiAreaChart';

const meta: Meta<typeof MultiAreaChart> = {
    title: 'Components/MultiAreaChart',
    component: MultiAreaChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OverlappingAreas: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        series: [
            {
                data: [100, 120, 150, 180, 200, 220],
                fillColor: '#3B82F6',
                strokeColor: '#2563EB',
                label: 'Sales',
            },
            {
                data: [80, 100, 120, 140, 160, 180],
                fillColor: '#10B981',
                strokeColor: '#059669',
                label: 'Revenue',
            },
        ],
        configs: {
            stacked: false,
        },
    },
};

export const StackedAreas: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        series: [
            {
                data: [100, 120, 150, 180, 200, 220],
                fillColor: '#3B82F6',
                strokeColor: '#2563EB',
                label: 'Product A',
            },
            {
                data: [80, 100, 120, 140, 160, 180],
                fillColor: '#10B981',
                strokeColor: '#059669',
                label: 'Product B',
            },
            {
                data: [60, 80, 100, 120, 140, 160],
                fillColor: '#F59E0B',
                strokeColor: '#D97706',
                label: 'Product C',
            },
        ],
        configs: {
            stacked: true,
        },
    },
};

export const ThreeOverlappingAreas: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        series: [
            {
                data: [100, 120, 110, 130],
                fillColor: '#FF6384',
                strokeColor: '#C73650',
                label: 'Region A',
                fillOpacity: 0.4,
            },
            {
                data: [80, 90, 85, 95],
                fillColor: '#36A2EB',
                strokeColor: '#2A7FC1',
                label: 'Region B',
                fillOpacity: 0.4,
            },
            {
                data: [60, 70, 65, 75],
                fillColor: '#FFCE56',
                strokeColor: '#CC9E45',
                label: 'Region C',
                fillOpacity: 0.4,
            },
        ],
        configs: {
            stacked: false,
        },
    },
};

export const StackedWithPoints: Story = {
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        series: [
            {
                data: [45, 52, 38, 61, 55],
                fillColor: '#8B5CF6',
                strokeColor: '#7C3AED',
                label: 'Desktop',
                showPoints: true,
            },
            {
                data: [30, 35, 28, 40, 38],
                fillColor: '#EC4899',
                strokeColor: '#DB2777',
                label: 'Mobile',
                showPoints: true,
            },
            {
                data: [15, 18, 12, 20, 17],
                fillColor: '#F59E0B',
                strokeColor: '#D97706',
                label: 'Tablet',
                showPoints: true,
            },
        ],
        configs: {
            stacked: true,
        },
    },
};

export const SalesByCategory: Story = {
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
                fillColor: '#3B82F6',
                strokeColor: '#2563EB',
                label: 'Electronics',
            },
            {
                data: [3000, 3500, 3200, 4000, 3800, 4500, 4200, 4000, 4300, 4500, 4800, 5000],
                fillColor: '#10B981',
                strokeColor: '#059669',
                label: 'Clothing',
            },
            {
                data: [2000, 2500, 2300, 3000, 2800, 3500, 3200, 3000, 3300, 3500, 3800, 4000],
                fillColor: '#F59E0B',
                strokeColor: '#D97706',
                label: 'Food',
            },
        ],
        configs: {
            stacked: true,
            xAxisName: 'Month',
            YAxisName: 'Sales ($)',
        },
    },
};

export const WithoutLegend: Story = {
    args: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        series: [
            {
                data: [100, 120, 110, 130],
                fillColor: '#3B82F6',
                strokeColor: '#2563EB',
            },
            {
                data: [80, 90, 85, 95],
                fillColor: '#10B981',
                strokeColor: '#059669',
            },
        ],
        configs: {
            stacked: false,
            showLegend: false,
        },
    },
};

export const CustomOpacity: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        series: [
            {
                data: [100, 120, 150, 180, 200],
                fillColor: '#FF6384',
                strokeColor: '#C73650',
                label: 'Series 1',
                fillOpacity: 0.5,
            },
            {
                data: [80, 100, 120, 140, 160],
                fillColor: '#36A2EB',
                strokeColor: '#2A7FC1',
                label: 'Series 2',
                fillOpacity: 0.3,
            },
            {
                data: [60, 80, 100, 120, 140],
                fillColor: '#FFCE56',
                strokeColor: '#CC9E45',
                label: 'Series 3',
                fillOpacity: 0.4,
            },
        ],
        configs: {
            stacked: false,
        },
    },
};

export const LegendBottom: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        series: [
            {
                data: [100, 120, 110, 130],
                fillColor: '#3B82F6',
                strokeColor: '#2563EB',
                label: 'North',
            },
            {
                data: [80, 90, 85, 95],
                fillColor: '#10B981',
                strokeColor: '#059669',
                label: 'South',
            },
        ],
        configs: {
            stacked: false,
            legendPosition: 'bottom',
        },
    },
};

export const ManySeries: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        series: [
            {
                data: [50, 60, 55, 70, 65, 80],
                fillColor: '#FF6384',
                strokeColor: '#C73650',
                label: 'Series 1',
            },
            {
                data: [40, 50, 45, 60, 55, 70],
                fillColor: '#36A2EB',
                strokeColor: '#2A7FC1',
                label: 'Series 2',
            },
            {
                data: [30, 40, 35, 50, 45, 60],
                fillColor: '#FFCE56',
                strokeColor: '#CC9E45',
                label: 'Series 3',
            },
            {
                data: [20, 30, 25, 40, 35, 50],
                fillColor: '#4BC0C0',
                strokeColor: '#3A9B9B',
                label: 'Series 4',
            },
            {
                data: [10, 20, 15, 30, 25, 40],
                fillColor: '#9966FF',
                strokeColor: '#7A4FCC',
                label: 'Series 5',
            },
        ],
        configs: {
            stacked: true,
        },
    },
};
