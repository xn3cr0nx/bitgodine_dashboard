import cx from "classnames";
import { Theme } from "context";
import { Tx as TxProps } from "context/store";
import { satToBtc } from "libs/componentUtils";
import React, { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

interface Props {
  tx: TxProps;
  className?: string;
  style?: any;
}

const TxCard: React.FC<Props> = ({ tx, className, style }) => {
  const { theme } = useContext(Theme);
  const [details, setDetails] = useState(false);

  const styles = useMemo(() => {
    return {
      card: cx("shadow-lg border-0 mb-3", theme),
      cardHeader: cx("py-2 flex flex-row border-bottom rounded-bottom", theme),
      cardBody: cx("py-2 flex flex-column rounded-bottom", theme),
      div: "flex flex-row w-100 mb-3",
    };
  }, [theme]);

  return (
    <Card className={"shadow-lg border-0".concat(" " + className)} style={style}>
      <CardHeader className="text-dark flex justify-content-between">
        <Link to={`?tx=${tx.txid}`}>{tx.txid}</Link>
        <label className="custom-toggle">
          <input type="checkbox" onClick={(): void => setDetails(!details)} />
          <span className={cx("custom-toggle-slider rounded-circle", theme)} />
        </label>
      </CardHeader>
      <CardBody className="py-4">
        <Row className="row-grid align-items-start justify-content-center">
          <Col style={{ flex: "0 0 50%", maxWidth: "47%" }}>
            {tx.input.map((input, i) => {
              return (
                <Card key={i} className={styles.card}>
                  <CardHeader className={styles.cardHeader}>
                    <p className="text-sm font-weight-normal mb-0 mr-3" style={{ marginLeft: "-1rem" }}>{`#${i}`}</p>
                    <p className="text-sm font-weight-normal text-break mb-0">
                      {/* missing :n output to txid */}
                      {input.is_coinbase ? "Coinbase" : `${input.txid}:${input.vout}`}
                    </p>
                  </CardHeader>
                  {details && (
                    <CardBody className={styles.cardBody}>
                      <div className={styles.div}>
                        <p className="text-sm font-weight-normal mb-0 mr-3 flex-fill text-uppercase">scriptSig (asm)</p>
                        <p className="text-sm mb-0 flex flex-nowrap text-break">{input.scriptsig_asm}</p>
                      </div>
                      <div className={styles.div}>
                        <p className="text-sm font-weight-normal mb-0 mr-3 flex-fill text-uppercase">scriptSig (hex)</p>
                        <p className="text-sm mb-0 flex flex-nowrap text-break">{input.scriptsig}</p>
                      </div>
                      <div className={styles.div}>
                        <p className="text-sm font-weight-normal mb-0 flex-fill text-uppercase">nsequence</p>
                        <p className="text-sm mb-0 flex flex-nowrap">{input.sequence}</p>
                      </div>
                      <div className={styles.div}>
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
                <Card key={i} className={styles.card}>
                  <CardHeader className={styles.cardHeader}>
                    <p className="text-sm font-weight-normal mb-0 mr-3" style={{ marginLeft: "-1rem" }}>{`#${i}`}</p>
                    <p className="text-sm font-weight-normal mb-0 flex-fill">
                      {output.scriptpubkey_address ? output.scriptpubkey_address : "OP_RETURN"}
                    </p>
                    <p className="text-sm font-weight-normal mb-0 flex flex-nowrap">{`${satToBtc(output.value).toFixed(
                      2,
                    )} BTC`}</p>
                  </CardHeader>
                  {details && (
                    <CardBody className={styles.cardBody}>
                      <div className={styles.div}>
                        <p className="text-sm font-weight-normal mb-0 flex-fill text-uppercase">Type</p>
                        <p className="text-sm mb-0 flex flex-nowrap text-uppercase">{output.scriptpubkey_type}</p>
                      </div>
                      <div className={styles.div}>
                        <p className="text-sm font-weight-normal mb-0 mr-3 flex-fill text-uppercase">
                          scriptPubKey (asm)
                        </p>
                        <p className="text-sm mb-0 flex flex-nowrap text-break">{output.scriptpubkey_asm}</p>
                      </div>
                      <div className={styles.div}>
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
