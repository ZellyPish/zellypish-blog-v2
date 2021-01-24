/** @jsx jsx */
import { jsx, Heading, Flex, Link as TLink } from "theme-ui";
import { Link, graphql } from "gatsby";

import replaceSlashes from "../utils/replaceSlashes";

import SEO from "./seo";
import Layout from "./Layout";
import Listing from "./Listing";
import Pagination from "./Pagination";

const Blog = ({ data, pageContext }) => {
  const basePath = `/`;
  const tagsPath = `tags/`;

  const posts = data.allMdx.nodes;
  const { numPages, limit, skip, currentPage } = pageContext;

  return (
    <Layout>
      <SEO title="Blog" />
      <Flex
        sx={{
          alignItems: `center`,
          justifyContent: `space-between`,
          flexFlow: `wrap`,
        }}
      >
        <Heading as="h2" variant="styles.h2" sx={{ mb: [3, 3, 5] }}>
          Blog
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
      <Pagination numPages={numPages} currentPage={currentPage} />
    </Layout>
  );
};

export const query = graphql`
  query($limit: Int!, $skip: Int!) {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      skip: $skip
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

export default Blog;
