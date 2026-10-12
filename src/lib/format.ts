const nf = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 2 });
const nf1 = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const nf2 = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});


export const toBn = (n: number) => nf.format(n);


export const pctBn = (n: number) => nf1.format(Math.abs(n));


export const avgBn = (n: number) =>
  Number.isInteger(n) ? nf.format(n) : nf2.format(n);

export const UNIT_LABEL: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export const UNIT_SHORT: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function banglaDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}