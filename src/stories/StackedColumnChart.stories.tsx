import type { Meta, StoryObj } from '@storybook/react-webpack5';
import StackedColumnChart from '../graph/StackedColumnChart';

const meta: Meta<typeof StackedColumnChart> = {
    title: 'Components/StackedColumnChart',
    component: StackedColumnChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        dataSeries: [
            { name: 'Product A', data: [100, 120, 130, 140] },
            { name: 'Product B', data: [80, 90, 100, 110] },
            { name: 'Product C', data: [60, 70, 80, 90] },
        ],
        configs: {},
    },
};

export const WithAxisNames: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        dataSeries: [
            { name: 'Sales', data: [50, 60, 70, 65, 80], color: '#FF6384' },
            { name: 'Marketing', data: [30, 40, 50, 45, 55], color: '#36A2EB' },
            { name: 'Support', data: [20, 25, 30, 28, 35], color: '#4BC0C0' },
        ],
        configs: {
            xAxisName: 'Month',
            YAxisName: 'Revenue',
        },
    },
};

export const CustomColors: Story = {
    args: {
        labels: ['North', 'South', 'East', 'West'],
        dataSeries: [
            { name: 'Region A', data: [150, 180, 200, 170], color: '#2196F3' },
            { name: 'Region B', data: [120, 150, 180, 160], color: '#4CAF50' },
            { name: 'Region C', data: [100, 130, 150, 140], color: '#FF9800' },
        ],
        configs: {
            xAxisName: 'Region',
            YAxisName: 'Sales',
            borderWidth: 2,
        },
    },
};

export const ManyCategories: Story = {
    args: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        dataSeries: [
            { name: 'Desktop', data: [100, 120, 110, 130, 125, 140], color: '#9C27B0' },
            { name: 'Mobile', data: [80, 100, 90, 110, 105, 120], color: '#00BCD4' },
            { name: 'Tablet', data: [20, 30, 25, 35, 30, 40], color: '#FFC107' },
        ],
        configs: {
            xAxisName: 'Week',
            YAxisName: 'Users',
        },
    },
};

export const WithoutLegend: Story = {
    args: {
        labels: ['2020', '2021', '2022', '2023'],
        dataSeries: [
            { name: 'Revenue', data: [1000, 1200, 1500, 1800], color: '#4CAF50' },
            { name: 'Costs', data: [600, 700, 800, 900], color: '#F44336' },
        ],
        configs: {
            xAxisName: 'Year',
            YAxisName: 'Amount',
            showLegend: false,
        },
    },
};

export const LegendTop: Story = {
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        dataSeries: [
            { name: 'Morning', data: [50, 55, 60, 58, 65], color: '#FF6384' },
            { name: 'Afternoon', data: [70, 75, 80, 78, 85], color: '#36A2EB' },
            { name: 'Evening', data: [40, 45, 50, 48, 55], color: '#FFCE56' },
        ],
        configs: {
            xAxisName: 'Day',
            YAxisName: 'Traffic',
            legendPosition: 'top',
        },
    },
};

export const FourSeries: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        dataSeries: [
            { name: 'Q1 Sales', data: [100, 0, 0, 0], color: '#FF6384' },
            { name: 'Q2 Sales', data: [0, 120, 0, 0], color: '#36A2EB' },
            { name: 'Q3 Sales', data: [0, 0, 130, 0], color: '#4BC0C0' },
            { name: 'Q4 Sales', data: [0, 0, 0, 140], color: '#FFCE56' },
        ],
        configs: {
            xAxisName: 'Quarter',
            YAxisName: 'Sales',
        },
    },
};
