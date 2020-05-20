import React, { createContext, useReducer } from "react";

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

interface State {
  block: Block | null;
  transaction: any;
  address: any;
  trace: any;
  cluster: any;
}

export interface ReducerAction {
  type: string;
  payload: any;
}

const initialState: State = {
  block: null,
  transaction: null,
  address: null,
  trace: null,
  cluster: {},
};
export const Store = createContext<any>(initialState);

function reducer(state: State = initialState, { type, payload }: ReducerAction): State {
  switch (type) {
    case "PAYLOAD":
      console.log("GOT PAYLOAD", payload);
      return {
        ...state,
      };
    case "BLOCK":
      console.log("GOT BLOCK", payload);
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
      console.log("GOT TX", payload);
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
      console.log("GOT TRACE", payload);
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
