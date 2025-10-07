'use client';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  TooltipOptions,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { executeForGrid } from '@/app/services/frontBack';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
);

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      mode: 'index' as TooltipOptions['mode'],
      intersect: false,
    },
  },
};

interface ChartProps {
  types: Array<'line' | 'bar' | 'doughnut'>;
}

function ChartsComponent({ types }: ChartProps) {
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const barData = {
    labels,
    datasets: [
      {
        label: 'Expenses',
        data: [40, 50, 78, 19, 86, 27, 90],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const doughnutData = {
    labels,
    datasets: [
      {
        label: 'Profit',
        data: [24, 48, 40, 19, 86, 27, 75],
        backgroundColor: [
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(255, 99, 132)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full" style={{ height: '350px' }}>
        <CardHeader>
          <h2>Line Chart</h2>
        </CardHeader>
        <CardBody className="h-full">
          {types.includes('line') && (
            <Line data={lineData} options={baseOptions} />
          )}
        </CardBody>
      </Card>

      <div className="flex w-full flex-row gap-4">
        <Card className="w-1/2 flex-1">
          <CardHeader>
            <h2>Bar Chart</h2>
          </CardHeader>
          <CardBody className="h-full">
            {types.includes('bar') && (
              <Bar data={barData} options={baseOptions} />
            )}
          </CardBody>
        </Card>
        <Card className="w-1/2 flex-1">
          <CardHeader>
            <h2>Bar Chart</h2>
          </CardHeader>
          <CardBody className="h-full">
            {types.includes('bar') && (
              <Bar data={barData} options={baseOptions} />
            )}
          </CardBody>
        </Card>

        <Card className="w-1/2 flex-1">
          <CardHeader>
            <h2>Doughnut Chart</h2>
          </CardHeader>
          <CardBody className="h-full">
            {types.includes('doughnut') && (
              <Doughnut data={doughnutData} options={baseOptions} />
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default ChartsComponent;
