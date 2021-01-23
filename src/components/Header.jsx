/** @jsx jsx */
import { jsx, Container, Flex } from "theme-ui"
import HeaderTitle from "./HeaderTitle"
import Navigation from "./Navigation"

const Header = () => {
  const nav = [
    { title: `Blog`, slug: `/blog` },
    { title: `Projects`, slug: `/projects` },
    { title: `About`, slug: `/about` },
  ]
  return (
    <header sx={{ px: [2, 3], py: [1, 2], mb: [3, 4], bg: `point` }}>
      <Container sx={{ px: 0 }}>
        <Flex
          sx={{
            position: `relative`,
            boxSizing: `border-box`,
            alignItems: `center`,
            justifyContent: `space-between`,
            color: `secondary`,
            a: {
              color: `#eae6fe`,
              fontWeight: 400,
              ":hover": { color: `heading` },
            },
            flexFlow: `wrap`,
          }}
        >
          <HeaderTitle />
          <Navigation nav={nav} />
          {/* <Flex
            sx={{
              justifyContent: `space-between`,
              alignItems: `center`,
              position: `relative`,
            }}
          ></Flex> */}
          {/* <Input
          sx={{
            bg: `#fefefe`,
            color: `#010101`,
            my: `0.1rem`,
            py: `0.3rem`,
            px: `0.5rem`,
            width: [`100%`, 300],
            borderColor: `primary`,
            borderRadius: `0.5rem`,
          }}
          type="text"
          id="docsearch"
          placeholder="Search.."
        /> */}
        </Flex>
      </Container>
    </header>
  )
}

export default Header
