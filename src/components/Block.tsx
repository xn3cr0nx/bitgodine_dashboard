import Alert from "components/styled/Alert";
import { background, textColor } from "constants/colors";
import { Block as BlockProps } from "context";
import React, { useMemo, useState } from "react";
import { useCopyClipboard } from "react-recipes";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";
import Paginate from "./Paginate";

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
            style={{
              display: "flex",
              borderBottom: "1px solid #adb5bd",
            }}>
            <p className="m-0 font-weight-bold" style={{ flexBasis: "100%" }}>
              {f.toUpperCase()}
            </p>
            <p
              className="m-0"
              onClick={(): void => {
                if (f == "id") setIsCopied((block as any)[f]);
              }}
              style={f == "id" ? { cursor: "pointer", fontWeight: "bold" } : {}}>
              {(block as any)[f]}
            </p>
          </div>
        );
      })}

      {txsList && (
        <Paginate
          list={block.transactions.map(tx => {
            return (
              <Card key={tx} className="mt-1 mb-1">
                <CardHeader className="text-dark">
                  <Link to={`?tx=${tx}`}>{tx}</Link>
                </CardHeader>
                <CardBody className="text-dark">
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                </CardBody>
              </Card>
            );
          })}
          index={index}
          setIndex={setIndex}
        />
      )}
    </div>
  );
};

export default Block;
