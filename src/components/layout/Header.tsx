import Headroom from "headroom.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row,
  UncontrolledCollapse,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";

const Header: React.FC = () => {
  const [collapseClasses, setCollapseClasses] = useState("");

  const onExiting = (): void => {
    setCollapseClasses("collapsing-out");
  };

  const onExited = (): void => {
    setCollapseClasses("");
  };

  useEffect(() => {
    const headroom = new Headroom(document.getElementById("navbar"));
    headroom.init();
  }, []);

  return (
    <header>
      <Navbar className="navbar-dark navbar-transparent bg-default headroom" expand="lg" id="navbar">
        <Container>
          <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
            <img alt="bitgodine" src={require("assets/img/brand/bitgodine_finder.png")} /> bitgodine
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-default">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse
            toggler="#navbar_global"
            navbar
            className={collapseClasses}
            onExiting={onExiting}
            onExited={onExited}>
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img alt="..." src={require("assets/img/brand/argon-react.png")} />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar_global">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="navbar-nav-hover align-items-lg-center" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle nav>
                  <i className="ni ni-ui-04 d-lg-none mr-1" />
                  <span className="nav-link-inner--text">Services</span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-xl">
                  <div className="dropdown-menu-inner">
                    <Media className="d-flex align-items-center" href="/tracing">
                      <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                        <i className="ni ni-vector" />
                      </div>
                      <Media body className="ml-3">
                        <h6 className="heading text-primary mb-md-1">Tracing</h6>
                        <p className="description d-none d-md-inline-block mb-0">
                          Bitcoin flow tracing visualization tool
                        </p>
                      </Media>
                    </Media>
                    <Media className="d-flex align-items-center" href="/clusters">
                      <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                        <i className="ni ni-planet" />
                      </div>
                      <Media body className="ml-3">
                        <h6 className="heading text-primary mb-md-1">Clustering</h6>
                        <p className="description d-none d-md-inline-block mb-0">
                          Bitcoin addresses clustering visualization tool
                        </p>
                      </Media>
                    </Media>
                    <Media className="d-flex align-items-center" href="/test">
                      <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                        <i className="ni ni-tag" />
                      </div>
                      <Media body className="ml-3">
                        <h5 className="heading text-warning mb-md-1">Abuses</h5>
                        <p className="description d-none d-md-inline-block mb-0">
                          Search for tagged addresses and reported abuses
                        </p>
                      </Media>
                    </Media>
                  </div>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle nav>
                  <i className="ni ni-collection d-lg-none mr-1" />
                  <span className="nav-link-inner--text">Examples</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/landing-page" tag={Link}>
                    Landing
                  </DropdownItem>
                  <DropdownItem to="/profile-page" tag={Link}>
                    Profile
                  </DropdownItem>
                  <DropdownItem to="/login-page" tag={Link}>
                    Login
                  </DropdownItem>
                  <DropdownItem to="/register-page" tag={Link}>
                    Register
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <Nav className="align-items-lg-center ml-lg-auto" navbar>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://github.com/xn3cr0nx/bitgodine"
                  id="tooltip112445449"
                  target="_blank">
                  <i className="fa fa-github" />
                  <span className="nav-link-inner--text d-lg-none ml-2">Github</span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip112445449">
                  Star us on Github
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://twitter.com/creativetim"
                  id="tooltip184698705"
                  target="_blank">
                  <i className="fa fa-twitter-square" />
                  <span className="nav-link-inner--text d-lg-none ml-2">Twitter</span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip184698705">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  href="https://www.facebook.com/creativetim"
                  id="tooltip333589074"
                  target="_blank">
                  <i className="fa fa-facebook-square" />
                  <span className="nav-link-inner--text d-lg-none ml-2">Facebook</span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip333589074">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem className="d-none d-lg-block ml-lg-4">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-navbar"
                  target="_blank">
                  <span className="btn-inner--icon">
                    <i className="fa fa-user mr-2" />
                  </span>
                  <span className="nav-link-inner--text ml-1">Login</span>
                </Button>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
