/**
 * Banka ekstrelerindeki tutarları sayıya çevirir.
 * Hem "-1200.50" (nokta ondalık) hem de "-1.200,50" (Türk formatı) desteklenir.
 * Çevrilemeyen değerler için NaN döner.
 */
export function parseAmount(value) {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return NaN;

  let s = value.replace(/[^\d.,+-]/g, '');
  if (!s) return NaN;

  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');

  if (lastComma !== -1 && lastDot !== -1) {
    // İkisi de varsa sonda olan ondalık ayırıcıdır, diğeri binlik ayırıcıdır.
    s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  } else if (lastComma !== -1) {
    // Tek virgül: ondalık ayırıcı ("12,5"); birden fazlaysa binlik ayırıcı ("1,200,000").
    s = s.split(',').length > 2 ? s.replace(/,/g, '') : s.replace(',', '.');
  } else if (lastDot !== -1 && s.split('.').length > 2) {
    // Birden fazla nokta: binlik ayırıcı ("1.200.000").
    s = s.replace(/\./g, '');
  }

  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}
