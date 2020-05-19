import SearchSection from "components/SearchSection";
import Alert from "components/styled/Alert";
import { background } from "constants/colors";
import { endpoint } from "constants/config";
import { Store } from "context";
import { verifyNumber } from "libs/componentUtils";
import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Spinner, Container, Row, Col } from "reactstrap";
import Block from "components/Block";
import Tx from "components/Tx";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useQueryParam, NumberParam, StringParam } from "use-query-params";

export enum Request {
  Block = "BLOCK",
  Tx = "TX",
  Address = "ADDRESS",
}

const fetchSearch = async (url: string): Promise<Response> => {
  return await fetch(url);
};

const App: React.FC = () => {
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState("");
  // const [url, setUrl] = useState(endpoint);
  const [requestType, setRequestType] = useState<Request>();
  const { state, dispatch } = useContext(Store);
  const [mutate, { status, data, error }] = useMutation(fetchSearch);

  const [tx, setTx] = useQueryParam("tx", StringParam);
  const [block, setBlock] = useQueryParam("block", StringParam);
  const [height, setHeight] = useQueryParam("height", NumberParam);
  const [address, setAddress] = useQueryParam("addr", StringParam);

  const handleKeyPress = async (event: React.KeyboardEvent<Element>): Promise<void> => {
    if (event.key === "Enter" && search) {
      try {
        if (verifyNumber(search)) {
          setRequestType(Request.Block);
          await mutate(endpoint + "block-height/" + search);
        } else if (search.startsWith("000000")) {
          setRequestType(Request.Block);
          await mutate(endpoint + "block/" + search);
        } else {
          setRequestType(Request.Tx);
          await mutate(endpoint + "tx/" + search);
        }
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (tx) {
      (async (): Promise<void> => {
        setRequestType(Request.Tx);
        await mutate(endpoint + "tx/" + tx);
        window.scrollTo(0, 0);
      })();
    }
  }, [tx]);

  useEffect(() => {
    if (block) {
      (async (): Promise<void> => {
        setRequestType(Request.Block);
        await mutate(endpoint + "block/" + block);
        window.scrollTo(0, 0);
      })();
    }
  }, [block]);

  useEffect(() => {
    if (height) {
      (async (): Promise<void> => {
        setRequestType(Request.Block);
        await mutate(endpoint + "block-height/" + height);
        window.scrollTo(0, 0);
      })();
    }
  }, [height]);

  useEffect(() => {
    if (address) {
      (async (): Promise<void> => {
        setRequestType(Request.Address);
        await mutate(endpoint + "address/" + address);
        window.scrollTo(0, 0);
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
          type: requestType,
          payload,
        });
      }
    })();
  }, [data]);

  useEffect(() => {
    console.log("SOMETHING CHANGED", data, status, error);
  }, [data, status, error]);

  useEffect(() => {
    if (error) {
      setAlert((error as any).message);
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  }, [error]);

  return (
    <div className="p-2 align-items-center" style={{ background, padding: "2%", minHeight: "100vh" }}>
      <Alert visible={!!alert} message={alert} />

      <SearchSection action={handleKeyPress} placeholder="Block height, hash, transaction, address" set={setSearch} />
      <Container>
        {status === "loading" ? (
          <Spinner
            style={{ width: "4rem", height: "4rem", left: "45%", marginTop: "2rem" }}
            className="noUi-value"
            type="grow"
            color="info"
          />
        ) : requestType === Request.Block && state.block ? (
          <>
            <Container dir="horizontal">
              <Row>
                <Col xs="11">
                  <p className="h2 text-white font-weight-bold">{`Block ${state.block.height}`}</p>
                </Col>
                <Col xs="1" className="pl-0">
                  <Pagination className="pagination pagination-lg" listClassName="pagination-lg">
                    <PaginationItem>
                      <PaginationLink
                        aria-label="Previous"
                        href="#pablo"
                        onClick={(e): void => {
                          e.preventDefault();
                        }}>
                        <i className="fa fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        aria-label="Next"
                        href="#pablo"
                        onClick={(e): void => {
                          e.preventDefault();
                          // setIndex(index + 1);
                        }}>
                        <i className="fa fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </Col>
              </Row>
            </Container>
            <Block block={state.block} txsList={true} />
          </>
        ) : requestType === Request.Tx && state.transaction ? (
          <>
            <p className="h2 text-white font-weight-bold">Transaction</p>
            <Tx tx={state.transaction} />
          </>
        ) : requestType === Request.Address && state.address ? (
          <Block block={state.block} />
        ) : (
          false
        )}
      </Container>
    </div>
  );
};

export default App;
