import cx from "classnames";
import { Theme } from "context";
import { Trace } from "context/store";
import React, { useContext, useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

interface TraceCardProps {
  trace: Trace;
}

const TraceCard: React.FC<TraceCardProps> = ({ trace }) => {
  const { theme } = useContext(Theme);
  const [details, setDetails] = useState(false);

  const styles = useMemo(() => {
    return {
      div: "flex flex-row w-100 mb-3",
      label: "text-sm font-weight-normal mb-0 mr-3 flex-fill text-uppercase",
      detail: "text-sm mb-0 flex flex-nowrap text-break",
    };
  }, [theme]);

  return (
    <Card className="position-fixed top-0 text-sm text-nowrap z-10 top-3">
      <CardHeader className="text-dark flex justify-content-between">{trace.txid}</CardHeader>
      <CardBody className={cx("py-2 flex flex-column rounded-bottom")}>
        {trace?.next.map((next, k) => {
          return (
            <Card key={k} className={cx("shadow-lg border-0 mb-3", theme.bg, theme.text)}>
              <CardHeader
                className={cx(
                  "py-2 border-bottom rounded-bottom flex justify-content-between align-items-center",
                  theme.bg,
                  theme.text,
                )}>
                <p className="text-sm mr-3 mb-0">{`${next.txid}:${next.vout}`}</p>
                <label className="custom-toggle mb-0">
                  <input type="checkbox" onClick={(): void => setDetails(!details)} />
                  <span className={cx("custom-toggle-slider rounded-circle", theme.bg, theme.text)} />
                </label>
              </CardHeader>
              {details && (
                <CardBody className={cx("py-2 flex flex-column rounded-bottom", theme.bg, theme.text)}>
                  <div className={styles.div}>
                    <p className={styles.label}>Receiver</p>
                    <p className={styles.detail}>{next.receiver}</p>
                  </div>
                  <div className={styles.div}>
                    <p className={styles.label}>Weight</p>
                    <p className={styles.detail}>{next.weight}</p>
                  </div>
                  <div className={styles.div}>
                    <p className={styles.label}>Amount</p>
                    <p className={styles.detail}>{next.amount}</p>
                  </div>
                </CardBody>
              )}
            </Card>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default TraceCard;
