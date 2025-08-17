export interface Account {
  readonly id: string;
  readonly name: string;
  readonly type: "checking" | "savings" | "investment" | "crypto" | "credit";
  readonly balance: number;
  readonly change: number;
  readonly changePercent: number;
  readonly institution: string;
  readonly lastUpdated: string;
  readonly currency?: string;
}
