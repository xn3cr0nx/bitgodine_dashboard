import SearchBar from "components/SearchBar";
import React from "react";
import { Col, Container, Row } from "reactstrap";

interface SearchProps {
  title?: string;
  placeholder?: string;
  set: (value: string) => void;
  action: (event: React.KeyboardEvent<Element>) => Promise<void>;
}

const SearchSection: React.FC<SearchProps> = ({ action, title, placeholder, set }) => {
  return (
    <Container onKeyPress={action} style={{ marginBottom: "2rem", backdropFilter: "blur(5px)" }}>
      <Row className="p-8 align-items-center">
        <Col sm="4">
          <img
            alt="logo"
            className="img-fluid rounded-circle shadow-lg"
            src={require("assets/img/brand/bitgodine_finder.png")}
            style={{ width: "6rem" }}
          />
        </Col>
        <Col sm="6">
          <h3 className="mb-0 font-weight-bold text-uppercase text-white">{title ?? "Bitgodine Explorer"}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <SearchBar placeholder={placeholder} set={set} />
        </Col>
      </Row>
      <div
        className="w-100 shadow-lg position-absolute"
        style={{
          height: "1px",
          left: 0,
          backgroundColor: "#adb5bd",
        }}
      />
    </Container>
  );
};

export default SearchSection;
