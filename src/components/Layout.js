/** @jsx jsx */
import React from "react"
import { Global } from "@emotion/core"
import { jsx, Container, useColorMode } from "theme-ui"

import Header from "./Header"
import Footer from "./Footer"
import ColorModeToggle from "./ColorModeToggle"

const Layout = ({ children }) => {
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const toggleColorMode = e => {
    e.preventDefault()
    setColorMode(isDark ? `light` : `dark`)
  }
  return (
    <React.Fragment>
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
      <Container>{children}</Container>
      <Footer />
      <ColorModeToggle isDark={isDark} toggle={toggleColorMode} />
    </React.Fragment>
  )
}

export default Layout
