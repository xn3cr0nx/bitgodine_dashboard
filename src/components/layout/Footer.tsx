/*eslint-disable*/
import React from "react";
import { Button, Col, Container, Nav, NavItem, NavLink, Row, UncontrolledTooltip } from "reactstrap";

// style={{ position: "fixed", left: 0, bottom: 0, width: "100%", textAlign: "center" }}>
const CardsFooter: React.FC = () => {
  return (
    <footer className="footer has-cards">
      <Container>
        <Row className="row-grid align-items-center my-md">
          <Col lg="6">
            <h3 className="text-primary font-weight-light mb-2">Support us!</h3>
            <h4 className="mb-0 font-weight-light">Donate to keep open source development ongoing</h4>
            <Row xs="4">
              <Col xs="1">
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="warning"
                  href="https://github.com/xn3cr0nx/bitgodine"
                  id="tooltip495507258"
                  target="_blank">
                  <span className="btn-inner--icon">
                    <i className="fa fa-bitcoin" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip495507258">
                  Donate us!
                </UncontrolledTooltip>
              </Col>
              <Col xs="1" style={{ marginLeft: "0.8rem", marginTop: "0.5rem" }}>
                <h6 className="mb-0 font-weight-light">3D4U5ckd9SXNTBHB5wRERTuriu7choM24E</h6>
              </Col>
            </Row>
          </Col>
          <Col className="text-lg-center btn-wrapper" lg="6">
            <Button
              className="btn-icon-only rounded-circle ml-1"
              color="github"
              href="https://github.com/xn3cr0nx/bitgodine"
              id="tooltip495507257"
              target="_blank">
              <span className="btn-inner--icon">
                <i className="fa fa-github" />
              </span>
            </Button>
            <UncontrolledTooltip delay={0} target="tooltip495507257">
              Star on Github
            </UncontrolledTooltip>
            <Button
              className="btn-icon-only rounded-circle"
              color="twitter"
              href="https://twitter.com/creativetim"
              id="tooltip475038074"
              target="_blank">
              <span className="btn-inner--icon">
                <i className="fa fa-twitter" />
              </span>
            </Button>
            <UncontrolledTooltip delay={0} target="tooltip475038074">
              Follow us
            </UncontrolledTooltip>
            <Button
              className="btn-icon-only rounded-circle ml-1"
              color="facebook"
              href="https://www.facebook.com/creativetim"
              id="tooltip837440414"
              target="_blank">
              <span className="btn-inner--icon">
                <i className="fa fa-facebook-square" />
              </span>
            </Button>
            <UncontrolledTooltip delay={0} target="tooltip837440414">
              Like us
            </UncontrolledTooltip>
          </Col>
        </Row>
        <hr />
        <Row className="align-items-center justify-content-md-between">
          <Col md="6">
            <div className="copyright">
              © {new Date().getFullYear()}{" "}
              <a href="https://www.bitgodine.com" target="_blank">
                Bitgodine
              </a>
              .
            </div>
          </Col>
          <Col md="6">
            <Nav className="nav-footer justify-content-end">
              <NavItem>
                <NavLink href="https://www.bitgodine.com" target="_blank">
                  Bitgodine
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/aboutus" target="_blank">
                  About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="http://blog.bitgodine.com" target="_blank">
                  Blog
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://opensource.org/licenses/MIT" target="_blank">
                  MIT License
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default CardsFooter;
