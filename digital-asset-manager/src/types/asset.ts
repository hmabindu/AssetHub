export interface Asset {
  readonly id: string;
  readonly symbol: string;
  readonly name: string;
  readonly value: number;
  readonly shares: number;
  readonly change: number;
  readonly changePercent: number;
  readonly type: "stock" | "crypto" | "etf";
  readonly currency: string;
  readonly marketCap: number;
  readonly sector: string | null;
  readonly exchange: string;
  readonly lastUpdated: string; // ISO timestamp
  readonly dividendYield: number;
  readonly peRatio: number | null;
  readonly volume: number;
  readonly "52WeekHigh": number;
  readonly "52WeekLow": number;
  readonly tags: readonly string[];
}
