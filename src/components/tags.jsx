/** @jsx jsx */
import { jsx, Link as TLink, Heading } from "theme-ui";
import { Box, Flex } from "@theme-ui/components";
import kebabCase from "lodash.kebabcase";
import { Link, graphql } from "gatsby";
import Layout from "./Layout";
import SEO from "./seo";
import replaceSlashes from "../utils/replaceSlashes";

const Tags = ({ list }) => {
  const tagsPath = `tags/`;
  const basePath = `/`;

  return (
    <Layout>
      <SEO title="Tags" />
      <Heading as="h1" variant="styles.h1">
        Tags
      </Heading>
      <Box mt={[4, 5]}>
        {list.map(listItem => (
          <Flex
            key={listItem.fieldValue}
            mb={[1, 1, 2]}
            sx={{ alignItems: `center` }}
          >
            <TLink
              as={Link}
              sx={{ variant: `links.listItem`, mr: 2 }}
              to={replaceSlashes(
                `/${basePath}/${tagsPath}/${kebabCase(listItem.fieldValue)}`
              )}
            >
              {listItem.fieldValue}{" "}
              <span sx={{ color: `secondary` }}>({listItem.totalCount})</span>
            </TLink>
          </Flex>
        ))}
      </Box>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___tags, order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default Tags;
