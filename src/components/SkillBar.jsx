/** @jsx jsx */
import { jsx, Image, Flex } from "theme-ui"

import "./SkillBar.css"
import { useScrollFillbar } from "./useScrollEvent"

const SkillBar = (props) => {

  const { level, color, name, imageUrl } = props
  const animatedBar = useScrollFillbar(1, Math.random() * 0.3, level);

  return (
  <Flex sx={{ alignItems: `center`, mb: [2, 2, 3], height: `3rem` }}>
    <Image src={`images/logo/${imageUrl}`} sx={{display: `block`, width: [`2rem`], mr: 2}} />
    <div className="bar" sx={{ fontSize: [2, 2, 3], bg: `divide`, position:`relative`}}>
      <div sx={{height: `100%`, bg: color}} {...animatedBar}>
        <div sx={{position: `absolute`, color: `#fff`, bottom: 0, fontSize: `1.5rem`, left: `0.8rem`}}>{`${name} ${level}`}</div>
      </div>
    </div>
  </Flex>
  );
}

export default SkillBar;