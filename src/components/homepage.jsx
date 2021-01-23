/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link, useStaticQuery } from "gatsby";

import replaceSlashes from "../utils/replaceSlashes";

// import Listing from "../components/listing"
import Title from "../components/Title";
import Layout from "../components/Layout";
import Visual from "../components/Visual";
import Listing from "./Listing";

const Homepage = () => {
  const basePath = `/`;

  const query = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: frontmatter___date, order: DESC }, limit: 3) {
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
  `);

  const posts = query.allMdx.nodes;

  return (
    <Layout>
      <Visual />
      <Title text="Latest Posts">
        <Link to={replaceSlashes(`/${basePath}/blog`)}>Read all posts</Link>
      </Title>
      <Listing posts={posts} />
    </Layout>
  );
};

export default Homepage;
