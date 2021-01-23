import { graphql } from "gatsby";
import PostComponent from "../components/post";

export default PostComponent;

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
