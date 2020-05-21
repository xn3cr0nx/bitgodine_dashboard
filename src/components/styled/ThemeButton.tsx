import cx from "classnames";
import React from "react";

interface Props {
  onClick: () => void;
  theme: string;
}

const HoverButton: React.FC<Props> = ({ onClick, theme }) => {
  return (
    <div
      onClick={onClick}
      className={cx("shine pointer rounded-lg border", theme)}
      style={{ width: "10rem", height: "10rem" }}
    />
  );
};

export default HoverButton;
