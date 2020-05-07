import React, { createContext, useReducer } from "react";

interface State {
  block: any;
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
  block: {},
  transaction: {},
  address: {},
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
