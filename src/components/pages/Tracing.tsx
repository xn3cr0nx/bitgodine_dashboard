import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import cx from "classnames";
import Network, { Edge, Event, Events, Graph, Hover, Node } from "components/Graph";
import PatternSection from "components/layout/PatternSection";
import Paginate from "components/Paginate";
import SearchSection from "components/SearchSection";
import Alert from "components/styled/Alert";
import TraceCard from "components/TraceCard";
import { danger, success, warning } from "constants/colors";
import { endpoint } from "constants/config";
import { Store, Theme } from "context";
import { Next, Trace } from "context/store";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupButtonDropdown,
  Spinner,
} from "reactstrap";
import { StringParam, useQueryParam } from "use-query-params";

const fetchSearch = async (url: string): Promise<Response> => {
  return await fetch(url);
};

const App: React.FC = () => {
  const { theme } = useContext(Theme);

  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState("");
  const [prev, setPrev] = useState("");
  const [page, setPage] = useState(0);
  const [network, setNetwork] = useState<any>(null);
  const [depth, setDepth] = useState("10");
  const [exploreLeaf, setExploreLeaf] = useState<number | undefined>(undefined);
  const [openDepth, setOpenDepth] = useState(false);
  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [additional, setAdditional] = useState<Graph>({ nodes: [], edges: [] });
  const { state, dispatch } = useContext(Store);
  const [mutate, { status, data, error }] = useMutation(fetchSearch);
  const [address, setAddress] = useQueryParam("address", StringParam);
  const [y, setY] = useState(0);

  useScrollPosition(event => {
    setY(event.currPos.y);
  });

  const yBoundary = -400;
  const limit = 1;

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
              type: "RESET_TRACE",
            });
            setPage(0);
            setDepth("10");
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
    if (address && (!page || !(page % limit))) {
      (async (): Promise<void> => {
        await mutate(endpoint + "trace/address/" + address + `?limit=${limit}&skip=${Math.floor(page / limit)}`);
      })();
    }
  }, [address, mutate, page]);

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

  useEffect(() => {
    setAdditional({ nodes: [], edges: [] });
    if (selected) setSelected(undefined);
    if (network) {
      // network.redraw();
    }
  }, [depth]);

  const exploreTrace = (
    trace: Trace,
    vout: number,
    prev: number | undefined,
    index: number,
    weight: number | undefined,
    currDepth: number,
  ): { nodes: Node[]; edges: Edge[] } => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    if (currDepth > parseInt(depth)) {
      const exploring = exploreLeaf !== undefined;
      const explorationEnd = exploreLeaf !== undefined && exploreLeaf - currDepth >= 10;
      if (!(exploring && !explorationEnd)) {
        return {
          nodes: trace?.next?.map(n => ({
            id: -1,
            label: n.txid + ":" + n.vout,
          })) ?? [{ id: -1, label: "null" }],
          edges,
        };
      }
    }

    const node: Node = {
      id: index,
      label: trace.txid + ":" + vout,
      mass: 3,
    };

    if (prev !== undefined) {
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
        let { nodes: recNodes, edges: recEdges } = exploreTrace(
          state.trace.traces[page % limit][n.txid + ":" + n.vout],
          n.vout,
          index,
          index + incr + 1,
          n.weight,
          currDepth + 1,
        );
        if (recNodes.length && !recEdges.length) {
          node.color = danger;
        } else {
          // remove multiple equal branches merging paths together and deleting orphans branches
          recNodes.forEach(node => {
            const filtered = recNodes.filter(n => node.label == n.label);
            if (filtered.length > 1) {
              filtered
                .sort((a, b) => b.id - a.id)
                .forEach((repeated, i) => {
                  if (i > 0) {
                    recEdges.filter((edge, j) => {
                      if (edge.to == repeated.id) {
                        recEdges[j].to = filtered[0].id;
                      }
                    });
                    recNodes = recNodes.filter(node => node.id != repeated.id);
                    recEdges = recEdges.filter(edge => edge.from != repeated.id);
                  }
                });
            }
          });

          nodes.push(...recNodes);
          edges.push(...recEdges);
          incr += recNodes.length;
        }
      });
    }

    nodes.push(node);
    return { nodes, edges };
  };

  const graph = useMemo((): Graph => {
    const graph: Graph = { nodes: [], edges: [] };
    if (state?.trace && state?.trace?.traces && state?.trace?.traces[page % limit]) {
      let trace: Trace = { txid: "", next: [] };
      for (const t of Object.keys(state.trace.traces[page % limit])) {
        let found = false;
        for (const c of Object.keys(state.trace.traces[page % limit])) {
          if (state.trace.traces[page % limit][c]?.next?.map((n: Next) => n.txid + ":" + n.vout)?.includes(t)) {
            found = true;
          }
        }
        if (!found) {
          trace = state.trace.traces[page % limit][t];
        }
      }

      const { nodes, edges } = exploreTrace(trace, 0, undefined, 0, undefined, 1);
      graph.nodes.push(...nodes);
      graph.edges.push(...edges);
    }
    return graph;
  }, [state.trace, depth, page]);

  const combinedGraph = useMemo((): Graph => {
    const combined = { nodes: graph.nodes.concat(additional.nodes), edges: graph.edges.concat(additional.edges) };
    return combined;
  }, [graph, additional]);

  const nodesMap = useMemo((): any => {
    if (!combinedGraph?.nodes) return {};
    return combinedGraph.nodes.reduce((acc: any, curr: Node) => {
      if (!acc[curr.id]) acc[curr.id] = curr.label;
      return acc;
    }, {});
  }, [combinedGraph]);

  const calculateDepth = (node: number): number => {
    if (!node) return 0;
    const edge = combinedGraph.edges.filter(edge => edge.to === node)[0];
    if (!edge) return 0;
    const depth = calculateDepth(edge.from);
    return depth + 1;
  };

  const isLeaf = (node: number): boolean => {
    return !combinedGraph.edges.filter(edge => edge.from === node).length;
  };

  useEffect(() => {
    if (exploreLeaf !== undefined) {
      const trace = state.trace.traces[page % limit][nodesMap[exploreLeaf]];
      const nodeDepth = calculateDepth(exploreLeaf);
      const edge = combinedGraph.edges.filter(edge => edge.to === exploreLeaf)[0];
      if (!edge) {
        setExploreLeaf(undefined);
        return;
      }
      const fromTrace: Trace = state.trace.traces[page % limit][nodesMap[edge.from]];
      const { weight, vout } = fromTrace.next.filter(n => n.txid === trace.txid)[0];
      const { nodes, edges } = exploreTrace(trace, vout, edge.from, combinedGraph.nodes.length - 1, weight, nodeDepth);
      if (nodes.length > 1) {
        setAdditional({
          nodes: additional.nodes.concat(nodes.filter(node => node.id !== exploreLeaf)),
          edges: additional.edges.concat(edges.filter(edge => edge.to !== exploreLeaf)),
        });
      }
      setExploreLeaf(undefined);
    }
  }, [exploreLeaf]);

  const events: Events = {
    click: (event: Event): void => {
      if (selected !== undefined && !event.nodes) setSelected(undefined);
    },
    doubleClick: (event: Event): void => {
      if (event?.nodes?.length && isLeaf(event.nodes[0])) {
        setExploreLeaf(event.nodes[0]);
      }
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

  return (
    <>
      <PatternSection />
      <div className={cx("p-2 align-items-center", theme.bg, theme.text)} style={{ minHeight: "100vh" }}>
        <Alert visible={!!alert} message={alert} />

        <SearchSection action={handleKeyPress} title="Bitgodine Tracing" placeholder="Address" set={setSearch} />
        {status === "loading" ? (
          <Spinner
            style={{ width: "4rem", height: "4rem", left: "45%" }}
            className="noUi-value"
            type="grow"
            color="info"
          />
        ) : combinedGraph?.nodes?.length ?? false ? (
          <>
            <Paginate
              classes="mt-9"
              itemsPerPage={1}
              list={state.trace.occurences.map((txid: string, i: number) => (
                <Network
                  key={i}
                  title={"Starting from transaction " + combinedGraph.nodes[combinedGraph.nodes.length - 1].label}
                  graph={combinedGraph}
                  events={events}
                  setNetwork={setNetwork}
                  controls={
                    <InputGroup>
                      <InputGroupButtonDropdown
                        addonType="prepend"
                        isOpen={openDepth}
                        toggle={(): void => setOpenDepth(!openDepth)}>
                        <Input
                          placeholder={depth}
                          disabled
                          className={cx("border", theme.bg, theme.text)}
                          style={{ width: "3rem", borderRadius: 0 }}
                        />
                        <DropdownToggle split outline />
                        <DropdownMenu className={cx(theme.bg, theme.text)}>
                          <DropdownItem header>Depth</DropdownItem>
                          <DropdownItem divider />
                          {[10, 20, 50, 100, 200].map(d => (
                            <DropdownItem key={d} className={cx(theme.text)} onClick={(): void => setDepth(`${d}`)}>
                              {d}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </InputGroupButtonDropdown>
                    </InputGroup>
                  }
                  style={{}}
                />
              ))}
              index={page}
              setIndex={setPage}
            />
            {hovered !== undefined ? (
              <TraceCard trace={state?.trace?.traces[page % limit][nodesMap[hovered]]} />
            ) : selected !== undefined ? (
              <TraceCard trace={state?.trace?.traces[page % limit][nodesMap[selected]]} />
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
