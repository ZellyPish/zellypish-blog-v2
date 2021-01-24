/** @jsx jsx */
import { jsx } from "theme-ui";
import BlogListItem from "./blogListItem";

const Listing = ({ posts, className = ``, showTags = true }) => {
  return (
    <section sx={{ mb: [2, 2, 4] }} className={className}>
      {posts.map(post => (
        <BlogListItem key={post.slug} post={post} showTags={showTags} />
      ))}
    </section>
  );
};

export default Listing;
