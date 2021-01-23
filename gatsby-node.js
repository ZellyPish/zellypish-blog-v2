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
    const slug = source.slug ? source.slug : kebabCase(source.title);

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
};

// These template are only data-fetching wrappers that import components
const homepageTemplate = require.resolve(`./src/templates/homepage-query.jsx`);
const projectsTemplate = require.resolve(`./src/templates/projects.jsx`);
const aboutTemplate = require.resolve(`./src/templates/about.jsx`);
const blogTemplate = require.resolve(`./src/templates/blog-query.jsx`);
const postTemplate = require.resolve(`./src/templates/post-query.jsx`);
const tagTemplate = require.resolve(`./src/templates/tag-query.jsx`);
const tagsTemplate = require.resolve(`./src/templates/tags-query.jsx`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const basePath = `/`;
  const tagsPath = `tags/`;
  const formatString = `YYYY.MM.DD`;

  createPage({
    path: basePath,
    component: homepageTemplate,
    context: {
      formatString,
    },
  });
  createPage({
    path: `/${basePath}/projects/`.replace(/\/\/+/g, `/`),
    component: projectsTemplate,
    context: {
      formatString,
    },
  });
  createPage({
    path: `/${basePath}/about/`.replace(/\/\/+/g, `/`),
    component: aboutTemplate,
    context: {
      formatString,
    },
  });

  createPage({
    path: `/${basePath}/blog/`.replace(/\/\/+/g, `/`),
    component: blogTemplate,
    context: {
      formatString,
    },
  });

  createPage({
    path: `/${basePath}/tags`.replace(/\/\/+/g, `/`),
    component: tagsTemplate,
  });

  const result = await graphql(`
    query {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
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

  const posts = result.data.allMdx.nodes;

  posts.forEach(post => {
    createPage({
      path: `/blog/${post.slug}`.replace(/\/\/+/g, `/`),
      component: postTemplate,
      context: {
        slug: post.slug,
      },
    });
  });

  const tags = result.data.tags.group;

  if (tags.length > 0) {
    tags.forEach(tag => {
      createPage({
        path: `/${basePath}/${tagsPath}/${kebabCase(tag.fieldValue)}`.replace(
          /\/\/+/g,
          `/`
        ),
        component: tagTemplate,
        context: {
          slug: kebabCase(tag.fieldValue),
          name: tag.fieldValue,
        },
      });
    });
  }
};
