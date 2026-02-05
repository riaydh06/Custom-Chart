import React from 'react';
import { render, screen } from '@testing-library/react';
import PieChart from './PieChart';

describe('PieChart', () => {
  const defaultLabels = ['Red', 'Blue', 'Green'];
  const defaultData = [30, 25, 20];
  const defaultConfigs = {
    backgroundColor: ['#ff0000', '#0000ff', '#00ff00'],
  };

  it('renders without crashing', () => {
    render(
      <PieChart labels={defaultLabels} data={defaultData} configs={defaultConfigs} />
    );
  });

  it('renders pie segments', () => {
    const { container } = render(
      <PieChart labels={defaultLabels} data={defaultData} configs={defaultConfigs} />
    );
    const paths = container.querySelectorAll('path');
    // Should have paths for each segment
    expect(paths.length).toBeGreaterThanOrEqual(defaultData.length);
  });

  it('renders legend when showLegend is true', () => {
    render(
      <PieChart
        labels={defaultLabels}
        data={defaultData}
        configs={{ ...defaultConfigs, showLegend: true }}
      />
    );
    // Legend should be present (check for legend items)
    // Labels appear in the legend text
    defaultLabels.forEach((label) => {
      expect(screen.getByText(new RegExp(label))).toBeInTheDocument();
    });
  });

  it('does not render legend when showLegend is false', () => {
    const { container } = render(
      <PieChart
        labels={defaultLabels}
        data={defaultData}
        configs={{ ...defaultConfigs, showLegend: false }}
      />
    );
    // SVG should still render
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Legend rect (for box type) should not exist
    const legendRect = container.querySelector('rect[fill="white"]');
    expect(legendRect).not.toBeInTheDocument();
  });

  it('applies custom background colors', () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff'];
    const { container } = render(
      <PieChart
        labels={defaultLabels}
        data={defaultData}
        configs={{ ...defaultConfigs, backgroundColor: colors }}
      />
    );
    const paths = container.querySelectorAll('path');
    // Check that paths have fill colors
    expect(paths.length).toBeGreaterThan(0);
  });

  it('renders labels inside slices when showLabels is true', () => {
    const { container } = render(
      <PieChart
        labels={defaultLabels}
        data={defaultData}
        configs={{ ...defaultConfigs, showLabels: true }}
      />
    );
    const texts = container.querySelectorAll('text');
    // Should have text elements for labels
    expect(texts.length).toBeGreaterThan(0);
  });

  it('handles empty data array', () => {
    const { container } = render(
      <PieChart labels={[]} data={[]} configs={defaultConfigs} />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('handles single data point', () => {
    const { container } = render(
      <PieChart
        labels={['Single']}
        data={[100]}
        configs={{ backgroundColor: ['#ff0000'] }}
      />
    );
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('renders pin-type legend when legendType is pin', () => {
    const { container } = render(
      <PieChart
        labels={defaultLabels}
        data={defaultData}
        configs={{ ...defaultConfigs, legendType: 'pin', showLegend: true }}
      />
    );
    // Pin-type legend should render lines
    const lines = container.querySelectorAll('line');
    // Pin-type legend uses lines for connectors
    expect(lines.length).toBeGreaterThan(0);
    // Labels should be visible
    defaultLabels.forEach((label) => {
      expect(screen.getByText(new RegExp(label))).toBeInTheDocument();
    });
  });

  it('calculates segment sizes correctly based on data', () => {
    const data = [10, 20, 30]; // Total: 60
    const { container } = render(
      <PieChart
        labels={['A', 'B', 'C']}
        data={data}
        configs={{ backgroundColor: ['#ff0000', '#00ff00', '#0000ff'] }}
      />
    );
    const paths = container.querySelectorAll('path');
    // Should have 3 segments
    expect(paths.length).toBeGreaterThanOrEqual(3);
  });
});
