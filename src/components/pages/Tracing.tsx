import cx from "classnames";
import Network, { Edge, Event, Events, Graph, Hover, Node } from "components/Graph";
import PatternSection from "components/layout/PatternSection";
import SearchSection from "components/SearchSection";
import Alert from "components/styled/Alert";
import { endpoint } from "constants/config";
import { Store, Theme } from "context";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { Card, CardBody, CardHeader, Spinner } from "reactstrap";
import { StringParam, useQueryParam } from "use-query-params";
import { danger, warning, success } from "constants/colors";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

interface Trace {
  txid: string;
  next: Next[];
}

interface Next {
  txid: string;
  receiver: string;
  vout: number;
  amount: number;
  weight?: number;
}

interface HoverCardProps {
  trace: Trace;
}

const HoverCard: React.FC<HoverCardProps> = ({ trace }) => {
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
        {trace?.next.map(next => {
          return (
            <Card className={cx("shadow-lg border-0 mb-3 text-white", theme)}>
              <CardHeader
                className={cx(
                  "py-2 border-bottom rounded-bottom flex justify-content-between align-items-center",
                  theme,
                )}>
                <p className="text-sm mr-3 mb-0">{`${next.txid}:${next.vout}`}</p>
                <label className="custom-toggle mb-0">
                  <input type="checkbox" onClick={(): void => setDetails(!details)} />
                  <span className={cx("custom-toggle-slider rounded-circle", theme)} />
                </label>
              </CardHeader>
              {details && (
                <CardBody className={cx("py-2 flex flex-column rounded-bottom", theme)}>
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

const fetchSearch = async (url: string): Promise<Response> => {
  return await fetch(url);
};

const App: React.FC = () => {
  const { theme } = useContext(Theme);

  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState("");
  const [prev, setPrev] = useState("");
  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const { state, dispatch } = useContext(Store);
  const [mutate, { status, data, error }] = useMutation(fetchSearch);
  const [address, setAddress] = useQueryParam("address", StringParam);
  const [y, setY] = useState(0);

  useScrollPosition(event => {
    setY(event.currPos.y);
  });

  const yBoundary = -500;

  useEffect(() => {
    if (selected != undefined && y > yBoundary) setSelected(undefined);
  }, [y]);

  const handleKeyPress = async (event: React.KeyboardEvent<Element>): Promise<void> => {
    if (event.key === "Enter" && search) {
      try {
        if (prev !== search) {
          if (state.trace) {
            dispatch({
              type: "RESET_TRACE",
            });
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
        await mutate(endpoint + "trace/address/" + address);
        // window.scrollTo(0, 0);
      })();
    }
  }, [address]);

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
          type: "TRACE",
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

  const exploreTrace = (
    trace: Trace,
    prev: number | undefined,
    index: number,
    weight: number | undefined,
  ): { nodes: Node[]; edges: Edge[] } => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const node: Node = {
      id: index,
      label: trace.txid,
      mass: 3,
    };
    nodes.push(node);

    if (prev != undefined) {
      const edge: Edge = {
        from: prev,
        to: index,
        color: (weight as number) > 85 ? success : (weight as number) > 65 ? warning : danger,
      };
      edges.push(edge);
    }

    let incr = 0;
    if (trace.next) {
      trace.next.forEach(n => {
        if (state.trace.traces[n.txid]) {
          const { nodes: recNodes, edges: resEdges } = exploreTrace(
            state.trace.traces[n.txid],
            index,
            index + incr + 1,
            n.weight,
          );
          nodes.push(...recNodes);
          edges.push(...resEdges);
          incr += recNodes.length;
        }
      });
    }
    return { nodes, edges };
  };

  const graph = useMemo((): Graph => {
    const graph: Graph = { nodes: [], edges: [] };
    if (state.trace && (state.trace?.traces ?? false)) {
      const traces: Trace[] = [];
      for (const t of Object.keys(state.trace.traces)) {
        let found = false;
        for (const c of Object.keys(state.trace.traces)) {
          if (state.trace.traces[c]?.next?.map((n: Next) => n.txid)?.includes(t) ?? false) {
            found = true;
          }
        }
        if (!found) {
          traces.push(state.trace.traces[t]);
        }
      }
      console.log("the traces", traces);

      let incr = 0;
      traces.forEach((trace, i) => {
        const { nodes, edges } = exploreTrace(trace, undefined, i + incr, undefined);
        graph.nodes.push(...nodes);
        graph.edges.push(...edges);
        console.log("received nodes and edges", nodes, edges);
        incr += nodes.length;
      });
    }
    return graph;
  }, [state.trace]);

  const nodesMap = useMemo((): any => {
    if (!graph?.nodes) return {};
    return graph.nodes.reduce((acc: any, curr: Node) => {
      if (!acc[curr.id]) acc[curr.id] = curr.label;
      return acc;
    }, {});
  }, [graph]);

  const events: Events = {
    click: (event: Event): void => {
      if (selected != undefined && !event.nodes) setSelected(undefined);
    },
    doubleClick: (event: Event): void => {
      console.log("DOBULE CLICK", event);
    },
    select: (event: Event): void => {
      if (y < yBoundary) setSelected(event.nodes[0]);
    },
    hoverNode: (event: Hover): void => {
      if (y < yBoundary) setHovered(event.node);
    },
    blurNode: (event: Hover): void => {
      setHovered(undefined);
    },
  };

  return (
    <>
      <PatternSection />
      <div className={cx("p-2 align-items-center", theme)} style={{ minHeight: "100vh" }}>
        <Alert visible={!!alert} message={alert} />

        <SearchSection action={handleKeyPress} title="Bitgodine Tracing" placeholder="Address" set={setSearch} />
        {status == "loading" ? (
          <Spinner
            style={{ width: "4rem", height: "4rem", left: "45%" }}
            className="noUi-value"
            type="grow"
            color="info"
          />
        ) : graph?.nodes?.length ?? false ? (
          <>
            <Network graph={graph} events={events} style={{ marginTop: "8rem" }} />
            {hovered != undefined ? (
              <HoverCard trace={state?.trace?.traces[nodesMap[hovered]]} />
            ) : selected != undefined ? (
              <HoverCard trace={state?.trace?.traces[nodesMap[selected]]} />
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

export default App;
