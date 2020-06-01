import cx from "classnames";
import { Theme } from "context";
import { Cluster } from "context/store";
import React, { useContext, useMemo } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

interface ClusterCardProps {
  cluster: Cluster;
}

const ClusterCard: React.FC<ClusterCardProps> = ({ cluster }) => {
  const { theme } = useContext(Theme);

  const styles = useMemo(() => {
    return {
      div: "flex flex-row w-100 mb-3 text-default",
      label: "text-sm font-weight-normal mb-0 mr-3 flex-fill text-uppercase",
      detail: "text-sm mb-0 flex flex-nowrap text-break",
    };
  }, [theme]);

  if (!cluster) return null;

  return (
    <Card className="position-fixed top-0 text-sm text-nowrap z-10 top-3">
      <CardHeader className="text-dark flex justify-content-between">{cluster?.address ?? ""}</CardHeader>
      <CardBody className={cx("py-2 flex flex-column rounded-bottom")}>
        <div className={styles.div}>
          <p className={styles.label}>Nickname</p>
          <p className={styles.detail}>{cluster.nickname}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default ClusterCard;
