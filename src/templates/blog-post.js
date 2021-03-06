import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

function BlogPost({ data }) {
  const { post } = data
  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export default BlogPost

export const blogPostBySlugQuery = graphql`
  query GetBlogPostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 150)
      frontmatter {
        description
        title
      }
    }
  }
`
