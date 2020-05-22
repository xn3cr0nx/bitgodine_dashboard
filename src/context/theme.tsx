import React, { createContext, useReducer } from "react";
import { ReducerAction } from "./reducerUtils";

export enum Background {
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

enum Text {
  WHITE = "text-white",
  PRIMARY = "text-primary",
  SECONDARY = "text-secondary",
  SUCCESS = "text-success",
  INFO = "text-info",
  WARNING = "text-warning",
  DANGER = "text-danger",
  LIGHT = "text-light",
  DARK = "text-dark",
  DARKER = "text-darker",
  DEFAULT = "text-default",
  BODY = "text-body",
  MUTED = "text-muted",
}

interface State {
  bg: Background;
  text: Text;
}

const storedTheme = localStorage.getItem("theme");
const initialTheme: State = {
  bg: (storedTheme as Background) ?? Background.DEFAULT,
  text:
    storedTheme &&
    [Background.LIGHT, Background.LIGHTER, Background.SECONDARY, Background.WHITE].includes(storedTheme as Background)
      ? Text.DARK
      : Text.WHITE,
};

export const Theme = createContext<any>(initialTheme);

function themeReducer(state: State = initialTheme, { type, payload }: ReducerAction): State {
  console.log("@@ Theme context action", { type, payload });
  switch (payload) {
    case Background.PRIMARY:
    case Background.SUCCESS:
    case Background.INFO:
    case Background.WARNING:
    case Background.DANGER:
    case Background.INDIGO:
    case Background.PURPLE:
    case Background.PINK:
    case Background.YELLOW:
    case Background.CYAN:
    case Background.DARKER:
    case Background.DARK:
    case Background.DEFAULT:
    case Background.GRAY:
      return {
        bg: payload,
        text: Text.WHITE,
      };
    case Background.LIGHT:
    case Background.LIGHTER:
    case Background.SECONDARY:
    case Background.WHITE:
      return {
        bg: payload,
        text: Text.DARK,
      };
    default:
      return state;
  }
}

export function ThemeProvider(props: any) {
  const [theme, dispatch] = useReducer(themeReducer, initialTheme);
  const value = { theme, dispatch };

  return <Theme.Provider value={value as any}>{props.children}</Theme.Provider>;
}
