import cx from "classnames";
import { Theme } from "context";
import { Tx as TxProps } from "context/store";
import React, { useContext, useMemo } from "react";
import TxCard from "./TxCard";

interface Props {
  tx: TxProps;
}

const Tx: React.FC<Props> = ({ tx }) => {
  const { theme } = useContext(Theme);

  const txFields = useMemo(() => {
    return Object.keys(tx).reduce((acc, curr) => {
      if (!(acc as any)[curr] && !["transactions"].includes(curr)) (acc as any)[curr] = (tx as any)[curr];
      return acc;
    }, {});
  }, [tx]);

  return (
    <div className={cx("mb-5 w-100 card bg-transparent border-0", theme.text)}>
      {Object.keys(txFields)
        .filter(f => !["input", "output"].includes(f))
        .map((f, i) => {
          return (
            <div
              key={i}
              className="w-100 flex flex-row p-3 font-weight-bold"
              style={{ borderBottom: "1px solid #adb5bd" }}>
              <p className="m-0 font-weight-bold flex-fill">{f.toUpperCase()}</p>
              <p className="m-0 font-weight-normal">{(tx as any)[f]}</p>
            </div>
          );
        })}

      <TxCard tx={tx} className="mt-4" />
    </div>
  );
};

export default Tx;
