import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './ExpenseChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ transactions }) {
  const expensesByCategory = {};

  transactions.forEach(t => {
    const amount = parseFloat(t.Tutar);
    if (!isNaN(amount) && amount < 0) {
      const cat = t.Kategori || 'Diğer';
      expensesByCategory[cat] = (expensesByCategory[cat] || 0) + Math.abs(amount);
    }
  });

  const categories = Object.keys(expensesByCategory);
  
  if (categories.length === 0) {
    return (
      <div className="glass-panel chart-panel animate-in" style={{ animationDelay: '0.4s' }}>
        <h3 className="panel-title">Harcama Dağılımı</h3>
        <div className="empty-chart">Gider verisi bulunamadı.</div>
      </div>
    );
  }

  const data = {
    labels: categories,
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: 'rgba(15, 23, 42, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#f8fafc',
          font: { family: "'Inter', sans-serif" }
        }
      }
    },
    cutout: '75%',
  };

  return (
    <div className="glass-panel chart-panel animate-in" style={{ animationDelay: '0.4s' }}>
      <h3 className="panel-title">Harcama Dağılımı</h3>
      <div className="chart-wrapper">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
