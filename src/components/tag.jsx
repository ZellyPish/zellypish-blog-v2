/** @jsx jsx */
import { jsx, Heading, Link as TLink } from "theme-ui";
import { Flex } from "@theme-ui/components";
import { Link, graphql } from "gatsby";

import replaceSlashes from "../utils/replaceSlashes";

import Layout from "./Layout";
import SEO from "./seo";
import Listing from "./Listing";

const Tag = ({ data, pageContext }) => {
  const basePath = `/`;
  const tagsPath = `tags/`;

  const posts = data.allMdx.nodes;

  return (
    <Layout>
      <SEO title={`${pageContext.name}`} />
      <Flex
        sx={{
          alignItems: `center`,
          justifyContent: `space-between`,
          flexFlow: `wrap`,
        }}
      >
        <Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
          {pageContext.name}
        </Heading>
        <TLink
          as={Link}
          sx={{ variant: `links.secondary`, marginY: 2 }}
          to={replaceSlashes(`/${basePath}/${tagsPath}`)}
        >
          View all tags
        </TLink>
      </Flex>
      <Listing posts={posts} sx={{ mt: [4, 5] }} />
    </Layout>
  );
};

export const query = graphql`
  query($tag: [String]) {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { tags: { in: $tag } } }
    ) {
      nodes {
        frontmatter {
          title
          tags
          date(formatString: "YYYY.MM.DD")
        }
        slug
        excerpt
        timeToRead
      }
    }
  }
`;

export default Tag;
