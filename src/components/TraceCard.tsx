import cx from "classnames";
import { Theme } from "context";
import { Trace } from "context/store";
import React, { useContext, useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { unique } from "libs/componentUtils";

interface TraceCardProps {
  trace: Trace;
}

const heuristics = {
  0: "Locktime",
  1: "Peeling Chain",
  2: "Power of Ten",
  3: "Optimal Change",
  4: "Address Type",
  5: "Address Reuse",
  6: "Shadow",
  7: "Client Behaviour",
  8: "Exact Amount",
  9: "Backward",
  10: "Forward",
};

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

  const markToHeuristics = (mask: string): string => {
    const list: string[] = [];
    for (let i = 0; i < mask.length; i++) {
      if (mask.charAt(mask.length - 1 - i) === "1") {
        list.push((heuristics as any)[i]);
      }
    }
    return list.join(",");
  };

  console.log("The trace", trace);

  if (!trace?.next) return null;

  return (
    <Card className="position-fixed top-0 text-sm text-nowrap z-10 top-3">
      <CardHeader className="text-dark flex justify-content-between">{trace?.txid ?? ""}</CardHeader>
      <CardBody className={cx("py-2 flex flex-column rounded-bottom")}>
        {trace?.next?.map((next, k) => {
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
                  <div className={styles.div}>
                    <p className={styles.label}>Analysis</p>
                    <p className={styles.detail}>{markToHeuristics(next.analysis)}</p>
                  </div>
                  {next.clusters.length && next.clusters.length < 25 ? (
                    <>
                      <div className={styles.div}>
                        <p className={styles.label}>Cluster Type</p>
                        <p className={styles.detail}>
                          {next.clusters
                            .map(c => c.type)
                            // .filter(unique)
                            .join(",\n")}
                        </p>
                      </div>
                      <div className={styles.div}>
                        <p className={styles.label}>Clusters</p>
                        <p className={styles.detail}>{next.clusters.map(c => c.message || c.nickname).join(",\n")}</p>
                      </div>
                    </>
                  ) : (
                    false
                  )}
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
