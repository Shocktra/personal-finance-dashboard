import { useState } from 'react';
import CsvUploader from './components/CsvUploader';
import SummaryCards from './components/SummaryCards';
import ExpenseChart from './components/ExpenseChart';
import TransactionList from './components/TransactionList';
import { PieChart, Download } from 'lucide-react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  const handleDataParsed = (data) => {
    // Filter out empty rows
    const validData = data.filter(row => row.Tarih && row.Tutar);
    setTransactions(validData);
  };

  const handleDownloadSample = () => {
    const csvContent = "Tarih,Açıklama,Kategori,Tutar\n01.10.2023,Maaş Ödemesi,Maaş,25000\n02.10.2023,Market Alışverişi,Market,-1200\n05.10.2023,Elektrik Faturası,Fatura,-450\n10.10.2023,Netflix Aboneliği,Eğlence,-150\n15.10.2023,Restoran,Yemek,-800\n20.10.2023,Freelance Geliri,Ek Gelir,3000\n22.10.2023,Su Faturası,Fatura,-120\n25.10.2023,Spor Salonu,Sağlık,-400";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "ornek_ekstre.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      <header className="app-header animate-in">
        <div className="logo-container">
          <PieChart size={40} className="header-logo" />
        </div>
        <h1>Finansal Kontrol Paneli</h1>
        <p>Hesap özetinizi yükleyin, harcamalarınızı keşfedin.</p>
        
        {transactions.length === 0 && (
          <button onClick={handleDownloadSample} className="btn-sample animate-in" style={{ animationDelay: '0.2s' }}>
            <Download size={18} />
            Örnek CSV İndir
          </button>
        )}
      </header>

      <main className="app-main">
        {transactions.length === 0 ? (
          <CsvUploader onDataParsed={handleDataParsed} />
        ) : (
          <div className="dashboard-content">
            <SummaryCards transactions={transactions} />
            
            <div className="dashboard-grid">
              <div className="chart-section">
                <ExpenseChart transactions={transactions} />
              </div>
              <div className="list-section">
                <TransactionList transactions={transactions} />
              </div>
            </div>

            <button onClick={() => setTransactions([])} className="btn-reset">
              Yeni Dosya Yükle
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
