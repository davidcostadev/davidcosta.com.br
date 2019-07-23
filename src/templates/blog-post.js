import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Bio from "../components/Bio"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import TagList from "../components/TagList"
import RelativePosts from "../components/RelativePosts"
import Disqus from "../components/Disqus"

import { formatPostDate, formatReadingTime } from "../utils/helpers"
import { rhythm, scale } from "../utils/typography"
import getBaseUrl from "../utils/getBaseUrl"

const ListLanguages = ({ langKey, slug, langs }) => {
  const newSlug = slug.replace(`/${langKey}`, "")

  const list = langs
    .filter(lang => lang[0] !== langKey)
    .map(lang => ({
      link: `/${lang[0]}${newSlug}`,
      lang: lang[1],
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

function BlogPostTemplate({ data, pageContext, location }) {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const langs = data.site.siteMetadata.langs
  const slug = data.markdownRemark.fields.slug
  const { previous, next, previousInSameTag, nextInSameTag } = pageContext
  const defaultLang = data.site.siteMetadata.lang
  const langKey = post.fields.langKey

  const base = getBaseUrl(defaultLang, langKey)

  let tags
  if (post.frontmatter.tags) {
    tags = <TagList tags={post.frontmatter.tags} baseUrl={`${base}tags`} />
  }

  return (
    <Layout
      base={base}
      location={location}
      title={siteTitle}
      breadcrumbs={[{ text: post.frontmatter.title }]}
    >
      <SEO
        lang={langKey}
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <h1>{post.frontmatter.title}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}
      >
        {formatPostDate(post.frontmatter.date, langKey)}
        {` • ${formatReadingTime(post.timeToRead)}`}
      </p>
      <ListLanguages {...{ langKey, slug, langs }} />
      {tags}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      <RelativePosts
        postNodes={[previousInSameTag, nextInSameTag]}
        lang={langKey}
      />

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

      <Disqus
        identifier={post.id}
        show={post.frontmatter.disqus}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        langs
        lang
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        disqus
      }
      fields {
        langKey
        slug
      }
    }
  }
`
