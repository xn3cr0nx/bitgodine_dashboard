import React from "react";
import { bitcoin, background, go } from "constants/colors";

export default function PatternSection() {
  return (
    <section
      className="section section-lg section-shaped pb-0 pt-0 position-absolute t-0 w-100"
      style={{ height: "70vh" }}>
      <div
        className="shape shape-style-1 shape-primary"
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
      <div className="separator separator-bottom separator-skew">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0">
          <polygon className="fill-default" points="2560 0 2560 100 0 100" />
        </svg>
      </div>
    </section>
  );
}
