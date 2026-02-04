import type { Meta, StoryObj } from '@storybook/react-webpack5';
import AnimatedLineChart from '../graph/AnimatedLineChart';

const meta: Meta<typeof AnimatedLineChart> = {
    title: 'Components/AnimatedLineChart',
    component: AnimatedLineChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DrawAnimation: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [100, 120, 150, 180, 200, 220],
        configs: {
            animationType: 'draw',
            animationDuration: 2000,
            enableAnimation: true,
        },
    },
};

export const FadeAnimation: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [100, 120, 110, 130],
        configs: {
            animationType: 'fade',
            animationDuration: 1500,
            enableAnimation: true,
        },
    },
};

export const SlideAnimation: Story = {
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        data: [45, 52, 38, 61, 55],
        configs: {
            animationType: 'slide',
            animationDuration: 1800,
            enableAnimation: true,
        },
    },
};

export const BounceAnimation: Story = {
    args: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [100, 120, 110, 130],
        configs: {
            animationType: 'bounce',
            animationDuration: 2000,
            enableAnimation: true,
        },
    },
};

export const FastAnimation: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        data: [100, 120, 150, 180, 200],
        configs: {
            animationType: 'draw',
            animationDuration: 500,
            enableAnimation: true,
        },
    },
};

export const SlowAnimation: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [100, 120, 150, 180, 200, 220],
        configs: {
            animationType: 'draw',
            animationDuration: 4000,
            enableAnimation: true,
        },
    },
};

export const WithDelay: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [100, 120, 110, 130],
        configs: {
            animationType: 'draw',
            animationDuration: 2000,
            animationDelay: 500,
            enableAnimation: true,
        },
    },
};

export const WithoutPoints: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        data: [100, 120, 150, 180, 200],
        configs: {
            animationType: 'draw',
            animationDuration: 2000,
            showPoints: false,
            enableAnimation: true,
        },
    },
};

export const CustomColors: Story = {
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        data: [45, 52, 38, 61, 55],
        configs: {
            animationType: 'draw',
            animationDuration: 2000,
            strokeColor: '#10B981',
            pointFillColor: '#059669',
            enableAnimation: true,
        },
    },
};

export const ManyDataPoints: Story = {
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
        data: [100, 120, 150, 180, 200, 220, 210, 190, 180, 200, 230, 250],
        configs: {
            animationType: 'draw',
            animationDuration: 3000,
            enableAnimation: true,
        },
    },
};

export const DisabledAnimation: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        data: [100, 120, 150, 180, 200],
        configs: {
            enableAnimation: false,
        },
    },
};

export const CustomPointAnimation: Story = {
    args: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [100, 120, 110, 130],
        configs: {
            animationType: 'draw',
            animationDuration: 2000,
            pointAnimationDelay: 200,
            enableAnimation: true,
        },
    },
};

export const MultipleLinesDraw: Story = {
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
        configs: {
            animationType: 'draw',
            animationDuration: 2000,
            seriesAnimationDelay: 300,
            enableAnimation: true,
        },
    },
};

export const MultipleLinesFade: Story = {
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
        configs: {
            animationType: 'fade',
            animationDuration: 1500,
            seriesAnimationDelay: 200,
            enableAnimation: true,
        },
    },
};

export const MultipleLinesSlide: Story = {
    args: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        series: [
            {
                data: [45, 52, 38, 61, 55],
                strokeColor: '#3B82F6',
                label: 'Region A',
            },
            {
                data: [35, 42, 28, 51, 45],
                strokeColor: '#10B981',
                label: 'Region B',
            },
        ],
        configs: {
            animationType: 'slide',
            animationDuration: 1800,
            seriesAnimationDelay: 250,
            enableAnimation: true,
        },
    },
};

export const MultipleLinesBounce: Story = {
    args: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        series: [
            {
                data: [100, 120, 110, 130],
                strokeColor: '#8B5CF6',
                label: 'Desktop',
            },
            {
                data: [80, 90, 85, 95],
                strokeColor: '#EC4899',
                label: 'Mobile',
            },
            {
                data: [60, 70, 65, 75],
                strokeColor: '#F59E0B',
                label: 'Tablet',
            },
        ],
        configs: {
            animationType: 'bounce',
            animationDuration: 2000,
            seriesAnimationDelay: 300,
            enableAnimation: true,
        },
    },
};

export const MultipleLinesWithDashed: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        series: [
            {
                data: [100, 120, 150, 180, 200],
                strokeColor: '#3B82F6',
                label: 'Actual',
                strokeWidth: 2,
            },
            {
                data: [110, 130, 160, 190, 210],
                strokeColor: '#EF4444',
                label: 'Target',
                strokeWidth: 2,
                lineDashArray: '5,5',
            },
        ],
        configs: {
            animationType: 'draw',
            animationDuration: 2000,
            seriesAnimationDelay: 300,
            enableAnimation: true,
        },
    },
};

export const MultipleLinesSequential: Story = {
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
            animationType: 'draw',
            animationDuration: 2500,
            seriesAnimationDelay: 400,
            enableAnimation: true,
            xAxisName: 'Month',
            YAxisName: 'Amount ($)',
        },
    },
};

export const MultipleLinesWithoutLegend: Story = {
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
            animationType: 'draw',
            animationDuration: 2000,
            showLegend: false,
            enableAnimation: true,
        },
    },
};

export const MultipleLinesCustomDelays: Story = {
    args: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        series: [
            {
                data: [100, 120, 150, 180, 200],
                strokeColor: '#3B82F6',
                label: 'Series 1',
            },
            {
                data: [80, 100, 120, 140, 160],
                strokeColor: '#10B981',
                label: 'Series 2',
            },
            {
                data: [60, 80, 100, 120, 140],
                strokeColor: '#F59E0B',
                label: 'Series 3',
            },
        ],
        configs: {
            animationType: 'draw',
            animationDuration: 2000,
            animationDelay: 500,
            seriesAnimationDelay: 500,
            pointAnimationDelay: 150,
            enableAnimation: true,
        },
    },
};
