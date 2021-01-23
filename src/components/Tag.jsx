/** @jsx jsx */
import { jsx, Heading, Link as TLink } from "theme-ui";
import { Flex } from "@theme-ui/components";
import { Link, useStaticQuery } from "gatsby";

import replaceSlashes from "../utils/replaceSlashes";

import Layout from "./Layout";
import SEO from "./seo";
import Listing from "./Listing";

const Tag = ({ posts, pageContext }) => {
  const basePath = `/`;
  const tagsPath = `tags/`;

  return (
    <Layout>
      <SEO title={`Tag: ${pageContext.name}`} />
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

export default Tag;
