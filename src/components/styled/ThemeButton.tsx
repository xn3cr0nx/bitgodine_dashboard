import cx from "classnames";
import React, { useState } from "react";

interface Props {
  onClick: () => void;
  theme: string;
}

const HoverButton: React.FC<Props> = ({ onClick, theme }) => {
  const [hover, setHover] = useState(false);

  const lightBg = ["yellow", "cyan", "lighter", "secondary", "white"].some(t => theme.includes(t));

  return (
    <div
      onClick={onClick}
      onMouseEnter={(): void => setHover(true)}
      onMouseLeave={(): void => setHover(false)}
      className={cx("shine flex justify-content-center position-relative pointer rounded-lg border", theme)}
      style={{ width: "10rem", height: "10rem" }}>
      <p
        className={cx("position-absolute align-self-center bottom-0 font-weight-bold", { "text-white": !lightBg })}
        style={{
          transition: "opacity 0.5s",
          opacity: hover ? 1 : 0,
        }}>
        {theme.replace("bg-gradient-", "")}
      </p>
    </div>
  );
};

export default HoverButton;
