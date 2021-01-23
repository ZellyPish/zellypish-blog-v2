const kebabCase = require(`lodash.kebabcase`);

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`);
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent,
  });
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(mdxNode, args, context, {
    fieldName,
  });
  return result;
};

// Create general interfaces that you could can use to leverage other data sources
// The core theme sets up MDX as a type for the general interface
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions;

  const basePath = `/`;

  const slugify = source => {
    const slug = kebabCase(source.title);

    return `/${basePath}/${slug}`.replace(/\/\/+/g, `/`);
  };

  createFieldExtension({
    name: `slugify`,
    extend() {
      return {
        resolve: slugify,
      };
    },
  });

  createFieldExtension({
    name: `mdxpassthrough`,
    args: {
      fieldName: `String!`,
    },
    extend({ fieldName }) {
      return {
        resolve: mdxResolverPassthrough(fieldName),
      };
    },
  });

  createTypes(`

    type PostTag {
      name: String
      slug: String
    }

    type ExternalLink {
      name: String!
      url: String!
    }

    type NavigationEntry {
      title: String!
      slug: String!
    }
  `);
};

exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createParentChildLink } = actions;

  const postsPath = `contents/posts/`;
  const pagesPath = `contents/pages/`;

  // Make sure that it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return;
  }

  // Create a source field
  // And grab the sourceInstanceName to differentiate the different sources
  // In this case "postsPath" and "pagesPath"
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  // Check for "posts" and create the "Post" type
  if (node.internal.type === `Mdx` && source === postsPath) {
    let modifiedTags;

    if (node.frontmatter.tags) {
      modifiedTags = node.frontmatter.tags.map(tag => ({
        name: tag,
        slug: kebabCase(tag),
      }));
    } else {
      modifiedTags = null;
    }

    const fieldData = {
      slug: node.frontmatter.slug ? node.frontmatter.slug : undefined,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      tags: modifiedTags,
      description: node.frontmatter.description,
    };

    const mdxPostId = createNodeId(`${node.id} >>> MdxPost`);

    createNode({
      ...fieldData,
      // Required fields
      id: mdxPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Post interface`,
      },
    });

    createParentChildLink({ parent: node, child: getNode(mdxPostId) });
  }

  if (node.internal.type === `Mdx` && source === pagesPath) {
    const fieldData = {
      title: node.frontmatter.title,
      slug: node.frontmatter.slug,
    };

    const mdxPageId = createNodeId(`${node.id} >>> MdxPage`);

    createNode({
      ...fieldData,
      // Required fields
      id: mdxPageId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPage`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Page interface`,
      },
    });

    createParentChildLink({ parent: node, child: getNode(mdxPageId) });
  }
};

// These template are only data-fetching wrappers that import components
const homepageT = require.resolve(`./src/components/homepage.jsx`);
const blogT = require.resolve(`./src/components/blog.jsx`);
const postT = require.resolve(`./src/components/post.jsx`);
const pageT = require.resolve(`./src/components/page.jsx`);
const tagT = require.resolve(`./src/components/tag.jsx`);
const tagsT = require.resolve(`./src/components/tags.jsx`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const basePath = `/`;
  const tagsPath = `tags/`;
  const formatString = `YYYY.MM.DD`;

  createPage({
    path: basePath,
    component: homepageT,
    context: {
      formatString,
    },
  });
  // createPage({
  //   path: `/${basePath}/projects/`.replace(/\/\/+/g, `/`),
  //   component: projectsT,
  //   context: {
  //     formatString,
  //   },
  // });
  // createPage({
  //   path: `/${basePath}/about/`.replace(/\/\/+/g, `/`),
  //   component: aboutT,
  //   context: {
  //     formatString,
  //   },
  // });

  createPage({
    path: `/${basePath}/blog/`.replace(/\/\/+/g, `/`),
    component: blogT,
    context: {
      formatString,
    },
  });

  createPage({
    path: `/${basePath}/tags`.replace(/\/\/+/g, `/`),
    component: tagsT,
  });

  const result = await graphql(`
    query {
      posts: allMdx(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { fileAbsolutePath: { regex: "/posts/" } }
      ) {
        nodes {
          frontmatter {
            title
          }
          slug
        }
      }
      pages: allMdx(filter: { fileAbsolutePath: { regex: "/pages/" } }) {
        nodes {
          slug
        }
      }
      tags: allMdx(sort: { fields: frontmatter___tags, order: DESC }) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your posts or pages`,
      result.errors
    );
    return;
  }

  const posts = result.data.posts.nodes;

  posts.forEach((post, index) => {
    createPage({
      path: `/blog/${post.slug}`.replace(/\/\/+/g, `/`),
      component: postT,
      context: {
        slug: post.slug,
        prev: index === 0 ? null : posts[index - 1],
        next: index === posts.length - 1 ? null : posts[index + 1],
        postPrefix: `/blog`,
      },
    });
  });

  const pages = result.data.pages.nodes;

  if (pages.length > 0) {
    pages.forEach(page => {
      createPage({
        path: `/${basePath}/${page.slug}`.replace(/\/\/+/g, `/`),
        component: pageT,
        context: {
          slug: page.slug,
        },
      });
    });
  }

  const tags = result.data.tags.group;

  if (tags.length > 0) {
    tags.forEach(tag => {
      createPage({
        path: `/${basePath}/${tagsPath}/${kebabCase(tag.fieldValue)}`.replace(
          /\/\/+/g,
          `/`
        ),
        component: tagT,
        context: {
          name: tag.fieldValue,
          tag: tag.fieldValue,
        },
      });
    });
  }
};
