import React, { createContext, useReducer } from "react";

export interface Block {
  id: string;
  previousBlockHash: string;
  merkle_root: string;
  bits: number;
  nonce: number;
  size: number;
  timestamp: Date;
  transactions: string[];
  tx_count: number;
  version: number;
  weight: number;
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
  trace: {},
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
    case "TRACE":
      console.log("GOT PAYLOAD", payload);
      return {
        ...state,
        trace: payload,
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
