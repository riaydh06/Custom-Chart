# Custom Chart

A lightweight, customizable React chart library with multiple chart types built with SVG.

## Installation

```bash
npm install custom-chart
# or
yarn add custom-chart
```

## Features

- 🎨 **Multiple Chart Types**: Bar, Line, Area, Pie, Donut, Polar, and more
- 🎯 **Highly Customizable**: Extensive configuration options for colors, labels, legends, and animations
- 📦 **Lightweight**: No heavy dependencies, built with pure React and SVG
- 🎭 **TypeScript Support**: Full TypeScript definitions included
- ⚡ **Performance Optimized**: Efficient rendering with memoization

## Available Charts

- **BarChart** - Vertical bar charts
- **LineChart** - Line charts with customizable styling
- **AreaChart** - Area charts with fill colors
- **PieChart** - Pie charts with legend support
- **DonutChart** - Donut charts with customizable inner radius
- **VariableRadiusPieChart** - Pie charts with variable segment sizes
- **StackedColumnChart** - Stacked column charts
- **GroupedColumnChart** - Grouped column charts
- **LineRaceChart** - Animated racing line charts
- **ColumnRangeChart** - Column range charts
- **PolarChart** - Polar/Radar charts
- **PieDrilldownChart** - Pie charts with drilldown functionality
- **RadialBarChart** - Radial bar charts
- **DualAxesChart** - Charts with dual Y-axes
- **SynchronizedCharts** - Multiple synchronized charts
- **ColumnWithNegativeChart** - Column charts supporting negative values
- **MultiAreaChart** - Multiple overlapping or stacked area charts
- **MultiLineChart** - Multiple line charts
- **AnimatedLineChart** - Line charts with custom entrance animations

## Quick Start

```tsx
import React from 'react';
import { BarChart } from 'custom-chart';

function App() {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const data = [10, 20, 30, 40, 50];
  
  const configs = {
    xAxisName: 'Month',
    YAxisName: 'Sales',
    backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'],
    borderColor: ['#2980b9', '#27ae60', '#c0392b', '#e67e22', '#8e44ad'],
    borderWidth: 2,
    numYTicks: 5
  };

  return (
    <BarChart
      labels={labels}
      data={data}
      configs={configs}
    />
  );
}

export default App;
```

## Examples

### Line Chart

```tsx
import { LineChart } from 'custom-chart';

<LineChart
  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri']}
  data={[20, 25, 30, 22, 28]}
  configs={{
    xAxisName: 'Day',
    YAxisName: 'Temperature (°C)',
    strokeColor: '#3498db',
    strokeWidth: 2,
    showPoints: true
  }}
/>
```

### Pie Chart

```tsx
import { PieChart } from 'custom-chart';

<PieChart
  labels={['Red', 'Blue', 'Green', 'Yellow']}
  data={[30, 25, 20, 25]}
  configs={{
    showLegend: true,
    legendPosition: 'right',
    backgroundColor: ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f']
  }}
/>
```

### Donut Chart

```tsx
import { DonutChart } from 'custom-chart';

<DonutChart
  labels={['Desktop', 'Mobile', 'Tablet']}
  data={[60, 30, 10]}
  configs={{
    innerRadius: 50,
    showLegend: true,
    backgroundColor: ['#3498db', '#2ecc71', '#e74c3c']
  }}
/>
```

### Animated Line Chart

```tsx
import { AnimatedLineChart } from 'custom-chart';

<AnimatedLineChart
  labels={['Q1', 'Q2', 'Q3', 'Q4']}
  series={[
    {
      data: [10, 20, 15, 25],
      label: 'Sales',
      strokeColor: '#3498db',
      showPoints: true
    },
    {
      data: [5, 15, 10, 20],
      label: 'Revenue',
      strokeColor: '#2ecc71',
      showPoints: true
    }
  ]}
  configs={{
    animationType: 'draw',
    animationDuration: 1500,
    enableAnimation: true,
    showLegend: true
  }}
/>
```

## Configuration Options

Each chart type has its own configuration options. Common options include:

- `xAxisName` - Label for X-axis
- `YAxisName` - Label for Y-axis
- `numYTicks` - Number of Y-axis ticks
- `showLegend` - Show/hide legend
- `legendPosition` - Position of legend ('top', 'bottom', 'left', 'right')
- `backgroundColor` - Array of background colors
- `borderColor` - Array of border colors
- `borderWidth` - Border width

See individual chart documentation for specific options.

## TypeScript

Full TypeScript support is included. All components are typed and exported with their interfaces.

```tsx
import { BarChart, LineChart } from 'custom-chart';
```

## Development

```bash
# Install dependencies
npm install

# Run Storybook for development
npm run storybook

# Build library
npm run build:lib

# Build Storybook
npm run build-storybook

# Build Storybook for GitHub Pages
npm run build-storybook:gh-pages
```

## GitHub Pages Deployment

This project includes automatic deployment of Storybook to GitHub Pages via GitHub Actions.

### Setup Instructions:

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: Select "GitHub Actions"

2. **Update repository name** (if different):
   - If your repository name is not "Custom-Chart", update the base path in:
     - `package.json` → `build-storybook:gh-pages` script
     - Replace `/Custom-Chart` with `/{your-repo-name}`

3. **Automatic Deployment**:
   - Push to `main` or `master` branch
   - GitHub Actions will automatically build and deploy Storybook
   - Your Storybook will be available at: `https://{username}.github.io/{repo-name}/`

4. **Manual Deployment**:
   ```bash
   npm run build-storybook:gh-pages
   # Then push the storybook-static folder to gh-pages branch
   ```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
