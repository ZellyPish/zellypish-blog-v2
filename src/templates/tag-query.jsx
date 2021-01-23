import { graphql } from "gatsby";
import TagComponent from "../components/Tag";

export default TagComponent;

export const query = graphql`
  query($title: String!) {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { title: { eq: $title } } }
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
