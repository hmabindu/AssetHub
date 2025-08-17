import { Account } from "../types/account";
import { Asset } from "../types/asset";

export const ActionTypes = {
  TOGGLE_BALANCE_VISIBILITY: "TOGGLE_BALANCE_VISIBILITY",
  SET_TIMEFRAME: "SET_TIMEFRAME",
  SET_LOADING: "SET_LOADING",
  REFRESH_DATA: "REFRESH_DATA",
  SET_ERROR: "SET_ERROR",
  UPDATE_ACCOUNTS: "UPDATE_ACCOUNTS",
  UPDATE_ASSETS: "UPDATE_ASSETS",
  CLEAR_ERROR: "CLEAR_ERROR",
} as const;

export type dashboardAction =
  | { type: typeof ActionTypes.TOGGLE_BALANCE_VISIBILITY }
  | { type: typeof ActionTypes.SET_TIMEFRAME; payload: string }
  | { type: typeof ActionTypes.SET_LOADING; payload: boolean }
  | { type: typeof ActionTypes.REFRESH_DATA }
  | { type: typeof ActionTypes.SET_ERROR; payload: string }
  | { type: typeof ActionTypes.UPDATE_ACCOUNTS; payload: Account[] }
  | { type: typeof ActionTypes.UPDATE_ASSETS; payload: Asset[] }
  | { type: typeof ActionTypes.CLEAR_ERROR };
