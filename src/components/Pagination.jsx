/** @jsx jsx */
import { jsx, Flex, Link as TLink } from "theme-ui";
import { Link } from "gatsby";

export default ({ currentPage, numPages, base }) => (
  <Flex
    as="ul"
    sx={{
      width: `100%`,
      justifyContent: `space-around`,
      mt: [4, 4, 6],
      mb: [4, 4, 5],
      flexWrap: `wrap`,
      justifyContent: `center`,
      alignItems: `center`,
      listStyle: `none`,
      padding: 0,
    }}
  >
    {currentPage > 1 ? (
      <TLink
        as={Link}
        to={currentPage === 2 ? `/blog/` : `/blog/${currentPage - 1}`}
        rel="prev"
        sx={{
          marginTop: `0.1rem`,
          marginBottom: `0.1rem`,
          padding: `0.5rem`,
          color: `text`,
        }}
      >
        {`< Prev`}
      </TLink>
    ) : (
      <span
        sx={{
          pointerEvents: `none`,
          color: `background`,
          marginTop: `0.1rem`,
          marginBottom: `0.1rem`,
          padding: `0.5rem`,
        }}
      >
        {`< Prev`}
      </span>
    )}
    {Array.from({ length: numPages }, (_, i) => (
      <li
        key={`pagination-number${i + 1}`}
        sx={{
          margin: 0,
        }}
      >
        <TLink
          as={Link}
          to={`/blog/${i === 0 ? `` : i + 1}`}
          sx={{
            marginTop: `0.1rem`,
            marginBottom: `0.1rem`,
            padding: `0.5rem`,
            textDecoration: `none`,
            color: i + 1 === currentPage ? `#ffffff` : `text`,
            bg: i + 1 === currentPage ? `point` : ``,
          }}
        >
          {i + 1}
        </TLink>
      </li>
    ))}
    {!(currentPage === numPages) ? (
      <TLink
        as={Link}
        to={`/blog/${currentPage + 1}`}
        rel="next"
        sx={{
          marginTop: `0.1rem`,
          marginBottom: `0.1rem`,
          padding: `0.5rem`,
          color: `text`,
        }}
      >
        {`Next >`}
      </TLink>
    ) : (
      <span
        sx={{
          pointerEvents: `none`,
          color: `background`,
          marginTop: `0.1rem`,
          marginBottom: `0.1rem`,
          padding: `0.5rem`,
        }}
      >
        {`Next >`}
      </span>
    )}
  </Flex>
);
