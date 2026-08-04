import './TransactionList.css';

export default function TransactionList({ transactions }) {
  if (transactions.length === 0) return null;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(val);
  };

  return (
    <div className="glass-panel transaction-panel animate-in" style={{ animationDelay: '0.5s' }}>
      <h3 className="panel-title">Son İşlemler</h3>
      <div className="table-responsive">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Açıklama</th>
              <th>Kategori</th>
              <th className="align-right">Tutar</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 15).map((t, index) => {
              const amount = parseFloat(t.Tutar);
              if (isNaN(amount)) return null;
              
              const isIncome = amount > 0;
              return (
                <tr key={index}>
                  <td className="text-muted">{t.Tarih}</td>
                  <td className="text-strong">{t.Açıklama}</td>
                  <td>
                    <span className="category-badge">{t.Kategori || '-'}</span>
                  </td>
                  <td className={`align-right fw-bold ${isIncome ? 'text-income' : 'text-expense'}`}>
                    {isIncome ? '+' : ''}{formatCurrency(amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
