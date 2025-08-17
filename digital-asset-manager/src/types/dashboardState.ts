import { Account } from "./account";
import { Asset } from "./asset";
import { User } from "./user";

export interface AppState {
  readonly accounts: Account[];
  readonly assets: Asset[];
  readonly totalBalance: number;
  readonly totalChange: number;
  readonly isBalanceVisible: boolean;
  readonly selectedTimeframe: string;
  readonly isLoading: boolean;
  readonly user: User | null;
  readonly error: string | null;
  readonly lastRefresh: Date | null;
}
