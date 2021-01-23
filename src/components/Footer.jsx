/** @jsx jsx */
import { jsx, Link, Flex, Container, Image, Box } from "theme-ui"
import useSiteMetadata from "../hooks/use-site-metadata"
const Footer = () => {
  const { author } = useSiteMetadata()

  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        bg: `footer`,
        py: [2, 2, 3],
        color: `text`,
      }}
    >
      <Container sx={{ px: 0 }}>
        <Box sx={{ ml: 3 }}>
          <div
            sx={{
              verticalAlign: `middle`,
              fontSize: [3, 3, 4],
            }}
          >
            <Image
              src="/images/mimoticon.png"
              sx={{ width: 10, mr: [1, 1, 2] }}
            />
            Jongchan Kim
          </div>
          <div sx={{ fontSize: [2, 2, 3], mb: [1, 1, 2] }}>
            Seoul, Republic of Korea
          </div>
        </Box>
        <Flex
          sx={{
            flexDirection: `row`,
            alignItems: `center`,
            ml: 2,
            mb: [2, 2, 3],
          }}
        >
          <Link
            sx={{ width: 8, mx: [2, 3] }}
            aria-label="Link to the my GitHub repository"
            href="https://github.com/ZellyPish"
          >
            <Image sx={{ width: 8 }} src="/images/github-light.png" />
          </Link>
          <Link
            sx={{ width: 6, mx: [2, 3] }}
            aria-label="Email me"
            href="mailto:ehxhfl21@gmail.com"
          >
            <Image sx={{ width: 6 }} src="/images/email.svg" />
          </Link>
          <Link sx={{ width: 6, mx: [2, 3] }} aria-label="rss" href="/rss.xml">
            <Image sx={{ width: 6 }} src="/images/rss.svg" />
          </Link>
        </Flex>
        <Box variant="dividers.top" sx={{ textAlign: `center`, mb: [2, 2, 2] }}>
          &copy; {new Date().getFullYear()} by {author}. All rights reserved.
        </Box>
      </Container>
    </footer>
  )
}

export default Footer
