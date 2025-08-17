import { TrendingUp, TrendingDown } from "lucide-react";
import { memo } from "react";
import { getAccountIcon } from "../../utils/accountIcon";
import { formatCurrency, formatPercentage } from "../../utils/formatters";
import { Account } from "../../types/account";

interface AccountCardProps {
  account: Account;
  isBalanceVisible: boolean;
  onClick?: (accountId: string) => void;
}

export const AccountCard = memo<AccountCardProps>(
  ({ account, isBalanceVisible, onClick }) => {
    const IconComponent = getAccountIcon(account.type);

    // const handleClick = useCallback(() => {
    //   onClick?.(account.id);
    // }, [onClick, account.id]);

    const changeColor = account.change >= 0 ? "text-green-600" : "text-red-600";
    const TrendIcon = account.change >= 0 ? TrendingUp : TrendingDown;

    return (
      <article
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-default"
        // onClick={handleClick}
        role="button"
        tabIndex={0}
        // onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        aria-label={`${account.name} account with balance ${isBalanceVisible ? formatCurrency(account.balance) : "hidden"}`}
      >
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className="p-2 bg-blue-50 rounded-lg text-blue-600"
              aria-hidden="true"
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{account.name}</h3>
              <p className="text-sm text-gray-500">{account.institution}</p>
            </div>
          </div>
          {/* <ChevronRight className="w-5 h-5 text-gray-400" aria-hidden="true" /> */}
        </header>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              {isBalanceVisible
                ? formatCurrency(account.balance, account.currency)
                : "••••••"}
            </span>
            <div
              className={`flex items-center space-x-1 text-sm ${changeColor}`}
            >
              <TrendIcon className="w-4 h-4" aria-hidden="true" />
              <span>{formatPercentage(account.changePercent)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">Updated {account.lastUpdated}</p>
        </div>
      </article>
    );
  },
);
