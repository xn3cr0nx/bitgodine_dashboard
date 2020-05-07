import SearchSection from "components/SearchSection";
import Alert from "components/styled/Alert";
import { main } from "constants/colors";
import { endpoint } from "constants/config";
import { Store } from "context";
import { verifyNumber } from "libs/componentUtils";
import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Spinner } from "reactstrap";

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

  const handleKeyPress = async (event: React.KeyboardEvent<Element>): Promise<void> => {
    if (event.key === "Enter" && search) {
      try {
        if (verifyNumber(search)) {
          setRequestType(Request.Block);
          await mutate(endpoint + "blocks/" + search);
        } else if (search.startsWith("000000")) {
          setRequestType(Request.Block);
          await mutate(endpoint + "blocks/" + search);
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
          type: requestType,
          payload,
        });
      }
    })();
  }, [data]);

  useEffect(() => {
    console.log("SOMETHING CHANGED", data, status, error);
  }, [data, status, error]);

  // useEffect(() => {
  //   setUrl(endpoint.concat("trace/address/" + search));
  // }, [search]);

  useEffect(() => {
    if (error) {
      setAlert((error as any).message);
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  }, [error]);

  return (
    <div className="p-2 align-items-center" style={{ background: main, padding: "2%", minHeight: "100vh" }}>
      <Alert visible={!!alert} message={alert} />

      <SearchSection action={handleKeyPress} placeholder="Block height, hash, transaction, address" set={setSearch} />
      {status == "loading" ? (
        <Spinner
          style={{ width: "4rem", height: "4rem", left: "45%" }}
          className="noUi-value"
          type="grow"
          color="info"
        />
      ) : (
        false
      )}
    </div>
  );
};

export default App;
