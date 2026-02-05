import React from 'react';
import { render, screen } from '@testing-library/react';
import LineChart from './LineChart';

describe('LineChart', () => {
    const defaultLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const defaultData = [10, 20, 15, 25, 30];
    const defaultConfigs = {
        xAxisName: 'Day',
        YAxisName: 'Temperature',
    };

    it('renders without crashing', () => {
        render(
            <LineChart labels={defaultLabels} data={defaultData} configs={defaultConfigs} />
        );
    });

    it('renders a line path', () => {
        const { container } = render(
            <LineChart labels={defaultLabels} data={defaultData} configs={defaultConfigs} />
        );
        const path = container.querySelector('path');
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute('d');
    });

    it('renders points when showPoints is true', () => {
        const { container } = render(
            <LineChart
                labels={defaultLabels}
                data={defaultData}
                configs={{ ...defaultConfigs, showPoints: true }}
            />
        );
        const circles = container.querySelectorAll('circle');
        // Points are rendered by default, so should be present
        expect(circles.length).toBe(defaultData.length);
    });

    it('does not render points when showPoints is false', () => {
        const { container } = render(
            <LineChart
                labels={defaultLabels}
                data={defaultData}
                configs={{ ...defaultConfigs, showPoints: false }}
            />
        );
        const circles = container.querySelectorAll('circle');
        expect(circles.length).toBe(0);
    });

    it('applies custom stroke color', () => {
        const { container } = render(
            <LineChart
                labels={defaultLabels}
                data={defaultData}
                configs={{ ...defaultConfigs, strokeColor: '#ff0000' }}
            />
        );
        const path = container.querySelector('path');
        expect(path).toHaveAttribute('stroke', '#ff0000');
    });

    it('applies custom stroke width', () => {
        const { container } = render(
            <LineChart
                labels={defaultLabels}
                data={defaultData}
                configs={{ ...defaultConfigs, strokeWidth: 5 }}
            />
        );
        const path = container.querySelector('path');
        expect(path).toBeInTheDocument();
        expect(path?.getAttribute('stroke-width')).toBe('5');
    });

    it('applies dashed line pattern', () => {
        const { container } = render(
            <LineChart
                labels={defaultLabels}
                data={defaultData}
                configs={{ ...defaultConfigs, lineDashArray: '5,5' }}
            />
        );
        const path = container.querySelector('path');
        expect(path).toBeInTheDocument();
        expect(path?.getAttribute('stroke-dasharray')).toBe('5,5');
    });

    it('renders all labels', () => {
        render(
            <LineChart labels={defaultLabels} data={defaultData} configs={defaultConfigs} />
        );
        defaultLabels.forEach((label) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });

    it('handles empty data array', () => {
        const { container } = render(
            <LineChart labels={[]} data={[]} configs={defaultConfigs} />
        );
        // SVG should still render
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        // Path should not exist with empty data
        const path = container.querySelector('path');
        expect(path).not.toBeInTheDocument();
    });

    it('applies custom point radius', () => {
        const { container } = render(
            <LineChart
                labels={defaultLabels}
                data={defaultData}
                configs={{ ...defaultConfigs, showPoints: true, pointRadius: 8 }}
            />
        );
        const circles = container.querySelectorAll('circle');
        expect(circles[0]).toHaveAttribute('r', '8');
    });

    it('applies custom point colors', () => {
        const { container } = render(
            <LineChart
                labels={defaultLabels}
                data={defaultData}
                configs={{
                    ...defaultConfigs,
                    showPoints: true,
                    pointFillColor: '#00ff00',
                    pointStrokeColor: '#0000ff',
                }}
            />
        );
        const circles = container.querySelectorAll('circle');
        expect(circles[0]).toHaveAttribute('fill', '#00ff00');
        expect(circles[0]).toHaveAttribute('stroke', '#0000ff');
    });

    it('handles single data point', () => {
        const { container } = render(
            <LineChart
                labels={['Single']}
                data={[10]}
                configs={defaultConfigs}
            />
        );
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        const path = container.querySelector('path');
        // Path should exist even with single point
        expect(path).toBeInTheDocument();
        // Should have a valid path data
        expect(path?.getAttribute('d')).toBeTruthy();
    });
});
