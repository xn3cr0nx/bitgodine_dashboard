import SearchSection from "components/SearchSection";
import { main } from "constants/colors";
import { endpoint } from "constants/config";
import { Store } from "context";
import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Spinner, UncontrolledAlert } from "reactstrap";

const fetchSearch = async (url: string): Promise<Response> => {
  return await fetch(url);
};

const App: React.FC = () => {
  const [address, setAddress] = useState("");
  const [alert, setAlert] = useState("");
  const [url, setUrl] = useState(endpoint);
  const { state, dispatch } = useContext(Store);
  const [mutate, { status, data, error }] = useMutation(fetchSearch);

  const handleKeyPress = async (event: React.KeyboardEvent<Element>): Promise<void> => {
    if (event.key === "Enter" && address) {
      try {
        await mutate(url);
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  };

  useEffect(() => {
    (async (): Promise<void> => {
      if (data && status == "success") {
        const payload = await data.json();
        dispatch({
          type: "PAYLOAD",
          payload,
        });
      }
    })();
  }, [data]);

  useEffect(() => {
    console.log("SOMETHING CHANGED", data, status, error);
  }, [data, status, error]);

  useEffect(() => {
    setUrl(endpoint.concat("trace/address/" + address));
  }, [address]);

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
      {alert && (
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
          {alert}
        </UncontrolledAlert>
      )}

      <SearchSection action={handleKeyPress} placeholder="Block height, hash, transaction, address" set={setAddress} />
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
