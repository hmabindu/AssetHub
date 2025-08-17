import {
  Wallet,
  Building2,
  TrendingUp,
  Smartphone,
  CreditCard,
} from "lucide-react";
import { Account } from "../types/account";

// get account icon
export const getAccountIcon = (type: Account["type"]) => {
  const icons = {
    checking: Wallet,
    savings: Building2,
    investment: TrendingUp,
    crypto: Smartphone,
    credit: CreditCard,
  };
  return icons[type];
};
