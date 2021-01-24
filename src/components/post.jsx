/** @jsx jsx */
import { jsx, Heading, Box, Flex, Link as TLink } from "theme-ui";
import { Link, graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";

import replaceSlashes from "../utils/replaceSlashes";
import Layout from "./Layout";
import ItemTags from "./itemTags";
import SEO from "./seo";
import Utterances from "./Utterances";
import { preToCodeBlock } from "mdx-utils";
import Code from "./code";
import CodeStyles from "../styles/code";

const px = [`32px`, `16px`, `8px`, `4px`];
const shadow = px.map(v => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`);

const Post = ({ data: { mdx }, pageContext }) => {
  const { next, prev } = pageContext;
  const components = {
    pre: preProps => {
      const props = preToCodeBlock(preProps);
      if (props) {
        return <Code {...props} />;
      } else {
        return <pre {...preProps} />;
      }
    },
  };
  return (
    <Layout>
      <MDXProvider components={components}>
        <SEO
          title={mdx.frontmatter.title}
          description={mdx.description ? mdx.description : mdx.excerpt}
          image={mdx.banner ? mdx.banner.childImageSharp.resize.src : undefined}
          pathname={mdx.slug}
        />
        <Heading as="h1" variant="styles.h1">
          {mdx.frontmatter.title}
        </Heading>
        <p
          sx={{
            color: `secondary`,
            mt: 3,
            a: { color: `secondary` },
            fontSize: [1, 1, 2],
          }}
        >
          <time>{mdx.frontmatter.date}</time>
          {mdx.timeToRead && ` — `}
          {mdx.timeToRead && (
            <span>{Math.ceil(mdx.timeToRead * 1.6)} min read</span>
          )}
        </p>
        {mdx.tags && <ItemTags tags={mdx.tags} />}
        <section
          sx={{
            my: [2, 2, 4],
            ".gatsby-resp-image-wrapper": {
              my: [4, 4, 5],
              boxShadow: shadow.join(`, `),
            },
            variant: `layout.content`,
          }}
        >
          <Box sx={{ ...CodeStyles }}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </Box>
        </section>

        <Flex
          sx={{
            justifyContent: `space-between`,
            mb: [4, 4, 5],
            flexDirection: [`column`, `row`, `row`],
          }}
        >
          {next && (
            <TLink
              as={Link}
              to={replaceSlashes(`/blog/${next.slug}/`)}
              sx={{ width: [`100%`, `45%`, `45%`] }}
              variant="links.secondary"
            >
              <Box
                sx={{
                  textAlign: `center`,
                  bg: `footer`,
                  borderRadius: `1rem`,
                  p: [1, 1, 2],
                  my: [2, 2, 3],
                }}
              >
                <Box sx={{ mb: [2] }}>{` < `}Previous Page</Box>
                <Heading
                  as="h5"
                  variant="styles.h5"
                  sx={{
                    overflow: `hidden`,
                    textOverflow: `ellipsis`,
                    whiteSpace: `nowrap`,
                  }}
                >
                  {next.frontmatter.title}
                </Heading>
              </Box>
            </TLink>
          )}
          {` `}
          {prev && (
            <TLink
              as={Link}
              to={replaceSlashes(`/blog/${prev.slug}/`)}
              sx={{ width: [`100%`, `45%`, `45%`] }}
              variant="links.secondary"
            >
              <Box
                sx={{
                  textAlign: `center`,
                  bg: `footer`,
                  borderRadius: `1rem`,
                  p: [1, 1, 2],
                  my: [2, 2, 3],
                }}
              >
                <Box sx={{ mb: [2] }}>Next Page{` > `}</Box>
                <Box>
                  <Heading
                    as="h5"
                    variant="styles.h5"
                    sx={{
                      overflow: `hidden`,
                      textOverflow: `ellipsis`,
                      whiteSpace: `nowrap`,
                    }}
                  >
                    {prev.frontmatter.title}
                  </Heading>
                </Box>
              </Box>
            </TLink>
          )}
        </Flex>

        <Utterances />
        <Box sx={{ mb: [2, 2, 4] }} />
      </MDXProvider>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    mdx(slug: { eq: $slug }) {
      slug
      frontmatter {
        date(formatString: "YYYY.MM.DD")
        tags
        title
      }
      body
      excerpt
      timeToRead
      tableOfContents(maxDepth: 4)
    }
  }
`;

export default Post;
