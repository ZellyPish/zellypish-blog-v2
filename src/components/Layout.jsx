/** @jsx jsx */
import React from "react";
import { Global } from "@emotion/core";
import { jsx, Container, useColorMode } from "theme-ui";

import Header from "./Header";
import Footer from "./Footer";
import ColorModeToggle from "./ColorModeToggle";
import { useScrollFadeIn } from "./useScrollEvent";

export const UserColorMode = React.createContext("dark");

const Layout = ({ children }) => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const toggleColorMode = e => {
    e.preventDefault();
    setColorMode(isDark ? `light` : `dark`);
  };

  const animatedPage = useScrollFadeIn("ups", 0.5, 0, 0.01);

  return (
    <UserColorMode.Provider value={colorMode}>
      <Global
        styles={theme => ({
          "*": {
            boxSizing: `inherit`,
          },
          html: {
            WebkitTextSizeAdjust: `100%`,
          },
          img: {
            borderStyle: `none`,
          },
          pre: {
            fontFamily: `monospace`,
            fontSize: `1em`,
          },
          "[hidden]": {
            display: `none`,
          },
          "::selection": {
            backgroundColor: theme.colors.text,
            color: theme.colors.background,
          },
          a: {
            transition: `all 0.3s ease-in-out`,
            color: `text`,
          },
          "#gatsby-focus-wrapper": {
            height: `100%`,
          },
        })}
      />
      <Header />
      <Container>
        <div {...animatedPage}>{children}</div>
      </Container>
      <Footer />
      <ColorModeToggle isDark={isDark} toggle={toggleColorMode} />
    </UserColorMode.Provider>
  );
};

export default Layout;
