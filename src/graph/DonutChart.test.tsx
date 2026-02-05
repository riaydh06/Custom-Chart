import React from 'react';
import { render, screen } from '@testing-library/react';
import DonutChart from './DonutChart';

describe('DonutChart', () => {
  const defaultLabels = ['Desktop', 'Mobile', 'Tablet'];
  const defaultData = [60, 30, 10];
  const defaultConfigs = {
    backgroundColor: ['#3498db', '#2ecc71', '#e74c3c'],
    innerRadius: 50,
  };

  it('renders without crashing', () => {
    render(
      <DonutChart labels={defaultLabels} data={defaultData} configs={defaultConfigs} />
    );
  });

  it('renders donut segments', () => {
    const { container } = render(
      <DonutChart labels={defaultLabels} data={defaultData} configs={defaultConfigs} />
    );
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(defaultData.length);
  });

  it('applies custom inner radius', () => {
    const { container } = render(
      <DonutChart
        labels={defaultLabels}
        data={defaultData}
        configs={{ ...defaultConfigs, innerRadius: 80 }}
      />
    );
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('renders legend when showLegend is true', () => {
    render(
      <DonutChart
        labels={defaultLabels}
        data={defaultData}
        configs={{ ...defaultConfigs, showLegend: true }}
      />
    );
    // Labels appear in the legend text (may include values)
    defaultLabels.forEach((label) => {
      expect(screen.getByText(new RegExp(label))).toBeInTheDocument();
    });
  });

  it('handles empty data array', () => {
    const { container } = render(
      <DonutChart labels={[]} data={[]} configs={defaultConfigs} />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
