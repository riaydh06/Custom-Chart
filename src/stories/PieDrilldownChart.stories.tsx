import type { Meta, StoryObj } from '@storybook/react-webpack5';
import PieDrilldownChart from '../graph/PieDrilldownChart';

const meta: Meta<typeof PieDrilldownChart> = {
    title: 'Components/PieDrilldownChart',
    component: PieDrilldownChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        data: [150, 100, 50],
        drilldown: {
            'Desktop': [
                { name: 'Windows', value: 80, color: '#7cb5ec' },
                { name: 'Mac', value: 50, color: '#434348' },
                { name: 'Linux', value: 20, color: '#90ed7d' },
            ],
            'Mobile': [
                { name: 'iOS', value: 60, color: '#f7a35c' },
                { name: 'Android', value: 40, color: '#8085e9' },
            ],
            'Tablet': [
                { name: 'iPad', value: 30, color: '#FF6384' },
                { name: 'Android Tablet', value: 20, color: '#36A2EB' },
            ],
        },
        configs: {
            backgroundColor: ['#7cb5ec', '#434348', '#90ed7d'],
            borderColor: ['white', 'white', 'white'],
            borderWidth: 2,
        },
    },
};

export const SalesByRegion: Story = {
    args: {
        labels: ['North', 'South', 'East', 'West'],
        data: [200, 150, 180, 120],
        drilldown: {
            'North': [
                { name: 'City A', value: 100, color: '#2196F3' },
                { name: 'City B', value: 80, color: '#1565C0' },
                { name: 'City C', value: 20, color: '#64B5F6' },
            ],
            'South': [
                { name: 'City D', value: 90, color: '#4CAF50' },
                { name: 'City E', value: 60, color: '#2E7D32' },
            ],
            'East': [
                { name: 'City F', value: 100, color: '#FF9800' },
                { name: 'City G', value: 80, color: '#E65100' },
            ],
            'West': [
                { name: 'City H', value: 70, color: '#F44336' },
                { name: 'City I', value: 50, color: '#C62828' },
            ],
        },
        configs: {
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800', '#F44336'],
            borderColor: ['white', 'white', 'white', 'white'],
            borderWidth: 2,
            showLabels: true,
        },
    },
};

export const ProductCategories: Story = {
    args: {
        labels: ['Electronics', 'Clothing', 'Food', 'Books'],
        data: [300, 200, 150, 100],
        drilldown: {
            'Electronics': [
                { name: 'Phones', value: 120, color: '#FF6384' },
                { name: 'Laptops', value: 100, color: '#36A2EB' },
                { name: 'Tablets', value: 80, color: '#FFCE56' },
            ],
            'Clothing': [
                { name: 'Men', value: 100, color: '#4BC0C0' },
                { name: 'Women', value: 80, color: '#9966FF' },
                { name: 'Kids', value: 20, color: '#FF9F40' },
            ],
            'Food': [
                { name: 'Fruits', value: 60, color: '#4CAF50' },
                { name: 'Vegetables', value: 50, color: '#8BC34A' },
                { name: 'Dairy', value: 40, color: '#CDDC39' },
            ],
            'Books': [
                { name: 'Fiction', value: 60, color: '#9C27B0' },
                { name: 'Non-Fiction', value: 40, color: '#673AB7' },
            ],
        },
        configs: {
            backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#9966FF'],
            borderColor: ['white', 'white', 'white', 'white'],
            borderWidth: 2,
            showLabels: true,
        },
    },
};

export const WithPinLegend: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [100, 150, 120, 180],
        drilldown: {
            'Q1': [
                { name: 'Jan', value: 40, color: '#7cb5ec' },
                { name: 'Feb', value: 35, color: '#434348' },
                { name: 'Mar', value: 25, color: '#90ed7d' },
            ],
            'Q2': [
                { name: 'Apr', value: 50, color: '#f7a35c' },
                { name: 'May', value: 55, color: '#8085e9' },
                { name: 'Jun', value: 45, color: '#FF6384' },
            ],
            'Q3': [
                { name: 'Jul', value: 40, color: '#36A2EB' },
                { name: 'Aug', value: 45, color: '#FFCE56' },
                { name: 'Sep', value: 35, color: '#4BC0C0' },
            ],
            'Q4': [
                { name: 'Oct', value: 60, color: '#9966FF' },
                { name: 'Nov', value: 65, color: '#FF9F40' },
                { name: 'Dec', value: 55, color: '#4CAF50' },
            ],
        },
        configs: {
            backgroundColor: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c'],
            borderColor: ['white', 'white', 'white', 'white'],
            borderWidth: 2,
            legendType: 'pin',
            showLabels: false,
            showPinValues: true,
        },
    },
};

export const PartialDrilldown: Story = {
    args: {
        labels: ['Category A', 'Category B', 'Category C', 'Category D'],
        data: [100, 80, 60, 40],
        drilldown: {
            'Category A': [
                { name: 'Sub A1', value: 50, color: '#FF6384' },
                { name: 'Sub A2', value: 30, color: '#36A2EB' },
                { name: 'Sub A3', value: 20, color: '#FFCE56' },
            ],
            'Category B': [
                { name: 'Sub B1', value: 45, color: '#4BC0C0' },
                { name: 'Sub B2', value: 35, color: '#9966FF' },
            ],
            // Category C and D have no drilldown
        },
        configs: {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            borderColor: ['white', 'white', 'white', 'white'],
            borderWidth: 2,
            showLabels: true,
        },
    },
};

export const ManyDrilldownLevels: Story = {
    args: {
        labels: ['Region 1', 'Region 2', 'Region 3'],
        data: [200, 150, 100],
        drilldown: {
            'Region 1': [
                { name: 'City 1A', value: 80, color: '#2196F3' },
                { name: 'City 1B', value: 70, color: '#1565C0' },
                { name: 'City 1C', value: 50, color: '#64B5F6' },
            ],
            'Region 2': [
                { name: 'City 2A', value: 60, color: '#4CAF50' },
                { name: 'City 2B', value: 50, color: '#2E7D32' },
                { name: 'City 2C', value: 40, color: '#81C784' },
            ],
            'Region 3': [
                { name: 'City 3A', value: 50, color: '#FF9800' },
                { name: 'City 3B', value: 30, color: '#E65100' },
                { name: 'City 3C', value: 20, color: '#FFB74D' },
            ],
        },
        configs: {
            backgroundColor: ['#2196F3', '#4CAF50', '#FF9800'],
            borderColor: ['white', 'white', 'white'],
            borderWidth: 2,
            showLabels: true,
            legendType: 'box',
        },
    },
};

export const WithCallbacks: Story = {
    args: {
        labels: ['Product A', 'Product B', 'Product C'],
        data: [150, 120, 100],
        drilldown: {
            'Product A': [
                { name: 'Version 1.0', value: 60, color: '#FF6384' },
                { name: 'Version 2.0', value: 50, color: '#36A2EB' },
                { name: 'Version 3.0', value: 40, color: '#FFCE56' },
            ],
            'Product B': [
                { name: 'Version 1.0', value: 70, color: '#4BC0C0' },
                { name: 'Version 2.0', value: 50, color: '#9966FF' },
            ],
        },
        configs: {
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderColor: ['white', 'white', 'white'],
            borderWidth: 2,
            onDrilldown: (key) => {
                console.log('Drilled down to:', key);
                alert(`Drilled down to: ${key}`);
            },
            onDrillup: () => {
                console.log('Drilled up');
                alert('Drilled up to main level');
            },
        },
    },
};
