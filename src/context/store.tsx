import React, { createContext, useReducer } from "react";
import { ReducerAction } from "./reducerUtils";

export interface Block {
  id: string;
  previousblockhash: string;
  merkle_root: string;
  bits: number;
  nonce: number;
  size: number;
  timestamp: Date;
  transactions: Tx[];
  tx_count: number;
  version: number;
  weight: number;
}

export interface Tx {
  txid: string;
  version: number;
  locktime: number;
  size: number;
  weight: number;
  fee: number;
  input: Input[];
  output: Output[];
  // status:   []Status;
}

export interface Input {
  txid: string;
  vout: number;
  is_coinbase: boolean;
  scriptsig: string;
  scriptsig_asm: string;
  inner_redeemscript_asm: string;
  inner_witnessscript_asm: string[];
  sequence: number;
  witness: [];
  prevout: number;
}

export interface Output {
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address: string;
  value: number;
  index: number;
}

export interface Trace {
  txid: string;
  next: Next[];
}

export interface Next {
  txid: string;
  receiver: string;
  vout: number;
  amount: number;
  weight?: number;
}

interface State {
  block: Block | null;
  transaction: any;
  address: any;
  trace: any;
  cluster: any;
}

const initialState: State = {
  block: null,
  transaction: null,
  address: null,
  trace: {},
  cluster: {},
};
export const Store = createContext<any>(initialState);

function reducer(state: State = initialState, { type, payload }: ReducerAction): State {
  console.log("@@ Store context action", { type, payload });
  switch (type) {
    case "PAYLOAD":
      return {
        ...state,
      };
    case "BLOCK":
      return {
        ...state,
        block: payload,
      };
    case "RESET_BLOCK":
      return {
        ...state,
        block: null,
      };
    case "TX":
      return {
        ...state,
        transaction: payload,
      };
    case "RESET_TX":
      return {
        ...state,
        transaction: null,
      };
    case "TRACE":
      return {
        ...state,
        trace: payload,
      };
    case "RESET_TRACE":
      return {
        ...state,
        trace: null,
      };
    default:
      return state;
  }
}

export function StoreProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value as any}>{props.children}</Store.Provider>;
}
