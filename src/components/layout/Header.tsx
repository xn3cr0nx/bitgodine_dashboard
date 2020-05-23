// import Headroom from "headroom.js";
import cx from "classnames";
import { Theme } from "context";
import React, { useContext, useState } from "react";
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
  const { theme } = useContext(Theme);
  const [collapseClasses, setCollapseClasses] = useState("");

  const onExiting = (): void => {
    setCollapseClasses("collapsing-out");
  };

  const onExited = (): void => {
    setCollapseClasses("");
  };

  const styles = {
    drowpdownTitle: cx("heading text-primary mb-md-1", theme.text),
  };

  // useEffect(() => {
  //   const headroom = new Headroom(document.getElementById("navbar"));
  //   headroom.init();
  // }, []);

  {
    /*<header>*/
  }
  return (
    <Navbar className={cx("w-100 navbar-horizontal navbar-dark", theme.bg, theme.text)} expand="lg" id="navbar">
      <Container>
        <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
          <img alt="bitgodine" src={require("assets/img/brand/bitgodine_finder.png")} className="mr-2" />
          <span className={cx("text-uppercase", theme.text)}>bitgodine</span>
        </NavbarBrand>
        <button
          className="navbar-toggler"
          // id="navbar-default"
          id="navbar_global">
          <span className={cx("navbar-toggler-icon", theme.text)} />
        </button>
        <UncontrolledCollapse
          toggler="#navbar_global"
          navbar
          className={cx(collapseClasses, theme.text)}
          onExiting={onExiting}
          onExited={onExited}>
          <div className={cx("navbar-collapse-header", theme.text)}>
            <Row>
              <Col className="collapse-brand" xs="6">
                <NavbarBrand className="mr-lg-5 text-default" to="/" tag={Link}>
                  <img alt="..." src={require("assets/img/brand/bitgodine_finder.png")} className="mr-2" />
                  <span className={cx("text-uppercase", theme.text)}>bitgodine</span>
                </NavbarBrand>
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
                <span className={cx("nav-link-inner--text", theme.text)}>Services</span>
              </DropdownToggle>
              <DropdownMenu className={cx("dropdown-menu-xl", theme.bg, theme.text)}>
                <div className="dropdown-menu-inner">
                  <Link className={cx("font-weight-normal pr-2", theme.text)} to="/">
                    <Media className="d-flex align-items-center">
                      <div className="icon icon-shape bg-gradient-indigo rounded-circle text-white">
                        <i className="ni ni-map-big" />
                      </div>
                      <Media body className="ml-3">
                        <h6 className={styles.drowpdownTitle}>Explorer</h6>
                        <p className="description d-none d-md-inline-block mb-0">Bitcoin blockchain explorer</p>
                      </Media>
                    </Media>
                  </Link>
                  <Link className={cx("font-weight-normal pr-2", theme.text)} to="/tracing">
                    <Media className="d-flex align-items-center">
                      <div className="icon icon-shape bg-gradient-default rounded-circle text-white">
                        <i className="ni ni-vector" />
                      </div>
                      <Media body className="ml-3">
                        <h6 className={styles.drowpdownTitle}>Tracing</h6>
                        <p className="description d-none d-md-inline-block mb-0">
                          Bitcoin flow tracing visualization tool
                        </p>
                      </Media>
                    </Media>
                  </Link>
                  <Link className={cx("font-weight-normal pr-2", theme.text)} to="/clusters">
                    <Media className="d-flex align-items-center">
                      <div className="icon icon-shape bg-gradient-info rounded-circle text-white">
                        <i className="ni ni-planet" />
                      </div>
                      <Media body className="ml-3">
                        <h6 className={styles.drowpdownTitle}>Clustering</h6>
                        <p className="description d-none d-md-inline-block mb-0">
                          Bitcoin addresses clustering visualization tool
                        </p>
                      </Media>
                    </Media>
                  </Link>
                  <Link className={cx("font-weight-normal", theme.text)} to="/test">
                    <Media className="d-flex align-items-center">
                      <div className="icon icon-shape bg-gradient-danger rounded-circle text-white">
                        <i className="ni ni-tag" />
                      </div>
                      <Media body className="ml-3">
                        <h5 className={styles.drowpdownTitle}>Abuses</h5>
                        <p className="description d-none d-md-inline-block mb-0">
                          Search for tagged addresses and reported abuses
                        </p>
                      </Media>
                    </Media>
                  </Link>
                </div>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <i className="ni ni-collection d-lg-none mr-1" />
                <span className={cx("nav-link-inner--text", theme.text)}>Examples</span>
              </DropdownToggle>
              <DropdownMenu className={cx(theme.bg, theme.text)}>
                <DropdownItem
                  className={cx(theme.text, theme.bg.replace("bg-gradient", "hover"))}
                  to="/theme"
                  tag={Link}>
                  Theme
                </DropdownItem>
                <DropdownItem
                  className={cx(theme.text, theme.bg.replace("bg-gradient", "hover"))}
                  to="/profile"
                  tag={Link}>
                  Profile
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
                <i className={cx("fa fa-github", theme.text)} />
                <span className="nav-link-inner--text d-lg-none ml-2">Github</span>
              </NavLink>
              <UncontrolledTooltip delay={0} target="tooltip112445449">
                Star us on Github
              </UncontrolledTooltip>
            </NavItem>
            <NavItem>
              <NavLink
                className="nav-link-icon"
                href="https://twitter.com/xn3cr0nx"
                id="tooltip184698705"
                target="_blank">
                <i className={cx("fa fa-twitter-square", theme.text)} />
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
                <i className={cx("fa fa-facebook-square", theme.text)} />
                <span className="nav-link-inner--text d-lg-none ml-2">Facebook</span>
              </NavLink>
              <UncontrolledTooltip delay={0} target="tooltip333589074">
                Like us on Facebook
              </UncontrolledTooltip>
            </NavItem>
            <NavItem className="d-none d-lg-block ml-lg-4">
              <Link to="/login">
                <Button className={cx("btn-outline-secondary btn-icon", theme.bg, theme.text)} color="default">
                  <span className="btn-inner--icon">
                    <i className="fa fa-user mr-2" />
                  </span>
                  <span className="nav-link-inner--text ml-1">Login</span>
                </Button>
              </Link>
            </NavItem>
          </Nav>
        </UncontrolledCollapse>
      </Container>
    </Navbar>
  );
};

export default Header;
