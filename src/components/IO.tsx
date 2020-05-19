import React, { useMemo } from "react";
import { Input as InputProps, Output as OutputProps } from "context";
import { background, textColor } from "constants/colors";

interface Props {
  input: InputProps;
  output: OutputProps;
}

const Tx: React.FC<Props> = ({ input, output }) => {
  // const txFields = useMemo(() => {
  //   return Object.keys(tx).reduce((acc, curr) => {
  //     if (!(acc as any)[curr] && !["transactions"].includes(curr)) (acc as any)[curr] = (tx as any)[curr];
  //     return acc;
  //   }, {});
  // }, [tx]);

  // return (
  //   <div className="mb-5 w-100 card" style={{ borderRadius: "0.5rem", background, color: textColor }}>
  //     {Object.keys(txFields)
  //       .filter(f => !["input", "output"].includes(f))
  //       .map((f, i) => {
  //         return (
  //           <div
  //             key={i}
  //             className="w-100 flex flex-row p-3"
  //             style={{
  //               display: "flex",
  //               borderBottom: "1px solid #adb5bd",
  //             }}>
  //             <p className="m-0 font-weight-bold" style={{ flexBasis: "100%" }}>
  //               {f.toUpperCase()}
  //             </p>
  //             <p className="m-0">{(tx as any)[f]}</p>
  //           </div>
  //         );
  //       })}
  //   </div>
  // );
  return null;
};

export default Tx;
