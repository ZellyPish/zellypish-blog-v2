/** @jsx jsx */
import { jsx, Link as TLink } from "theme-ui";
import { Box } from "@theme-ui/components";
import { Link } from "gatsby";
import ItemTags from "./itemTags";
import replaceSlashes from "../utils/replaceSlashes";

const BlogListItem = ({ post, showTags = true }) => {
  return (
    <Box mb={4}>
      <TLink
        as={Link}
        to={replaceSlashes(`/blog/${post.slug}`)}
        sx={{ fontSize: [2, 2, 3], color: `text` }}
      >
        {post.frontmatter.title}
      </TLink>
      <p
        sx={{
          color: `secondary`,
          mt: 1,
          a: { color: `secondary` },
          fontSize: [1, 1, 2],
          marginBlockEnd: 2,
        }}
      >
        <time>{post.frontmatter.date}</time>
      </p>
      {post.frontmatter.tags && <ItemTags tags={post.frontmatter.tags} />}
      <Box sx={{ width: [`90vw`, `50vw`, `50vw`] }}>
        <p sx={{ marginBlockStart: 0, textOverflow: `ellipsis` }}>
          {post.excerpt}
        </p>
      </Box>
    </Box>
  );
};

export default BlogListItem;
