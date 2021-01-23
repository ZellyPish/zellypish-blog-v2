import { graphql } from "gatsby";
import HomepageComponent from "../components/homepage";

export default HomepageComponent;

export const query = graphql`
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
`;
