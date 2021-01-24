/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    siteTitle: `ZellyPish`,
    siteTitleAlt: `ZellyPish`,
    author: `ZellyPish`,
    siteHeadline: `ZellyPish Dev Blog`,
    siteUrl: `https://zellypish.dev/`,
    siteDescription: `JavaScript, Web Develop`,
    siteLanguage: `KR`,
    siteImage: `/logo.png`,
  },
  plugins: [
    // `gatsby-plugin-react-helmet`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/contents/posts/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/contents/pages`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
        ],
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ZellyPish Dev Blog`,
        short_name: `zellypish-blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#8668ed`,
        display: `minimal-ui`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: "G-4R3W1H1M6J",
        head: true,
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + "/blog" + edge.node.slug,
                  guid: site.siteMetadata.siteUrl + "/blog" + edge.node.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      slug
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "ZellyPish Dev Blog's rss feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-scroll-indicator`,
      options: {
        // Configure color of the scroll indicator
        color: "#937fd8",
        // Height of the scroll indicator
        height: "5px",
        // Configure paths where the scroll indicator will appear
        paths: ["/**"],
        // Configure the z-index of the indicator element
        zIndex: `9999`,
      },
    },
  ].filter(Boolean),
};
