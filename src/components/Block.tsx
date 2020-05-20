import Alert from "components/styled/Alert";
import { background, textColor } from "constants/colors";
import { Block as BlockProps } from "context";
import React, { useMemo, useState } from "react";
import { useCopyClipboard } from "react-recipes";
import Paginate from "./Paginate";
import TxCard from "./TxCard";

interface Props {
  block: BlockProps;
  txsList?: boolean;
}

const Block: React.FC<Props> = ({ block, txsList }) => {
  const [isCopied, setIsCopied] = useCopyClipboard();
  const [index, setIndex] = useState(0);

  const blockFields = useMemo(() => {
    return Object.keys(block).reduce((acc, curr) => {
      if (!(acc as any)[curr] && !["transactions"].includes(curr)) (acc as any)[curr] = (block as any)[curr];
      return acc;
    }, {});
  }, [block]);

  return (
    <div className="mb-5 w-100 card" style={{ borderRadius: "0.5rem", background, color: textColor }}>
      <Alert visible={isCopied} type="success" message={"Copied to cliboard"} />

      {Object.keys(blockFields).map((f, i) => {
        return (
          <div
            key={i}
            className="w-100 flex flex-row p-3 font-weight-bold"
            style={{ borderBottom: "1px solid #adb5bd" }}>
            <p className="m-0 font-weight-bold flex-fill">{f.toUpperCase()}</p>
            <p
              className="m-0 font-weight-normal text-nowrap"
              onClick={(): void => {
                if (f == "id") setIsCopied((block as any)[f]);
              }}
              style={f == "id" ? { cursor: "pointer", fontWeight: "bold" } : {}}>
              {(block as any)[f]}
            </p>
          </div>
        );
      })}

      {/*txsList && (
        <Paginate
          list={block.transactions.map((tx, i) => (
            <TxCard key={i} tx={tx} />
          ))}
          index={index}
          setIndex={setIndex}
        />
          )*/}
    </div>
  );
};

export default Block;
