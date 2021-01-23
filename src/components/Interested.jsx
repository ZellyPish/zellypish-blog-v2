/** @jsx jsx */
import { jsx, Image, Link as TLink } from "theme-ui"

const Interested = (props) => {

  const { name, imageUrl, url } = props
  return (
  <TLink href={url} sx={{ml: [2,2,4]}}>
    <Image src={`images/logo/${imageUrl}`} sx={{display: `block`, height: [`3rem`], mr: 2, margin: `0 auto` }} />
    <div sx={{ fontSize: [2, 2, 3] }}>{name}</div>
  </TLink>
  );
}

export default Interested;