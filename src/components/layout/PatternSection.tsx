import React, { useContext } from "react";
import { bitcoin, background, go } from "constants/colors";
import cx from "classnames";
import { Theme } from "context";

export default function PatternSection() {
  const { theme } = useContext(Theme);

  return (
    <section
      className="section section-lg section-shaped pb-0 pt-0 position-absolute t-0 w-100"
      style={{ height: "60vh" }}>
      <div
        className={cx("shape shape-style-1 shape-primary", theme)}
        style={{
          position: "unset",
          background: `linear-gradient(150deg, ${bitcoin} 20%, ${go}80 70%, ${background} 95%)`,
        }}>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="separator separator-bottom separator-skew" style={{ bottom: "-1px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0">
          {/*<polygon className={"fill" + theme.replace("bg-gradient", "")} points="2560 0 2560 100 0 100" />*/}
        </svg>
      </div>
    </section>
  );
}
