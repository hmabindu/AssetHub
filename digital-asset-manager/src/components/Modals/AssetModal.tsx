import {
  Activity,
  BarChart3,
  Calendar,
  FolderOpen,
  PieChart,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { Asset } from "../../types/asset";
import {
  formatCurrency,
  formatPercentage,
  formatLargeNumber,
  formatVolume,
} from "../../utils/formatters";

interface AssetModalProps {
  isModalOpen: boolean;
  selectedAsset: Asset | null;
  closeAssetModal: () => void;
}

const AssetModal: React.FC<AssetModalProps> = ({
  isModalOpen,
  selectedAsset,
  closeAssetModal,
}) => {
  if (!isModalOpen || !selectedAsset) return null;
  const getAssetIcon = (type: string) => {
    switch (type) {
      case "stock":
        return TrendingUp;
      case "crypto":
        return Activity;
      case "etf":
        return PieChart;
      default:
        return BarChart3;
    }
  };

  const AssetIcon = getAssetIcon(selectedAsset.type);
  const isPositive = selectedAsset.changePercent >= 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div
              className={`rounded-lg p-2 ${
                selectedAsset.type === "stock"
                  ? "bg-blue-100"
                  : selectedAsset.type === "crypto"
                    ? "bg-orange-100"
                    : "bg-green-100"
              }`}
            >
              <AssetIcon
                className={`${
                  selectedAsset.type === "stock"
                    ? "text-blue-600"
                    : selectedAsset.type === "crypto"
                      ? "text-orange-600"
                      : "text-green-600"
                }`}
                size={24}
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {selectedAsset.symbol} - {selectedAsset.name}
              </h2>
              <p className="text-sm text-gray-600">{selectedAsset.exchange}</p>
            </div>
          </div>
          <button
            onClick={closeAssetModal}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Asset Chart/Visual */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <AssetIcon
                  className={`mx-auto mb-4 ${
                    selectedAsset.type === "stock"
                      ? "text-blue-600"
                      : selectedAsset.type === "crypto"
                        ? "text-orange-600"
                        : "text-green-600"
                  }`}
                  size={64}
                />
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {selectedAsset.symbol}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {formatCurrency(selectedAsset.value / selectedAsset.shares)}
                </div>
                <div
                  className={`text-lg font-medium flex items-center justify-center space-x-2 ${isPositive ? "text-green-600" : "text-red-600"}`}
                >
                  {isPositive ? (
                    <TrendingUp size={20} />
                  ) : (
                    <TrendingDown size={20} />
                  )}
                  <span>
                    {formatCurrency(selectedAsset.change)} (
                    {formatPercentage(selectedAsset.changePercent)})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Asset Information */}
          <div className="space-y-6">
            {/* Position Information */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Position Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Value</p>
                  <p className="font-bold text-gray-900 text-lg">
                    {formatCurrency(selectedAsset.value)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Shares/Units</p>
                  <p className="font-medium text-gray-900">
                    {selectedAsset.shares}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Price per Share</p>
                  <p className="font-medium text-gray-900">
                    {formatCurrency(selectedAsset.value / selectedAsset.shares)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Daily Change</p>
                  <p
                    className={`font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}
                  >
                    {formatCurrency(selectedAsset.change)}
                  </p>
                </div>
              </div>
            </div>

            {/* Market Data */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Market Data
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Market Cap</span>
                  <span className="font-medium text-gray-900">
                    {formatLargeNumber(selectedAsset.marketCap)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Volume</span>
                  <span className="font-medium text-gray-900">
                    {formatVolume(selectedAsset.volume)}
                  </span>
                </div>
                {selectedAsset.peRatio && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">P/E Ratio</span>
                    <span className="font-medium text-gray-900">
                      {selectedAsset.peRatio}
                    </span>
                  </div>
                )}
                {selectedAsset.dividendYield > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Dividend Yield</span>
                    <span className="font-medium text-gray-900">
                      {(selectedAsset.dividendYield * 100).toFixed(2)}%
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">52W High</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(selectedAsset["52WeekHigh"])}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">52W Low</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(selectedAsset["52WeekLow"])}
                  </span>
                </div>
              </div>
            </div>

            {/* Asset Details */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Asset Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="text-gray-400" size={16} />
                  <span className="text-gray-600">Asset Type:</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {selectedAsset.type}
                  </span>
                </div>
                {selectedAsset.sector && (
                  <div className="flex items-center space-x-2">
                    <FolderOpen className="text-gray-400" size={16} />
                    <span className="text-gray-600">Sector:</span>
                    <span className="font-medium text-gray-900">
                      {selectedAsset.sector}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Activity className="text-gray-400" size={16} />
                  <span className="text-gray-600">Exchange:</span>
                  <span className="font-medium text-gray-900">
                    {selectedAsset.exchange}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-gray-400" size={16} />
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(selectedAsset.lastUpdated).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedAsset.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedAsset.type === "stock"
                        ? "bg-blue-100 text-blue-800"
                        : selectedAsset.type === "crypto"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance Indicator */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Performance
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current Performance:</span>
                <div
                  className={`flex items-center space-x-2 ${isPositive ? "text-green-600" : "text-red-600"}`}
                >
                  {isPositive ? (
                    <TrendingUp size={18} />
                  ) : (
                    <TrendingDown size={18} />
                  )}
                  <span className="font-bold text-lg">
                    {formatPercentage(selectedAsset.changePercent)}
                  </span>
                </div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${isPositive ? "bg-green-500" : "bg-red-500"}`}
                  style={{
                    width: `${Math.min(Math.abs(selectedAsset.changePercent) * 10, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AssetModal;
