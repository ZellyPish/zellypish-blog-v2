/** @jsx jsx */
import React from "react"
import { jsx, Flex, Heading, Box, Image } from "theme-ui"

import SkillBar from "./SkillBar"

const SkillBars = () => {
  return (
    <>
      <Heading as="h3" variant="styles.h3">My Skill Set</Heading>
      <Flex sx={{ flexDirection: [`column`, `row`], justifyContent: `space-between`}}>
        <Box sx={{width: [`100%`, `45%`], minHeight: [`15vh`]}}>
          <Heading as="h4" variant="styles.h4" sx={{my: [2,2,4]}}>Language</Heading>
          <SkillBar level="advanced" color="#F0DB4F" name="JavaScript" imageUrl="javascript.svg" />
          <SkillBar level="expert" color="#e34c26" name="HTML" imageUrl="html-5.svg" />
          <SkillBar level="intermediate" color="#2965f1" name="CSS" imageUrl="css-3.svg" />
        </Box>
        <Box sx={{width: [`100%`, `45%`], minHeight: [`15vh`]}}>
          <Heading as="h4" variant="styles.h4" sx={{my: [2,2,4]}}>Library, Framework</Heading>
          <SkillBar level="advanced" color="#61DBFB" name="React" imageUrl="react.svg" />
          <SkillBar level="basic" color="#ff3c00" name="Svelte" imageUrl="svelte-icon.svg" />
          <SkillBar level="advanced" color="#663399" name="Gatsby" imageUrl="gatsby.svg" />
        </Box>
      </Flex>
      <div>
        <Heading as="h4" variant="styles.h4" sx={{my: [2,2,4]}}>etc.</Heading>
        <Image src="images/logo/redux.svg" sx={{width: [`2rem`], mr: 3}} />
        <Image src="images/logo/eslint.svg" sx={{width: [`2rem`], mr: 3}} />
        <Image src="images/logo/git-icon.svg" sx={{width: [`2rem`], mr: 3}} />
      </div>
      <div>
        <Heading as="h4" variant="styles.h4" sx={{my: [2,2,4]}}>learning.</Heading>
        <Image src="images/logo/typescript-icon.svg" sx={{width: [`2rem`], mr: 3}} />
        <Image src="images/logo/nextjs-icon.svg" sx={{width: [`2rem`], mr: 3}} />
      </div>
    </>
  )
}

export default SkillBars