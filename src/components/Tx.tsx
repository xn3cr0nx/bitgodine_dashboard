import { background, textColor } from "constants/colors";
import { Tx as TxProps } from "context";
import React, { useMemo } from "react";
import { Card, CardBody, Col, Row, PaginationItem, PaginationLink } from "reactstrap";

interface Props {
  tx: TxProps;
}

const Tx: React.FC<Props> = ({ tx }) => {
  const txFields = useMemo(() => {
    return Object.keys(tx).reduce((acc, curr) => {
      if (!(acc as any)[curr] && !["transactions"].includes(curr)) (acc as any)[curr] = (tx as any)[curr];
      return acc;
    }, {});
  }, [tx]);

  return (
    <div className="mb-5 w-100 card" style={{ borderRadius: "0.5rem", background, color: textColor }}>
      {Object.keys(txFields)
        .filter(f => !["input", "output"].includes(f))
        .map((f, i) => {
          return (
            <div
              key={i}
              className="w-100 flex flex-row p-3"
              style={{
                display: "flex",
                borderBottom: "1px solid #adb5bd",
              }}>
              <p className="m-0 font-weight-bold" style={{ flexBasis: "100%" }}>
                {f.toUpperCase()}
              </p>
              <p className="m-0">{(tx as any)[f]}</p>
            </div>
          );
        })}

      <Card className="mt-5">
        <CardBody className="text-dark">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {tx.input.map((input, i) => {
                return (
                  <Row key={i}>
                    <p>{input.txid}</p>
                  </Row>
                );
              })}
            </div>

            <PaginationItem className="m-5">
              <PaginationLink aria-label="Next" className="bg-default border-default">
                <i className="fa fa-angle-right" />
                <span className="sr-only">Next</span>
              </PaginationLink>
            </PaginationItem>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {tx.output.map((output, i) => {
                return (
                  <Row key={i}>
                    <p>{`${output.index} - ${output.scriptpubkey_address} ${output.value}`}</p>
                  </Row>
                );
              })}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Tx;
