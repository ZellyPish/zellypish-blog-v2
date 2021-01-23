import { graphql } from "gatsby";
import BlogComponent from "../components/blog";

export default BlogComponent;

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
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
