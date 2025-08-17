import { ActionTypes, dashboardAction } from "../actions/dashboard";
import { mockAccounts } from "../mock/mockAccounts";
import { mockAssets } from "../mock/mockAssets";
import { mockUser } from "../mock/mockUser";
import { AppState } from "../types/dashboardState";

const initialState: AppState = {
  accounts: mockAccounts,
  assets: mockAssets,
  totalBalance: 196671.55,
  totalChange: -159.05,
  isBalanceVisible: true,
  selectedTimeframe: "1M",
  isLoading: false,
  user: mockUser,
  error: null,
  lastRefresh: new Date(),
};

function dashboardReducer(state: AppState, action: dashboardAction): AppState {
  switch (action.type) {
    case ActionTypes.TOGGLE_BALANCE_VISIBILITY:
      return { ...state, isBalanceVisible: !state.isBalanceVisible };

    case ActionTypes.SET_TIMEFRAME:
      return { ...state, selectedTimeframe: action.payload };

    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case ActionTypes.REFRESH_DATA:
      return { ...state, isLoading: true, error: null };

    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };

    case ActionTypes.UPDATE_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
        totalBalance: action.payload.reduce((sum, acc) => sum + acc.balance, 0),
        lastRefresh: new Date(),
        isLoading: false,
        error: null,
      };

    case ActionTypes.UPDATE_ASSETS:
      return {
        ...state,
        assets: action.payload,
        lastRefresh: new Date(),
        isLoading: false,
        error: null,
      };

    case ActionTypes.CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
}

export { initialState, dashboardReducer };
