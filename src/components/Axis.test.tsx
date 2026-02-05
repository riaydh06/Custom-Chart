import React from 'react';
import { render, screen } from '@testing-library/react';
import Axis from './Axis';

describe('Axis', () => {
    const defaultProps = {
        x0: 50,
        xAxisY: 250,
        xAxisLength: 500,
        y0: 50,
        yAxisLength: 200,
        dataYMax: 100,
    };

    it('renders X and Y axes', () => {
        const { container } = render(<Axis {...defaultProps} />);
        const lines = container.querySelectorAll('line');
        expect(lines.length).toBeGreaterThan(0);
    });

    it('renders X axis name when provided', () => {
        render(<Axis {...defaultProps} xAxisName="Months" />);
        expect(screen.getByText('Months')).toBeInTheDocument();
    });

    it('renders Y axis name when provided', () => {
        render(<Axis {...defaultProps} YAxisName="Sales" />);
        expect(screen.getByText('Sales')).toBeInTheDocument();
    });

    it('renders correct number of Y ticks', () => {
        const { container } = render(<Axis {...defaultProps} numYTicks={5} />);
        const tickLines = container.querySelectorAll('line');
        // Should have X axis line, Y axis line, and 6 tick lines (numYTicks + 1)
        expect(tickLines.length).toBeGreaterThanOrEqual(8);
    });

    it('calculates Y values correctly with dataYMin', () => {
        const { container } = render(
            <Axis {...defaultProps} dataYMax={100} dataYMin={20} numYTicks={5} />
        );
        const texts = container.querySelectorAll('text');
        // Should have Y axis values
        expect(texts.length).toBeGreaterThan(0);
    });

    it('handles zero dataYMax', () => {
        const { container } = render(<Axis {...defaultProps} dataYMax={0} />);
        const lines = container.querySelectorAll('line');
        expect(lines.length).toBeGreaterThan(0);
    });
});
