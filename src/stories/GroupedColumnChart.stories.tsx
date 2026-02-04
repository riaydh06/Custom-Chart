import type { Meta, StoryObj } from '@storybook/react-webpack5';
import GroupedColumnChart from '../graph/GroupedColumnChart';

const meta: Meta<typeof GroupedColumnChart> = {
    title: 'Components/GroupedColumnChart',
    component: GroupedColumnChart,
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

export const TwoGroups: Story = {
    args: {
        labels: ['2020', '2021', '2022', '2023'],
        dataSeries: [
            { name: 'Revenue', data: [1000, 1200, 1500, 1800], color: '#4CAF50' },
            { name: 'Costs', data: [600, 700, 800, 900], color: '#F44336' },
        ],
        configs: {
            xAxisName: 'Year',
            YAxisName: 'Amount',
        },
    },
};

export const ManyCategories: Story = {
    args: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        dataSeries: [
            { name: 'Desktop', data: [100, 120, 110, 130, 125], color: '#9C27B0' },
            { name: 'Mobile', data: [80, 100, 90, 110, 105], color: '#00BCD4' },
            { name: 'Tablet', data: [20, 30, 25, 35, 30], color: '#FFC107' },
        ],
        configs: {
            xAxisName: 'Week',
            YAxisName: 'Users',
        },
    },
};

export const WithoutLegend: Story = {
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
            showLegend: false,
        },
    },
};

export const LegendTop: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        dataSeries: [
            { name: 'Product A', data: [100, 120, 130, 140], color: '#FF6384' },
            { name: 'Product B', data: [80, 90, 100, 110], color: '#36A2EB' },
            { name: 'Product C', data: [60, 70, 80, 90], color: '#4BC0C0' },
            { name: 'Product D', data: [40, 50, 60, 70], color: '#FFCE56' },
        ],
        configs: {
            xAxisName: 'Quarter',
            YAxisName: 'Sales',
            legendPosition: 'top',
        },
    },
};

export const CustomSpacing: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        dataSeries: [
            { name: 'Series A', data: [100, 120, 110, 130], color: '#2196F3' },
            { name: 'Series B', data: [80, 100, 90, 110], color: '#4CAF50' },
        ],
        configs: {
            xAxisName: 'Month',
            YAxisName: 'Value',
            groupSpacing: 20,
        },
    },
};

export const FiveSeries: Story = {
    args: {
        labels: ['2020', '2021', '2022'],
        dataSeries: [
            { name: 'Category 1', data: [100, 120, 140], color: '#FF6384' },
            { name: 'Category 2', data: [80, 100, 120], color: '#36A2EB' },
            { name: 'Category 3', data: [60, 80, 100], color: '#4BC0C0' },
            { name: 'Category 4', data: [40, 60, 80], color: '#FFCE56' },
            { name: 'Category 5', data: [20, 40, 60], color: '#9966FF' },
        ],
        configs: {
            xAxisName: 'Year',
            YAxisName: 'Count',
        },
    },
};
