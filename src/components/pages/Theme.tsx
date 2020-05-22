import React, { useContext } from "react";
import cx from "classnames";
import { Theme as T } from "context";
import { Background } from "context/theme";
import { Container, Card, CardHeader, CardBody } from "reactstrap";
import ThemeButton from "components/styled/ThemeButton";
import { writeStorage } from "@rehooks/local-storage";

const Theme: React.FC = () => {
  const { theme, dispatch } = useContext(T);

  const changeTheme = (t: Background): void => {
    dispatch({ type: "THEME", payload: t });
    writeStorage("theme", t);
  };

  return (
    <div className={cx(theme.bg)}>
      <Container className="p-3">
        <Card>
          <CardHeader className={cx("h2", theme.bg, theme.text)}>Theme</CardHeader>
          <CardBody
            className="p-2 align-items-center"
            style={{
              display: "grid",
              gridGap: "5px",
              gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
              gridAutoRows: "1fr",
            }}>
            {Object.keys(Background).map(t => {
              return (
                <ThemeButton
                  key={t}
                  onClick={(): void => changeTheme((Background as any)[t])}
                  theme={(Background as any)[t]}
                />
              );
            })}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Theme;
