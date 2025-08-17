import React, { memo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency, formatPercentage } from "../../utils/formatters";
import { Asset } from "../../types/asset";

interface AssetRowProps {
  asset: Asset;
  isBalanceVisible?: boolean;
  onClick?: (assetId: string) => void;
}

export const AssetRow = memo<AssetRowProps>(
  ({ asset, isBalanceVisible = false, onClick }) => {
    // const handleClick = useCallback(() => {
    //   onClick?.(asset.id);
    // }, [onClick, asset.id]);

    const changeColor = asset.change >= 0 ? "text-green-600" : "text-red-600";
    const TrendIcon = asset.change >= 0 ? TrendingUp : TrendingDown;

    return (
      <div
        className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
        // onClick={handleClick}
        role="button"
        tabIndex={0}
        // onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        aria-label={`${asset.name} asset worth ${isBalanceVisible ? formatCurrency(asset.value) : "hidden"}`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm" aria-hidden="true">
              {asset.symbol.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{asset.symbol}</p>
            <p className="text-sm text-gray-500">{asset.name}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-semibold text-gray-900">
            {isBalanceVisible
              ? formatCurrency(asset.value, asset.currency)
              : "••••••"}
          </p>
          <div className={`flex items-center space-x-1 text-sm ${changeColor}`}>
            <TrendIcon className="w-3 h-3" aria-hidden="true" />
            <span>{formatPercentage(asset.changePercent)}</span>
          </div>
          <p className="text-sm text-gray-500">Type: {asset.type}</p>
        </div>
      </div>
    );
  },
);
