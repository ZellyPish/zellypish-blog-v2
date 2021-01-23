/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link, graphql } from "gatsby";

import replaceSlashes from "../utils/replaceSlashes";

// import Listing from "../components/listing"
import Title from "../components/Title";
import Layout from "../components/Layout";
import Visual from "../components/Visual";
import Listing from "./Listing";
import SEO from "./seo";

const Homepage = ({ data }) => {
  const basePath = `/`;

  const posts = data.allMdx.nodes;

  return (
    <Layout>
      <SEO />
      <Visual />
      <Title text="Latest Posts">
        <Link to={replaceSlashes(`/${basePath}/blog`)}>Read all posts</Link>
      </Title>
      <Listing posts={posts} />
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 3
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

export default Homepage;
