/** @jsx jsx */
import { jsx, Flex, Box, Heading } from "theme-ui"
import Interested from "./Interested"

const InterestedSkills = () => (
  <Box>
    <Heading as="h4" variant="styles.h4">A little interested in</Heading>
    <Flex sx={{justifyContent:`space-around`, mt:[3,3,4]}}>
      <Interested name="Flutter" imageUrl="flutter.svg" url="https://flutter-ko.dev/" />
      <Interested name="GraphQL" imageUrl="graphql.svg" url="https://graphql.org/" />
    </Flex>
  </Box>
);

export default InterestedSkills;