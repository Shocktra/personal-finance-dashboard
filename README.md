# Finansal Kontrol Paneli

Banka hesap özeti CSV dosyanızı yükleyin; toplam gelir, gider, net bakiye, kategori bazlı harcama dağılımı ve son işlemleri tarayıcıda görün. Veriler hiçbir yere gönderilmez, tüm işlem tarayıcıda yapılır.

## CSV formatı

Başlık satırı zorunludur:

```csv
Tarih,Açıklama,Kategori,Tutar
01.10.2023,Maaş Ödemesi,Maaş,25000
02.10.2023,Market Alışverişi,Market,-1200
```

- Gelir pozitif, gider negatif tutardır.
- Tutarlar `-1200.50` ve Türk formatı `-1.200,50` biçimlerinde yazılabilir.
- Uygulamadaki "Örnek CSV İndir" düğmesi hazır bir örnek verir.

## Geliştirme

```bash
npm install
npm run dev     # geliştirme sunucusu
npm test        # birim testleri (vitest)
npm run lint    # oxlint
npm run build   # üretim derlemesi
```

Teknolojiler: React, Vite, Chart.js, PapaParse.
