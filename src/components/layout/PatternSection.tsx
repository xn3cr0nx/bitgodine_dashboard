import cx from "classnames";
import { background, bitcoin, go } from "constants/colors";
import { laptop } from "constants/media";
import { Theme } from "context";
import React, { useContext } from "react";
import { useWindowSize } from "react-recipes";

interface Props {
  height?: string | number;
}

const PatternSection: React.FC<Props> = ({ height }) => {
  const { theme } = useContext(Theme);
  const { width } = useWindowSize();

  return (
    <section
      className="section section-lg section-shaped pb-0 pt-0 position-absolute t-0 w-100"
      style={{
        height: height ? height : width > laptop ? "90vh" : "120vh",
        transform: "skew(0, -4deg)",
        marginTop: "-10rem",
      }}>
      <div
        className={cx("shape shape-style-1 shape-primary")}
        style={{
          position: "unset",
          background: `linear-gradient(150deg, ${bitcoin} 20%, ${go}80 70%, ${background} 95%)`,
        }}>
        <span className="bubble1" />
        <span className="bubble2" />
        <span className="bubble3" />
        <span className="bubble4" />
        <span className="bubble5" />
        <span className="bubble6" />
        <span className="bubble7" />
        <span className="bubble8" />
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
};

export default PatternSection;
