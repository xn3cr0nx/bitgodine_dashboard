import Network, { Edge, Graph, Node } from "components/Graph";
import SearchSection from "components/SearchSection";
import Alert from "components/styled/Alert";
import { background } from "constants/colors";
import { endpoint } from "constants/config";
import { Store } from "context";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { Spinner } from "reactstrap";

// interface Trace {
//   txid: string;
//   receiver: string;
//   vout: number;
//   amount: number;
//   next: string;
//   weight?: number;
// }
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

const fetchSearch = async (url: string): Promise<Response> => {
  return await fetch(url);
};

const App: React.FC = () => {
  const [address, setAddress] = useState("");
  const [alert, setAlert] = useState("");
  const [prev, setPrev] = useState("");
  const [physics, setPhysics] = useState(false);
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
      title: JSON.stringify(state.trace.traces[trace.txid]),
    };
    nodes.push(node);

    if (prev != undefined) {
      const edge: Edge = {
        from: prev,
        to: index,
        label: JSON.stringify(weight),
      };
      edges.push(edge);
    }

    let incr = 0;
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
    return { nodes, edges };
  };

  const graph = useMemo((): Graph => {
    const graph: Graph = { nodes: [], edges: [] };
    if (state.trace && (state.trace?.traces ?? false)) {
      const traces: Trace[] = [];
      for (const t of Object.keys(state.trace.traces)) {
        let found = false;
        for (const c of Object.keys(state.trace.traces)) {
          if (state.trace.traces[c]?.next.map((n: Next) => n.txid).includes(t)) {
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
        <>
          <label
            className="custom-toggle"
            style={{ position: "absolute", zIndex: 10, right: "2rem", marginTop: "2rem" }}>
            <input type="checkbox" onClick={(): void => setPhysics(!physics)} />
            <span className="custom-toggle-slider rounded-circle" />
            <span style={{ color: "white", position: "absolute", top: "2rem" }}>Physics</span>
          </label>
          <Network graph={graph} physics={physics} style={{ marginTop: "1rem" }} />
        </>
      ) : (
        false
      )}
    </div>
  );
};

export default App;
