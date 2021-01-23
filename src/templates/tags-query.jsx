import { graphql } from "gatsby";
import TagsComponent from "../components/Tags";

export default TagsComponent;

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___tags, order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
