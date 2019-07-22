import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const ListLanguages = ({ langKey, slug, langs }) => {
  const newSlug = slug.replace(`/${langKey}`, "")

  const list = langs
    .filter(lang => lang !== langKey)
    .map(lang => ({
      link: `/${lang}${newSlug}`,
      lang,
    }))

  return (
    <ul
      style={{
        border: "1px solid #bbbbbb",
        borderRadius: "4px",
        margin: "0 0 15px 0",
        listStyle: "none",
        padding: "5px",
        fontSize: "14px",
      }}
    >
      {list.map(item => (
        <li
          key={item.lang}
          style={{
            margin: "0 5px 0 0",
            padding: 0,
          }}
        >
          <Link to={item.link}>{item.lang}</Link>
        </li>
      ))}
    </ul>
  )
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const langs = this.props.data.site.siteMetadata.languages.langs
    const { previous, next } = this.props.pageContext
    const { langKey, slug } = this.props.data.markdownRemark.fields

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1
          style={{
            marginTop: rhythm(1),
            marginBottom: 0,
          }}
        >
          {post.frontmatter.title}
        </h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <ListLanguages {...{ langKey, slug, langs }} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        languages {
          langs
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
        langKey
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
