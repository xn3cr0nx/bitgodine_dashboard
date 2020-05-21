import React, { useContext } from "react";
import cx from "classnames";
import { Theme as T } from "context";
import { Themes } from "context/theme";
import { Container, Card, CardHeader, CardBody } from "reactstrap";
import ThemeButton from "components/styled/ThemeButton";

const Theme: React.FC = () => {
  const { theme, dispatch } = useContext(T);

  const changeTheme = (t: Themes): void => {
    dispatch({ type: "THEME", payload: t });
  };

  return (
    <Container className="p-3">
      <Card>
        <CardHeader className={cx("h2 text-white", theme)}>Theme</CardHeader>
        <CardBody
          className="p-2 align-items-center"
          style={{
            display: "grid",
            gridGap: "5px",
            gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
            gridAutoRows: "1fr",
          }}>
          {Object.keys(Themes).map(t => {
            return (
              <ThemeButton key={t} onClick={(): void => changeTheme((Themes as any)[t])} theme={(Themes as any)[t]} />
            );
          })}
        </CardBody>
      </Card>
    </Container>
  );
};

export default Theme;
