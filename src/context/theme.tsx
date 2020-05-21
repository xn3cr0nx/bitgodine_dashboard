import React, { createContext, useReducer } from "react";
import { ReducerAction } from "./reducerUtils";

export enum Themes {
  PRIMARY = "bg-gradient-primary",
  SUCCESS = "bg-gradient-success",
  INFO = "bg-gradient-info",
  WARNING = "bg-gradient-warning",
  DANGER = "bg-gradient-danger",
  INDIGO = "bg-gradient-indigo",
  PURPLE = "bg-gradient-purple",
  PINK = "bg-gradient-pink",
  YELLOW = "bg-gradient-yellow",
  CYAN = "bg-gradient-cyan",
  DARKER = "bg-gradient-darker",
  DARK = "bg-gradient-dark",
  DEFAULT = "bg-gradient-default",
  GRAY = "bg-gradient-gray",
  LIGHT = "bg-gradient-light",
  LIGHTER = "bg-gradient-lighter",
  // GRAYDARK = "bg-gradient-gray-dark",
  SECONDARY = "bg-gradient-secondary",
  WHITE = "bg-gradient-white",
}
// export enum Themes {
//   PRIMARY = "linear-gradient(35deg, #5e72e4 0, #825ee4 100%) !important",
//   SECONDARY = "linear-gradient(35deg, #f4f5f7 0, #f4f4f7 100%) !important",
//   SUCCESS = "linear-gradient(35deg, #2dce89 0, #2dcecc 100%) !important",
//   INFO = "linear-gradient(35deg, #11cdef 0, #1171ef 100%) !important",
//   WARNING = "linear-gradient(35deg, #fb6340 0, #fbb140 100%) !important",
//   DANGER = "linear-gradient(35deg, #f5365c 0, #f56036 100%) !important",
//   LIGHT = "linear-gradient(35deg, #adb5bd 0, #adaebd 100%) !important",
//   LIGHTER = "linear-gradient(35deg, #e9ecef 0, #e9eaef 100%) !important",
//   DARK = "linear-gradient(35deg, #212529 0, #212229 100%) !important",
//   DARKER = "linear-gradient(35deg, black 0, black 100%) !important",
//   DEFAULT = "linear-gradient(35deg, #172b4d 0, #1a174d 100%) !important",
//   WHITE = "linear-gradient(35deg, #fff 0, white 100%) !important",
//   INDIGO = "linear-gradient(35deg, #5603ad 0, #9d03ad 100%) !important",
//   PURPLE = "linear-gradient(35deg, #8965e0 0, #bc65e0 100%) !important",
//   PINK = "linear-gradient(35deg, #f3a4b5 0, #f3b4a4 100%) !important",
//   YELLOW = "linear-gradient(35deg, #ffd600 0, #beff00 100%) !important",
//   GREEN = "linear-gradient(35deg, #2dce89 0, #2dcecc 100%) !important",
//   CYAN = "linear-gradient(35deg, #2bffc6 0, #2be0ff 100%) !important",
//   GRAY = "linear-gradient(35deg, #8898aa 0, #888aaa 100%) !important",
//   GRAYDARK = "linear-gradient(35deg, #32325d 0, #44325d 100%) !important",
// }

type ThemeState = Themes;

const storedTheme = localStorage.getItem("theme");
const initialTheme: ThemeState = (storedTheme as Themes) ?? Themes.DEFAULT;

export const Theme = createContext<any>(initialTheme);

function themeReducer(state: ThemeState = initialTheme, { type, payload }: ReducerAction): ThemeState {
  switch (type) {
    case "THEME":
      console.log("GOT THEME", payload);
      return payload;
    default:
      return state;
  }
}

export function ThemeProvider(props: any) {
  const [theme, dispatch] = useReducer(themeReducer, initialTheme);
  const value = { theme, dispatch };

  return <Theme.Provider value={value as any}>{props.children}</Theme.Provider>;
}
