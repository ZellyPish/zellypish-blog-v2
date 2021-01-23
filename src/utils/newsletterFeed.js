/* eslint arrow-body-style: 0 */

module.exports = title => ({
  query: `
    {
      site {
        siteMetadata {
          title: siteTitle
          description: siteDescription
          siteUrl
          site_url: siteUrl
        }
      }
    }
  `,
  feeds: [
    {
      serialize: ({ query: { site, allMdx } }) => {
        return allMdx.nodes.map(post => {
          return {
            title: post.frontmatter.title,
            date: post.frontmatter.date,
            excerpt: post.excerpt,
            url: site.siteMetadata.siteUrl + post.slug,
            guid: site.siteMetadata.siteUrl + post.slug,
            custom_elements: [{ "content:encoded": post.html }],
          };
        });
      },
      query: `
        {
          allMdx(sort: { fields: date, order: DESC }, filter: { fileAbsolutePath: { regex: "/posts/" } }) {
            nodes {
              frontmatter {
                title
                date(formatString: "MMMM D, YYYY")
              }
              excerpt
              slug
              html
            }
          }
        }
      `,
      output: `rss.xml`,
      title,
    },
  ],
});
