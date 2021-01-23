/** @jsx jsx */
import React from "react"
import { jsx, Link as TLink, Box } from "theme-ui"
import { Link } from "gatsby"
import replaceSlashes from "../utils/replaceSlashes"

const ItemTags = ({ tags }) => {
  const basePath = `/`;
  const tagsPath = `tags/`;

  return (
    <Box sx={{ display: `inline-block`, my:[1,1,2] }}>
      {tags.map((tag, i) => (
        <React.Fragment key={tag}>
          {!!i && ` `}
          <TLink sx={{ fontSize: [1], bg: `footer`, color: `text`, py:[1], px:[2], borderRadius: `0.5rem` }} as={Link} to={replaceSlashes(`/${basePath}/${tagsPath}/${tag}`)}>
            {tag}
          </TLink>
        </React.Fragment>
      ))}
    </Box>
  )
}

export default ItemTags
