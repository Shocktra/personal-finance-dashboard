import { useState } from 'react';
import Papa from 'papaparse';
import { UploadCloud } from 'lucide-react';
import './CsvUploader.css';

export default function CsvUploader({ onDataParsed }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = (file) => {
    setError(null);
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError("Lütfen sadece CSV dosyası yükleyin.");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        onDataParsed(results.data);
      },
      error: (err) => {
        setError("CSV okunurken hata oluştu: " + err.message);
      }
    });
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="glass-panel animate-in uploader-container">
      <div 
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        <UploadCloud size={48} className="upload-icon" />
        <h3>CSV Ekstrenizi Yükleyin</h3>
        <p>Sürükleyip bırakın veya dosya seçmek için tıklayın</p>
        <input 
          type="file" 
          accept=".csv"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
          className="file-input"
        />
      </div>
      {error && <div className="error-text">{error}</div>}
    </div>
  );
}
