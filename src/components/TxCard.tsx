import React, { useState } from "react";
import { Tx as TxProps, Input } from "context";
import { Card, CardBody, Col, Row, PaginationItem, PaginationLink, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { satToBtc } from "libs/componentUtils";
import { coinbase } from "constants/variables";

interface Props {
  tx: TxProps;
  className?: string;
  style?: any;
}

const TxCard: React.FC<Props> = ({ tx, className, style }) => {
  const [details, setDetails] = useState(false);

  return (
    <Card className={"shadow-lg border-0".concat(" " + className)} style={style}>
      <CardHeader className="text-dark flex justify-content-between">
        <Link to={`?tx=${tx.txid}`}>{tx.txid}</Link>
        <label className="custom-toggle">
          <input type="checkbox" onClick={(): void => setDetails(!details)} />
          <span className="custom-toggle-slider rounded-circle bg-default" />
        </label>
      </CardHeader>
      <CardBody className="py-4">
        <Row className="row-grid align-items-start justify-content-center">
          <Col style={{ flex: "0 0 50%", maxWidth: "47%" }}>
            {tx.input.map((input, i) => {
              return (
                <Card key={i} className="shadow-lg bg-default border-0 mb-3">
                  <CardHeader className="py-2 bg-default flex flex-row border-bottom rounded-bottom">
                    <p className="text-sm font-weight-normal mb-0 mr-3" style={{ marginLeft: "-1rem" }}>{`#${i}`}</p>
                    <p className="text-sm font-weight-normal text-break mb-0">
                      {/* missing :n output to txid */}
                      {input.is_coinbase ? "Coinbase" : `${input.txid}:${input.vout}`}
                    </p>
                  </CardHeader>
                  {details && (
                    <CardBody className="py-2 bg-default flex flex-column rounded-bottom">
                      <div className="flex flex-row w-100 mb-3">
                        <p className="text-sm font-weight-normal mb-0 mr-3 flex-fill text-uppercase">scriptSig (asm)</p>
                        <p className="text-sm mb-0 flex flex-nowrap text-break">{input.scriptsig_asm}</p>
                      </div>
                      <div className="flex flex-row w-100 mb-3">
                        <p className="text-sm font-weight-normal mb-0 mr-3 flex-fill text-uppercase">scriptSig (hex)</p>
                        <p className="text-sm mb-0 flex flex-nowrap  text-break">{input.scriptsig}</p>
                      </div>
                      <div className="flex flex-row w-100 mb-3">
                        <p className="text-sm font-weight-normal mb-0 flex-fill text-uppercase">nsequence</p>
                        <p className="text-sm mb-0 flex flex-nowrap">{input.sequence}</p>
                      </div>
                      <div className="flex flex-row w-100 mb-3">
                        <p className="text-sm font-weight-normal mb-0 flex-fill text-uppercase">prevout</p>
                        <p className="text-sm mb-0 flex flex-nowrap">{input.prevout}</p>
                      </div>
                    </CardBody>
                  )}
                </Card>
              );
            })}
          </Col>
          <div className="icon icon-shape icon-shape-default rounded-circle align-self-center">
            <i className="ni ni-bold-right" />
          </div>
          <Col style={{ flex: "0 0 50%", maxWidth: "47%" }}>
            {tx.output.map((output, i) => {
              return (
                <Card key={i} className="shadow-lg bg-default border-0 mb-3">
                  <CardHeader className="py-2 bg-default flex flex-row border-bottom rounded-bottom">
                    <p className="text-sm font-weight-normal mb-0 mr-3" style={{ marginLeft: "-1rem" }}>{`#${i}`}</p>
                    <p className="text-sm font-weight-normal mb-0 flex-fill">
                      {output.scriptpubkey_address ? output.scriptpubkey_address : "OP_RETURN"}
                    </p>
                    <p className="text-sm font-weight-normal mb-0 flex flex-nowrap">{`${satToBtc(output.value).toFixed(
                      2,
                    )} BTC`}</p>
                  </CardHeader>
                  {details && (
                    <CardBody className="py-2 bg-default flex flex-column rounded-bottom">
                      <div className="flex flex-row w-100 mb-3">
                        <p className="text-sm font-weight-normal mb-0 flex-fill text-uppercase">Type</p>
                        <p className="text-sm mb-0 flex flex-nowrap text-uppercase">{output.scriptpubkey_type}</p>
                      </div>
                      <div className="flex flex-row w-100 mb-3">
                        <p className="text-sm font-weight-normal mb-0 mr-3 flex-fill text-uppercase">
                          scriptPubKey (asm)
                        </p>
                        <p className="text-sm mb-0 flex flex-nowrap text-break">{output.scriptpubkey_asm}</p>
                      </div>
                      <div className="flex flex-row w-100 mb-3">
                        <p className="text-sm font-weight-normal mb-0 mr-3 flex-fill text-uppercase">
                          scriptPubKey (hex)
                        </p>
                        <p className="text-sm mb-0 flex flex-nowrap  text-break">{output.scriptpubkey}</p>
                      </div>
                    </CardBody>
                  )}
                </Card>
              );
            })}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default TxCard;
