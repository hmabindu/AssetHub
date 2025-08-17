import React from "react";

import { Eye, EyeOff, Shield, RefreshCw } from "lucide-react";

interface HeaderProps {
  user: { name: string; email: string } | null;
  isLoading: boolean;
  isBalanceVisible: boolean;
  showActionBtns?: boolean;
  refreshDataFn: () => void;
  toggleBalanceVisibilityFn: () => void;
}
const Header: React.FC<HeaderProps> = ({
  user,
  isLoading,
  isBalanceVisible,
  showActionBtns = false,
  refreshDataFn,
  toggleBalanceVisibilityFn,
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Digital Asset Manager
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {showActionBtns && (
              <button
                onClick={refreshDataFn}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Refresh data"
                disabled={isLoading}
              >
                <RefreshCw
                  className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
                />
              </button>
            )}

            {showActionBtns && (
              <button
                onClick={toggleBalanceVisibilityFn}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label={
                  isBalanceVisible ? "Hide balances" : "Show balances"
                }
              >
                {isBalanceVisible ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">
                  {user?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {user?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
