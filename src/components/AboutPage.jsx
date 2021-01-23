/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"

import SkillBars from "./SkillBars"
import { useScrollFadeIn } from "./useScrollEvent"
import InterestedSkills from "./InterestedSkills"

const AboutPage = () => {
  const animatedInterested = useScrollFadeIn('up', 0.5, 0, 0.3);
  const animatedSkillbars = useScrollFadeIn('upt', 0.5, 0, 0.2);
  return (
    <>
      <div sx={{ mt: [6] }} {...animatedSkillbars}>
        <SkillBars />
      </div>
      <div sx={{ mt: [2,2,4], mb: [6] }} {...animatedInterested}>
        <InterestedSkills />
      </div>
    </>
  )
}

export default AboutPage