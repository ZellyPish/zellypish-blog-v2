/** @jsx jsx */
import { jsx, Flex, Image, Box } from "theme-ui"
import Typewriter from "typewriter-effect"

import "./Visual.css"

const Visual = () => {
  return (
    <Flex
      sx={{
        flexDirection: [`column`, `column`, `row`],
        justifyContent: `space-between`,
        flexWrap: `wrap`,
        mb: `5vh`,
        position: `relative`,
      }}
    >
      <div className="top-line">
        <h1
          sx={{
            color: `text`,
            fontSize: [`3rem`, `3rem`, `4.5rem`],
            mt: [4, 4, 6],
            mb: [0, 0, `1.5rem`],
            lineHeight: `1em`,
          }}
        >
          Jongchan
          <span sx={{ color: `theme_color` }}> Kim</span>
        </h1>
        <Typewriter
          sx={{ lineHeight: `1.6em` }}
          options={{
            strings: [
              "The Web Developer.",
              "The Curious man.",
              `The Problem solver.`,
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <Box sx={{ width: [`100%`, `100%`, `40%`], float: `right` }}>
        <Image src="images/mainZepeto.png" />
      </Box>
      <Box
        sx={{ position: `absolute`, height: [`75vh`, `80vh`], width: `100%` }}
      >
        <Box
          className="guide"
          sx={{
            position: `absolute`,
            bottom: 0,
            left: `50%`,
            width: `20px`,
            height: `20px`,
            borderBottom: `1.5px solid`,
            borderBottomColor: `text`,
            borderLeft: `1.5px solid`,
            borderLeftColor: `text`,
          }}
        />
      </Box>
    </Flex>
  )
}

export default Visual
