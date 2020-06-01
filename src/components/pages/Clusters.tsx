import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import cx from "classnames";
import Network, { Edge, Event, Events, Graph, Hover, Node } from "components/Graph";
import PatternSection from "components/layout/PatternSection";
import SearchSection from "components/SearchSection";
import Alert from "components/styled/Alert";
import ClusterCard from "components/ClusterCard";
import { endpoint } from "constants/config";
import { Store, Theme } from "context";
import useKeyPress from "hooks/useKeyPress";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { Spinner } from "reactstrap";
import { StringParam, useQueryParam } from "use-query-params";
import { success } from "constants/colors";

const fetchSearch = async (url: string): Promise<Response> => {
  return await fetch(url);
};

const Clusters: React.FC = () => {
  const { theme } = useContext(Theme);
  const escape = useKeyPress("Escape");

  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState("");
  const [prev, setPrev] = useState("");
  const [page, setPage] = useState(0);
  const [network, setNetwork] = useState<any>(null);
  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const { state, dispatch } = useContext(Store);
  const [mutate, { status, data, error }] = useMutation(fetchSearch);
  const [address, setAddress] = useQueryParam("address", StringParam);
  const [y, setY] = useState(0);

  useScrollPosition(event => {
    setY(event.currPos.y);
  });

  const yBoundary = -400;

  useEffect(() => {
    if (selected !== undefined && y > yBoundary) setSelected(undefined);
  }, [y]);

  useEffect(() => {
    if (selected !== undefined) setSelected(undefined);
  }, [page]);

  const handleKeyPress = async (event: React.KeyboardEvent<Element>): Promise<void> => {
    if (event.key === "Enter" && search) {
      try {
        if (prev !== search) {
          if (state.trace) {
            dispatch({
              type: "RESET_CLUSTER",
            });
            setPage(0);
            setSelected(undefined);
          }
          setAddress(search);
          setPrev(search);
        }
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  };

  useEffect(() => {
    if (address) {
      (async (): Promise<void> => {
        await mutate(endpoint + "tags/cluster/" + address + "/set");
      })();
    }
  }, [address, mutate]);

  useEffect(() => {
    (async (): Promise<void> => {
      if (data && status === "success") {
        const payload = await data.json();
        if (payload.code >= 400) {
          setAlert(payload.error);
          setTimeout(() => {
            setAlert("");
          }, 3000);
          return;
        }
        dispatch({
          type: "CLUSTER",
          payload,
        });
      }
    })();
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log("ERROR", error);
      setAlert((error as any).message);
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  }, [error]);

  const cluster = useMemo((): any => {
    if (!state?.cluster?.length) return {};
    const graph: Graph = { nodes: [], edges: [] };
    const cid = state.cluster[0].cluster;
    const base: Node = {
      id: 0,
      label: JSON.stringify(cid),
      cid,
      color: success,
    };
    graph.nodes.push(base);
    state.cluster.forEach((c: any, i: number): void => {
      const node: Node = {
        id: i + 1,
        label: c.address,
        cid,
        mass: 3,
      };
      const edge: Edge = {
        from: 0,
        to: i + 1,
        arrows: {
          to: {
            type: "circle",
          },
        },
      };

      graph.nodes.push(node);
      graph.edges.push(edge);
    });
    return graph;
  }, [state.cluster]);

  const nodesMap = useMemo((): any => {
    if (!cluster?.nodes) return {};
    return cluster.nodes.reduce((acc: any, curr: Node) => {
      if (!acc[curr.id]) acc[curr.id] = curr.label;
      return acc;
    }, {});
  }, [cluster]);

  useEffect(() => {
    if (escape && selected != undefined) {
      setSelected(undefined);
      network.unselectAll();
    }
  }, [escape]);

  const events: Events = {
    click: (event: Event): void => {
      if (selected !== undefined && !event.nodes) setSelected(undefined);
    },
    select: (event: Event): void => {
      if (y < yBoundary) setSelected(event.nodes[0]);
    },
    hoverNode: (event: Hover): void => {
      if (y < yBoundary) setHovered(event.node);
    },
    blurNode: (): void => {
      setHovered(undefined);
    },
  };

  const options = useMemo(
    () => ({
      joinCondition: (nodeOptions: any): boolean => {
        if (!cluster?.nodes) return false;
        return nodeOptions.cid === cluster.nodes.filter((c: Node) => !c.id)[0].cid;
      },
    }),
    [cluster],
  );

  useEffect(() => {
    if (network && options) network.clustering.cluster(options);
  }, [options]);

  return (
    <>
      <PatternSection />
      <div className={cx("p-2 align-items-center", theme.bg, theme.text)} style={{ minHeight: "100vh" }}>
        <Alert visible={!!alert} message={alert} />

        <SearchSection action={handleKeyPress} title="Bitgodine Clustering" placeholder="Address" set={setSearch} />
        {status === "loading" ? (
          <Spinner
            style={{ width: "4rem", height: "4rem", left: "45%" }}
            className="noUi-value"
            type="grow"
            color="info"
          />
        ) : cluster?.nodes?.length ?? false ? (
          <>
            <Network
              title={"Cluster " + cluster.nodes[0].label}
              graph={cluster}
              events={events}
              setNetwork={setNetwork}
              classes="mt-9"
            />
            {hovered !== undefined ? (
              <ClusterCard cluster={state?.cluster?.filter((c: any) => c.address == nodesMap[hovered])[0]} />
            ) : selected !== undefined ? (
              <ClusterCard cluster={state?.cluster?.filter((c: any) => c.address == nodesMap[selected])[0]} />
            ) : (
              false
            )}
          </>
        ) : (
          false
        )}
      </div>
    </>
  );
};

export default Clusters;
