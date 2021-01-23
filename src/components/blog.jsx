/** @jsx jsx */
import { jsx, Heading, Flex, Link as TLink } from "theme-ui";
import { Link, graphql } from "gatsby";
import React from "react";

import replaceSlashes from "../utils/replaceSlashes";

import SEO from "./seo";
import Layout from "./Layout";
import Listing from "./Listing";

const Blog = ({ data }) => {
  const basePath = `/`;
  const tagsPath = `tags/`;

  const posts = data.allMdx.nodes;

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
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "/posts/" } }
    ) {
      nodes {
        frontmatter {
          title
          tags
          date(formatString: "YYYY.MM.D")
        }
        slug
        excerpt
        timeToRead
      }
    }
  }
`;

export default Blog;
