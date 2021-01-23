/** @jsx jsx */
import React from "react"
import { jsx, Link as TLink } from "theme-ui"
import { Link } from "gatsby"

import replaceSlashes from "../utils/replaceSlashes"

const Navigation = ({ nav }) => {
  const basePath = `/`
  return (
    <React.Fragment>
      {nav && nav.length > 0 && (
        <nav
          sx={{
            mr: [1, 2, 2],
            "a:not(:first-of-type)": { ml: [2, 3] },
            fontSize: [1, 2, 2],
            ".active": { color: `heading` },
          }}
        >
          {nav.map(item => (
            <TLink
              key={item.slug}
              as={Link}
              activeClassName="active"
              to={replaceSlashes(`/${basePath}/${item.slug}`)}
            >
              {item.title}
            </TLink>
          ))}
        </nav>
      )}
    </React.Fragment>
  )
}

export default Navigation
