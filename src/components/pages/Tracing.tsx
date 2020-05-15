import Network, { Edge, Graph, Node } from "components/Graph";
import SearchSection from "components/SearchSection";
import Alert from "components/styled/Alert";
import { background } from "constants/colors";
import { endpoint } from "constants/config";
import { Store } from "context";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { Spinner } from "reactstrap";

interface Trace {
  txid: string;
  receiver: string;
  vout: number;
  amount: number;
  next: string;
  weight?: number;
}

const fetchSearch = async (url: string): Promise<Response> => {
  return await fetch(url);
};

const App: React.FC = () => {
  const [address, setAddress] = useState("");
  const [alert, setAlert] = useState("");
  const [prev, setPrev] = useState("");
  const { state, dispatch } = useContext(Store);
  const [mutate, { status, data, error }] = useMutation(fetchSearch);

  const handleKeyPress = async (event: React.KeyboardEvent<Element>): Promise<void> => {
    if (event.key === "Enter" && address) {
      try {
        if (prev != address) {
          if (state.trace) {
            dispatch({
              type: "RESET_TRACE",
            });
          }
          await mutate(endpoint.concat("trace/address/" + address));
          setPrev(address);
        }
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  };

  useEffect(() => {
    (async (): Promise<void> => {
      if (data && status == "success") {
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

  const graph = useMemo((): Graph => {
    const graph: Graph = { nodes: [], edges: [] };
    if (state.trace && (state.trace?.traces ?? false)) {
      const traces: Trace[] = [];
      for (const t of Object.keys(state.trace.traces)) {
        let found = false;
        for (const c of Object.keys(state.trace.traces)) {
          if (state.trace.traces[c].next == t) {
            found = true;
          }
        }
        if (!found) {
          traces.push(state.trace.traces[t]);
        }
      }

      if (traces.length > 1) {
        for (let t of traces) {
          const flows: Trace[] = [t];
          while (true) {
            if (state.trace.traces[t.next]) {
              flows.push(state.trace.traces[t.next]);
              t = state.trace.traces[t.next];
            } else {
              break;
            }
          }

          flows.forEach((f: Trace, i: number) => {
            const node: Node = {
              id: i,
              label: f.txid,
              title: JSON.stringify(f),
            };
            graph.nodes.push(node);
            if (i > 0) {
              const edge: Edge = {
                from: i - 1,
                to: i,
                label: JSON.stringify(f.weight),
              };
              graph.edges.push(edge);
            }
          });
        }
        return graph;
      } else {
        if (!traces.length) {
          setAlert("Empty Flow");
          return graph;
        }
        let t = traces[0];
        while (true) {
          if (state.trace.traces[t.next]) {
            if (t.next == "?") {
            }
            traces.push(state.trace.traces[t.next]);
            t = state.trace.traces[t.next];
          } else {
            break;
          }
        }

        traces.forEach((f: Trace, i: number) => {
          const node: Node = {
            id: i,
            label: f.txid,
            title: JSON.stringify(f),
          };
          graph.nodes.push(node);
          if (i > 0) {
            const edge: Edge = {
              from: i - 1,
              to: i,
              label: JSON.stringify(f.weight),
            };
            graph.edges.push(edge);
          }
        });

        return graph;
      }
    }
    return graph;
  }, [state.trace]);

  return (
    <div className="p-2 align-items-center" style={{ background, padding: "2%", minHeight: "100vh" }}>
      <Alert visible={!!alert} message={alert} />

      <SearchSection action={handleKeyPress} title="Bitgodine Tracing" placeholder="Address" set={setAddress} />
      {status == "loading" ? (
        <Spinner
          style={{ width: "4rem", height: "4rem", left: "45%" }}
          className="noUi-value"
          type="grow"
          color="info"
        />
      ) : graph?.nodes?.length ?? false ? (
        <Network graph={graph} style={{ marginTop: "1rem" }} />
      ) : (
        false
      )}
    </div>
  );
};

export default App;
