import React, { useMemo } from "react";
import { Block as BlockProps } from "context";
import { background, textColor } from "constants/colors";

interface Props {
  block: BlockProps;
}

const Block: React.FC<Props> = ({ block }) => {
  const blockFields = useMemo(() => {
    return Object.keys(block).reduce((acc, curr) => {
      if (!(acc as any)[curr] && !["transactions"].includes(curr)) (acc as any)[curr] = (block as any)[curr];
      return acc;
    }, {});
  }, [block]);

  return (
    <div className="mt-5 mb-5 w-100 card" style={{ borderRadius: "0.5rem", background, color: textColor }}>
      {Object.keys(blockFields).map((f, i) => {
        return (
          <div
            key={i}
            className="w-100 flex flex-row p-3"
            style={{
              display: "flex",
              borderBottom: "1px solid #adb5bd",
            }}>
            <p className="m-0" style={{ flexBasis: "100%" }}>
              {f.toUpperCase()}
            </p>
            <p className="m-0">{(block as any)[f]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Block;
