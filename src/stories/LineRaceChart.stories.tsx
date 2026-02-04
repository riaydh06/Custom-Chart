import type { Meta, StoryObj } from '@storybook/react-webpack5';
import LineRaceChart from '../graph/LineRaceChart';

const meta: Meta<typeof LineRaceChart> = {
    title: 'Components/LineRaceChart',
    component: LineRaceChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        dataSeries: [
            { name: 'Team A', data: [10, 20, 30, 40, 50] },
            { name: 'Team B', data: [15, 25, 35, 30, 45] },
            { name: 'Team C', data: [5, 15, 25, 35, 40] },
        ],
        configs: {},
    },
};

export const Animated: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        dataSeries: [
            { name: 'Product A', data: [100, 150, 200, 180, 220, 250], color: '#FF6384' },
            { name: 'Product B', data: [80, 120, 180, 200, 190, 230], color: '#36A2EB' },
            { name: 'Product C', data: [60, 100, 140, 160, 180, 200], color: '#4BC0C0' },
        ],
        configs: {
            xAxisName: 'Month',
            YAxisName: 'Sales',
            animated: true,
            animationDuration: 500,
        },
    },
};

export const ManyCompetitors: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        dataSeries: [
            { name: 'Company A', data: [100, 150, 200, 250], color: '#2196F3' },
            { name: 'Company B', data: [120, 140, 180, 220], color: '#4CAF50' },
            { name: 'Company C', data: [80, 130, 170, 210], color: '#FF9800' },
            { name: 'Company D', data: [90, 110, 160, 200], color: '#F44336' },
            { name: 'Company E', data: [70, 100, 150, 190], color: '#9C27B0' },
        ],
        configs: {
            xAxisName: 'Quarter',
            YAxisName: 'Revenue',
            strokeWidth: 2.5,
        },
    },
};

export const WithoutPoints: Story = {
    args: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        dataSeries: [
            { name: 'Region North', data: [50, 75, 90, 85, 100], color: '#FF6384' },
            { name: 'Region South', data: [40, 65, 80, 95, 110], color: '#36A2EB' },
            { name: 'Region East', data: [30, 55, 70, 85, 90], color: '#4BC0C0' },
        ],
        configs: {
            xAxisName: 'Week',
            YAxisName: 'Users',
            showPoints: false,
        },
    },
};

export const FastAnimation: Story = {
    args: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        dataSeries: [
            { name: 'Stock A', data: [100, 120, 150, 180, 200, 220], color: '#4CAF50' },
            { name: 'Stock B', data: [90, 110, 140, 160, 190, 210], color: '#2196F3' },
            { name: 'Stock C', data: [80, 100, 130, 150, 180, 200], color: '#FF9800' },
        ],
        configs: {
            xAxisName: 'Year',
            YAxisName: 'Price',
            animated: true,
            animationDuration: 200,
            strokeWidth: 3,
        },
    },
};

export const WithoutLegend: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        dataSeries: [
            { name: 'Metric 1', data: [20, 30, 40, 50], color: '#9C27B0' },
            { name: 'Metric 2', data: [15, 25, 35, 45], color: '#00BCD4' },
        ],
        configs: {
            xAxisName: 'Month',
            YAxisName: 'Value',
            showLegend: false,
        },
    },
};

export const LongTimeSeries: Story = {
    args: {
        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        dataSeries: [
            { name: 'Technology', data: [100, 120, 150, 180, 200, 220, 250, 280, 300, 320], color: '#2196F3' },
            { name: 'Healthcare', data: [80, 100, 130, 160, 190, 210, 240, 270, 290, 310], color: '#4CAF50' },
            { name: 'Finance', data: [90, 110, 140, 170, 200, 230, 260, 290, 310, 330], color: '#FF9800' },
        ],
        configs: {
            xAxisName: 'Year',
            YAxisName: 'Index',
            strokeWidth: 2,
            pointRadius: 3,
        },
    },
};

export const LegendTop: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        dataSeries: [
            { name: 'Desktop', data: [100, 120, 140, 160], color: '#FF6384' },
            { name: 'Mobile', data: [80, 100, 120, 150], color: '#36A2EB' },
            { name: 'Tablet', data: [20, 30, 40, 50], color: '#FFCE56' },
        ],
        configs: {
            xAxisName: 'Quarter',
            YAxisName: 'Traffic',
            legendPosition: 'top',
        },
    },
};
