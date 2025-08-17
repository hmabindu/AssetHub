import { Account } from "../types/account";

export const calculateTotalChange = (accounts: Account[]): number => {
  return accounts.reduce((sum, account) => sum + account.change, 0);
};
