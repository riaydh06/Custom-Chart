import type { Meta, StoryObj } from '@storybook/react-webpack5';
import ColumnRangeChart from '../graph/ColumnRangeChart';

const meta: Meta<typeof ColumnRangeChart> = {
    title: 'Components/ColumnRangeChart',
    component: ColumnRangeChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [
            { low: 10, high: 25 },
            { low: 15, high: 30 },
            { low: 12, high: 28 },
            { low: 18, high: 35 },
            { low: 20, high: 32 },
            { low: 16, high: 29 },
        ],
        configs: {},
    },
};

export const TemperatureRange: Story = {
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [
            { low: 15, high: 25 },
            { low: 18, high: 28 },
            { low: 20, high: 30 },
            { low: 17, high: 27 },
            { low: 19, high: 29 },
            { low: 22, high: 32 },
            { low: 16, high: 26 },
        ],
        configs: {
            xAxisName: 'Day',
            YAxisName: 'Temperature (°C)',
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384'],
            borderWidth: 2,
            showValues: true,
        },
    },
};

export const PriceRange: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [
            { low: 100, high: 150 },
            { low: 120, high: 180 },
            { low: 110, high: 170 },
            { low: 130, high: 200 },
        ],
        configs: {
            xAxisName: 'Quarter',
            YAxisName: 'Price ($)',
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800', '#F44336'],
            borderColor: ['#1565C0', '#2E7D32', '#E65100', '#C62828'],
            borderWidth: 2,
            numYTicks: 6,
        },
    },
};

export const WithValues: Story = {
    args: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [
            { low: 50, high: 80 },
            { low: 60, high: 90 },
            { low: 55, high: 85 },
            { low: 65, high: 95 },
        ],
        configs: {
            xAxisName: 'Week',
            YAxisName: 'Value',
            backgroundColor: ['#9C27B0', '#00BCD4', '#FFC107', '#4CAF50'],
            borderColor: ['#6A1B9A', '#0097A7', '#FF8F00', '#2E7D32'],
            borderWidth: 2,
            showValues: true,
        },
    },
};

export const StockPriceRange: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        data: [
            { low: 45, high: 55 },
            { low: 48, high: 58 },
            { low: 50, high: 62 },
            { low: 52, high: 65 },
            { low: 55, high: 68 },
            { low: 53, high: 66 },
            { low: 57, high: 70 },
            { low: 60, high: 72 },
        ],
        configs: {
            xAxisName: 'Month',
            YAxisName: 'Stock Price ($)',
            backgroundColor: '#7cb5ec',
            borderColor: '#434348',
            borderWidth: 1.5,
            numYTicks: 8,
        },
    },
};

export const WideRange: Story = {
    args: {
        labels: ['Category A', 'Category B', 'Category C', 'Category D'],
        data: [
            { low: 10, high: 100 },
            { low: 20, high: 120 },
            { low: 15, high: 110 },
            { low: 25, high: 130 },
        ],
        configs: {
            xAxisName: 'Category',
            YAxisName: 'Range',
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            borderWidth: 2,
            showValues: true,
        },
    },
};

export const NarrowRange: Story = {
    args: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
        data: [
            { low: 95, high: 105 },
            { low: 98, high: 108 },
            { low: 100, high: 110 },
            { low: 102, high: 112 },
            { low: 99, high: 109 },
        ],
        configs: {
            xAxisName: 'Day',
            YAxisName: 'Value',
            backgroundColor: '#4CAF50',
            borderColor: '#2E7D32',
            borderWidth: 2,
            numYTicks: 10,
            showValues: true,
        },
    },
};

export const CustomColors: Story = {
    args: {
        labels: ['Region 1', 'Region 2', 'Region 3', 'Region 4'],
        data: [
            { low: 30, high: 60 },
            { low: 40, high: 70 },
            { low: 35, high: 65 },
            { low: 45, high: 75 },
        ],
        configs: {
            xAxisName: 'Region',
            YAxisName: 'Score',
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800', '#F44336'],
            borderColor: ['#1565C0', '#2E7D32', '#E65100', '#C62828'],
            borderWidth: 2,
        },
    },
};
