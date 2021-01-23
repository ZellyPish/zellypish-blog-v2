/** @jsx jsx */
import { jsx, Heading, Box, Link as TLink } from "theme-ui";
import { Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "./Layout";
import ItemTags from "./itemTags";
import SEO from "./seo";

import Utterances from "./Utterances";

const px = [`32px`, `16px`, `8px`, `4px`];
const shadow = px.map(v => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`);

const Post = ({ data: { mdx }, pageContext }) => {
  const { next, prev } = pageContext;
  return (
    <Layout>
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
          <span>{Math.round(mdx.timeToRead * 1.8)} min read</span>
        )}
      </p>
      {mdx.tags && <ItemTags tags={mdx.tags} />}
      <section
        sx={{
          my: 5,
          ".gatsby-resp-image-wrapper": {
            my: [4, 4, 5],
            boxShadow: shadow.join(`, `),
          },
          variant: `layout.content`,
        }}
      >
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </section>
      {next && <Link to={next.mdx.slug}>Next</Link>}
      {prev && <Link to={prev.mdx.slug}>Prev</Link>}
      <Utterances />
      <Box sx={{ mb: [2, 2, 4] }} />
    </Layout>
  );
};

export default Post;
