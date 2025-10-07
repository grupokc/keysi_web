import { Metadata } from 'next';
import ChartsComponent from './components/charts';

export const metadata: Metadata = {
  title: 'Maxumus :: Dashboard',
};


export default function DashboardPage() {
  const chartTypes: ('line' | 'bar' | 'doughnut')[] = ['doughnut', 'line', 'bar']; 

  return (
    <main>
      <h1>Dashboard</h1>
      <ChartsComponent types={chartTypes} />
    </main>
  );
}
