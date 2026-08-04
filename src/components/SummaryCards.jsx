import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import './SummaryCards.css';

export default function SummaryCards({ transactions }) {
  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    const amount = parseFloat(t.Tutar);
    if (!isNaN(amount)) {
      if (amount > 0) income += amount;
      else expense += Math.abs(amount);
    }
  });

  const balance = income - expense;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(val);
  };

  return (
    <div className="summary-grid">
      <div className="glass-panel summary-card animate-in" style={{ animationDelay: '0.1s' }}>
        <div className="summary-icon bg-emerald">
          <ArrowUpRight size={24} />
        </div>
        <div>
          <p className="summary-label">Toplam Gelir</p>
          <h3 className="summary-value text-income">{formatCurrency(income)}</h3>
        </div>
      </div>

      <div className="glass-panel summary-card animate-in" style={{ animationDelay: '0.2s' }}>
        <div className="summary-icon bg-red">
          <ArrowDownRight size={24} />
        </div>
        <div>
          <p className="summary-label">Toplam Gider</p>
          <h3 className="summary-value text-expense">{formatCurrency(expense)}</h3>
        </div>
      </div>

      <div className="glass-panel summary-card animate-in" style={{ animationDelay: '0.3s' }}>
        <div className="summary-icon bg-blue">
          <Wallet size={24} />
        </div>
        <div>
          <p className="summary-label">Net Bakiye</p>
          <h3 className={`summary-value ${balance >= 0 ? 'text-income' : 'text-expense'}`}>
            {formatCurrency(balance)}
          </h3>
        </div>
      </div>
    </div>
  );
}
