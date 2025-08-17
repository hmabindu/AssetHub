import React, {
  useEffect,
  useReducer,
  Suspense,
  useCallback,
  useMemo,
  lazy,
} from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatPercentage } from "../utils/formatters";
import { AccountCard } from "../components/AccountCard/AccountCard";
import { AssetRow } from "../components/AssetRow/AssetRow";
import { ActionTypes } from "../actions/dashboard";
import { REFRESH_INTERVAL } from "../constants/dashboard";
import { useAsyncRefresh } from "../hooks/useAsyncRefresh";
import { mockAccounts } from "../mock/mockAccounts";
import { mockAssets } from "../mock/mockAssets";
import { dashboardReducer, initialState } from "../reducers/dashboardReducer";
import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";
import { TimeframeSelector } from "../components/TimeframeSelector/TimeframeSelector";
import Chart from "../components/Chart/Chart";
import Layout from "../components/Layout/Layout";

const Dashboard: React.FC = () => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const navigate = useNavigate();

  // Memoized values
  const totalChangePercent = useMemo(() => {
    if (state.totalBalance === 0) return 0;
    return (state.totalChange / (state.totalBalance - state.totalChange)) * 100;
  }, [state.totalBalance, state.totalChange]);

  const sortedAssets = useMemo(() => {
    return [...state.assets].sort((a, b) => b.value - a.value);
  }, [state.assets]);

  // Event handlers
  const handleToggleBalance = useCallback(() => {
    dispatch({ type: ActionTypes.TOGGLE_BALANCE_VISIBILITY });
  }, []);

  const handleTimeframeChange = useCallback((timeframe: string) => {
    dispatch({ type: ActionTypes.SET_TIMEFRAME, payload: timeframe });
  }, []);

  const handleAccountClick = useCallback((accountId: string) => {
    console.log("Navigate to account details:", accountId);
  }, []);

  const handleAssetClick = useCallback((assetId: string) => {
    console.log("Navigate to asset details:", assetId);
  }, []);

  // Async operations
  const refreshData = useCallback(async () => {
    dispatch({ type: ActionTypes.REFRESH_DATA });

    try {
      // Simulate API calls
      await new Promise((resolve) => setTimeout(resolve, 2000));

      dispatch({ type: ActionTypes.UPDATE_ACCOUNTS, payload: mockAccounts });
      dispatch({ type: ActionTypes.UPDATE_ASSETS, payload: mockAssets });
    } catch (error) {
      dispatch({
        type: ActionTypes.SET_ERROR,
        payload:
          error instanceof Error ? error.message : "Failed to refresh data",
      });
    }
  }, []);

  const { refresh } = useAsyncRefresh(refreshData);

  // Auto-refresh effect
  useEffect(() => {
    const interval = setInterval(refresh, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [refresh]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "h":
            event.preventDefault();
            handleToggleBalance();
            break;
          case "r":
            event.preventDefault();
            refresh();
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleToggleBalance, refresh]);

  // Render loading state
  if (state.isLoading && state.accounts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  const LazyChart = lazy(
    () =>
      // Simulate loading the Chart component
      new Promise<{ default: React.ComponentType<any> }>((resolve) => {
        setTimeout(() => {
          resolve({ default: Chart });
        }, 100);
      }),
  );

  return (
    <Layout>
      {/* Portfolio Summary */}
      <section className="mb-8" aria-labelledby="portfolio-overview">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2
                id="portfolio-overview"
                className="text-lg font-semibold text-gray-900 mb-1"
              >
                Portfolio Overview
              </h2>
              <p className="text-sm text-gray-500">
                Track all your digital assets in one place
              </p>
            </div>

            <TimeframeSelector
              selectedTimeframe={state.selectedTimeframe}
              onTimeframeChange={handleTimeframeChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Balance</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {state.isBalanceVisible
                      ? formatCurrency(state.totalBalance)
                      : "••••••••"}
                  </p>
                </div>

                <div
                  className={`flex items-center space-x-2 ${
                    state.totalChange >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {state.totalChange >= 0 ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                  <span className="font-semibold">
                    {state.totalChange >= 0 ? "+" : ""}
                    {formatCurrency(Math.abs(state.totalChange))}
                  </span>
                  <span className="text-sm">
                    ({formatPercentage(totalChangePercent)}) today
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Suspense fallback={<LoadingSpinner size="lg" />}>
                <LazyChart />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Accounts */}
        <section className="lg:col-span-2" aria-labelledby="accounts-section">
          {/* <div className="flex items-center justify-between mb-6">
                <h3 id="accounts-section" className="text-xl font-semibold text-gray-900">Accounts</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Account</span>
                </button>
              </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {state.accounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                isBalanceVisible={state.isBalanceVisible}
                onClick={handleAccountClick}
              />
            ))}
          </div>
        </section>

        {/* Assets & Quick Actions */}
        <aside className="space-y-8">
          {/* Top Assets */}
          <section aria-labelledby="top-assets">
            <h3
              id="top-assets"
              className="text-xl font-semibold text-gray-900 mb-6"
            >
              Top Assets
            </h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {sortedAssets.slice(0, 3).map((asset, index) => (
                <div
                  key={asset.id}
                  className={index !== 2 ? "border-b border-gray-100" : ""}
                >
                  <AssetRow
                    asset={asset}
                    isBalanceVisible={state.isBalanceVisible}
                    onClick={handleAssetClick}
                  />
                </div>
              ))}

              <div className="p-4 border-t border-gray-100">
                <button
                  className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  onClick={() => navigate("/assets")}
                >
                  View All Assets
                </button>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </Layout>
  );
};

export default Dashboard;
