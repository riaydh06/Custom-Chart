import React from 'react';
import { render, screen } from '@testing-library/react';
import BarChart from './BarChart';

describe('BarChart', () => {
    const defaultLabels = ['Jan', 'Feb', 'Mar', 'Apr'];
    const defaultData = [10, 20, 30, 40];
    const defaultConfigs = {
        xAxisName: 'Month',
        YAxisName: 'Sales',
    };

    it('renders without crashing', () => {
        render(
            <BarChart labels={defaultLabels} data={defaultData} configs={defaultConfigs} />
        );
    });

    it('renders all bars for provided data', () => {
        const { container } = render(
            <BarChart labels={defaultLabels} data={defaultData} configs={defaultConfigs} />
        );
        const rects = container.querySelectorAll('rect');
        expect(rects.length).toBe(defaultData.length);
    });

    it('renders all labels', () => {
        render(
            <BarChart labels={defaultLabels} data={defaultData} configs={defaultConfigs} />
        );
        defaultLabels.forEach((label) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });

    it('applies custom background colors', () => {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
        const { container } = render(
            <BarChart
                labels={defaultLabels}
                data={defaultData}
                configs={{ ...defaultConfigs, backgroundColor: colors }}
            />
        );
        const rects = container.querySelectorAll('rect');
        expect(rects[0]).toHaveAttribute('fill', colors[0]);
        expect(rects[1]).toHaveAttribute('fill', colors[1]);
    });

    it('applies custom border colors', () => {
        const borderColors = ['#000000', '#ffffff', '#333333', '#cccccc'];
        const { container } = render(
            <BarChart
                labels={defaultLabels}
                data={defaultData}
                configs={{ ...defaultConfigs, borderColor: borderColors }}
            />
        );
        const rects = container.querySelectorAll('rect');
        expect(rects[0]).toHaveAttribute('stroke', borderColors[0]);
    });

    it('applies custom border width', () => {
        const { container } = render(
            <BarChart
                labels={defaultLabels}
                data={defaultData}
                configs={{ ...defaultConfigs, borderWidth: 3 }}
            />
        );
        const rects = container.querySelectorAll('rect');
        expect(rects[0]).toBeInTheDocument();
        expect(rects[0]?.getAttribute('stroke-width')).toBe('3');
    });

    it('handles empty data array', () => {
        const { container } = render(
            <BarChart labels={[]} data={[]} configs={defaultConfigs} />
        );
        const rects = container.querySelectorAll('rect');
        expect(rects.length).toBe(0);
        // SVG should still render
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('handles single data point', () => {
        const { container } = render(
            <BarChart labels={['Jan']} data={[10]} configs={defaultConfigs} />
        );
        const rects = container.querySelectorAll('rect');
        expect(rects.length).toBe(1);
    });

    it('calculates bar heights correctly', () => {
        const data = [10, 50, 100];
        const { container } = render(
            <BarChart labels={['A', 'B', 'C']} data={data} configs={defaultConfigs} />
        );
        const rects = container.querySelectorAll('rect');
        // The third bar should be tallest (100 is max)
        const heights = Array.from(rects).map((rect) =>
            parseFloat(rect.getAttribute('height') || '0')
        );
        expect(heights[2]).toBeGreaterThan(heights[1]);
        expect(heights[1]).toBeGreaterThan(heights[0]);
    });

    it('renders axis with custom names', () => {
        render(
            <BarChart
                labels={defaultLabels}
                data={defaultData}
                configs={{ xAxisName: 'Custom X', YAxisName: 'Custom Y' }}
            />
        );
        expect(screen.getByText('Custom X')).toBeInTheDocument();
        expect(screen.getByText('Custom Y')).toBeInTheDocument();
    });
});
