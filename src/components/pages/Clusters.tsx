import Network, { Graph, Node, Edge } from "components/Graph";
import SearchBar from "components/SearchBar";
import { background } from "constants/colors";
import React, { useState, useEffect, useMemo } from "react";
import { Col, Container, Row, Spinner, UncontrolledAlert } from "reactstrap";
import useFetch from "use-http";
import { endpoint } from "constants/config";
import SearchSection from "components/SearchSection";
import PatternSection from "components/layout/PatternSection";

interface Trace {
  txid: string;
  receiver: string;
  vout: number;
  amount: number;
  next: string;
}

const Clusters: React.FC = () => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [url, setUrl] = useState(endpoint);
  const [responseData, setResponseData] = useState<any>({});
  const [request, response] = useFetch(url);

  const handleKeyPress = async (event: React.KeyboardEvent<Element>): Promise<void> => {
    if (event.key === "Enter" && address) {
      const resp = await request.get();
      if (resp) {
        setResponseData(resp);
      } else {
        console.log("request", request);
        console.log("response", response);
        setError(request?.error?.message);
      }
    }
  };

  useEffect(() => {
    setUrl(endpoint.concat("clusters/address/" + address));
  }, [address]);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 10000);
  }, [error]);

  const data = useMemo((): Graph => {
    const graph: Graph = { nodes: [], edges: [] };
    if (responseData && (responseData?.traces ?? false)) {
      const traces: Trace[] = [];
      for (const t of Object.keys(responseData.traces)) {
        let found = false;
        for (const c of Object.keys(responseData.traces)) {
          if (responseData.traces[c].next == t) {
            found = true;
          }
        }
        if (!found) {
          traces.push(responseData.traces[t]);
        }
      }

      if (traces.length > 1) {
        for (let t of traces) {
          const flows: Trace[] = [t];
          while (true) {
            if (responseData.traces[t.next]) {
              flows.push(responseData.traces[t.next]);
              t = responseData.traces[t.next];
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
              };
              graph.edges.push(edge);
            }
          });
        }
        return graph;
      } else {
        if (!traces.length) {
          setError("Empty Flow");
          return graph;
        }
        let t = traces[0];
        while (true) {
          if (responseData.traces[t.next]) {
            if (t.next == "?") {
              console.log("WTF MAN", t, t.txid, t.receiver);
            }
            traces.push(responseData.traces[t.next]);
            t = responseData.traces[t.next];
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
            };
            graph.edges.push(edge);
          }
        });

        return graph;
      }
    }
    return graph;
  }, [responseData]);

  return (
    <>
      <PatternSection />
      <div className="p-2 align-items-center" style={{ background, padding: "2%", minHeight: "100vh" }}>
        {error && (
          <UncontrolledAlert
            color="danger"
            className="align-items-center"
            style={{
              position: "absolute",
              width: "90%",
              bottom: 0,
              zIndex: 1200,
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",
            }}>
            {error}
          </UncontrolledAlert>
        )}

        <SearchSection action={handleKeyPress} title="Bitgodine Clustering" placeholder="Address" set={setAddress} />
        {request.loading ? (
          <Spinner
            style={{ width: "4rem", height: "4rem", left: "45%" }}
            className="noUi-value"
            type="grow"
            color="info"
          />
        ) : data?.nodes?.length ?? false ? (
          <Network graph={data} />
        ) : (
          false
        )}
      </div>
    </>
  );
};

export default Clusters;
