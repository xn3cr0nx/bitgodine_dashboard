import React, { useEffect, useContext } from "react";
import cx from "classnames";
import { Button, Card, Container, Row, Col } from "reactstrap";
import PatternSection from "components/layout/PatternSection";
import { Theme } from "context";

const Profile: React.FC = () => {
  const { theme } = useContext(Theme);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="profile-page">
      <PatternSection height="50rem" />
      <section className="section section-shaped section-lg mt-5">
        <Container>
          <Card className={cx("card-profile shadow mt-0", theme.bg, theme.text)}>
            <div className="px-4">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img alt="..." className="rounded-circle" src={require("assets/img/theme/team-4-800x800.jpg")} />
                    </a>
                  </div>
                </Col>
                <Col className="order-lg-3 text-lg-right align-self-lg-center" lg="4">
                  <div className="card-profile-actions py-4 mt-lg-0">
                    <Button className="mr-4" color="info" href="#pablo" onClick={e => e.preventDefault()} size="sm">
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm">
                      Message
                    </Button>
                  </div>
                </Col>
                <Col className="order-lg-1" lg="4">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <div>
                      <span className="heading">22</span>
                      <span className="description">Friends</span>
                    </div>
                    <div>
                      <span className="heading">10</span>
                      <span className="description">Photos</span>
                    </div>
                    <div>
                      <span className="heading">89</span>
                      <span className="description">Comments</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className={cx("text-center mt-5", theme.text)}>
                <h3 className={cx(theme.text)}>
                  Jessica Jones <span className={cx("font-weight-light", theme.text)}>, 27</span>
                </h3>
                <div className={cx("h6 font-weight-300", theme.text)}>
                  <i className="ni location_pin mr-2" />
                  Bucharest, Romania
                </div>
                <div className={cx("h6 mt-4", theme.text)}>
                  <i className="ni business_briefcase-24 mr-2" />
                  Solution Manager - Creative Tim Officer
                </div>
                <div className={cx(theme.text)}>
                  <i className="ni education_hat mr-2" />
                  University of Computer Science
                </div>
              </div>
              <div className="mt-5 py-5 border-top text-center">
                <Row className="justify-content-center">
                  <Col lg="9">
                    <p>
                      An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick
                      Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a
                      solid groove structure. An artist of considerable range.
                    </p>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      Show more
                    </a>
                  </Col>
                </Row>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </main>
  );
};

export default Profile;
