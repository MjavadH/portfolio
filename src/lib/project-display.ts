const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export const STAR_POINTS = Array.from({ length: 16 }, (_, i) => {
  const a = (i * Math.PI) / 8;
  const r = i % 2 ? 4.6 : 10;
  return `${(12 + r * Math.sin(a)).toFixed(2)},${(12 - r * Math.cos(a)).toFixed(2)}`;
}).join(" ");

export const localizeDigits = (value: string, fa: boolean) =>
  fa ? value.replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]) : value;

export const formatPosition = (position: number, total: number, fa: boolean) => {
  const pad = (value: number) => localizeDigits(String(value).padStart(2, "0"), fa);
  return `${pad(position)} / ${pad(total)}`;
};
