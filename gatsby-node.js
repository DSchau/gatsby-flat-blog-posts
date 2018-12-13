const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = function onCreateNode ({ actions: { createNodeField }, node, getNode }) {
  switch (node.internal.type) {
    case 'MarkdownRemark':
      const slug = createFilePath({
        node,
        getNode,
        basePath: path.resolve('content'),
      })
      createNodeField({
        node,
        name: 'slug',
        value: slug
      })
      break;
    default:
      return;
  }
}

exports.createPages = async function createPages({ actions: { createPage }, graphql }) {
  const result = await graphql(`
    {
      blogPosts:allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
    .then(res => res.data)

  const blogPostTemplate = path.resolve('src/templates/blog-post.js')

  result.blogPosts.edges.forEach(({ node }) => {
    const { slug } = node.fields
    createPage({
      path: slug,
      component: blogPostTemplate,
      context: {
        slug
      }
    })
  })
}