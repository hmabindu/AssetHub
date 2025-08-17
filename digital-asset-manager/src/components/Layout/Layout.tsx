import React, { useReducer } from "react";
import { AlertCircle } from "lucide-react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ActionTypes } from "../../actions/dashboard";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import {
  dashboardReducer,
  initialState,
} from "../../reducers/dashboardReducer";

interface LayoutProps {
  children?: React.ReactNode;
  showActionBtns?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showActionBtns = false,
}) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header
          user={state.user}
          isBalanceVisible={state.isBalanceVisible}
          isLoading={state.isLoading}
          refreshDataFn={() => dispatch({ type: "REFRESH_DATA" })}
          showActionBtns={showActionBtns}
          toggleBalanceVisibilityFn={() =>
            dispatch({ type: "TOGGLE_BALANCE_VISIBILITY" })
          }
        />

        {/* Error Banner */}
        {state.error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4" role="alert">
            <div className="flex">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-700">{state.error}</p>
                <button
                  onClick={() => dispatch({ type: ActionTypes.CLEAR_ERROR })}
                  className="mt-2 text-sm text-red-600 underline hover:text-red-800"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        <main
          className="app-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          role="main"
        >
          {" "}
          {children}
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
