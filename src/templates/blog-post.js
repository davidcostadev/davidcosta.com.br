/* eslint-disable react/no-danger */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import TagList from '../components/TagList';
import RelativePosts from '../components/RelativePosts';

import { formatPostDate, formatReadingTime } from '../utils/helpers';
import { rhythm, scale } from '../utils/typography';
import getBaseUrl from '../utils/getBaseUrl';
import { useText } from '../context/TextContext';

import './blog-post.css';

function BlogPostTemplate({ data, pageContext, location }) {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { langs } = data.site.siteMetadata;
  const { slug } = data.markdownRemark.fields;
  const { previous, next, previousInSameTag, nextInSameTag } = pageContext;
  const defaultLang = data.site.siteMetadata.lang;
  const { langKey } = post.fields;

  const base = getBaseUrl(defaultLang, langKey);

  let tags;
  if (post.frontmatter.tags) {
    tags = <TagList tags={post.frontmatter.tags} baseUrl={`${base}tags`} />;
  }

  const justSlug = slug.slice(1, slug.length - 1).split('/')[1];

  const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://davidcosta.com.br${slug}`,
  )}`;
  const editUrl = `https://github.com/davidcostadev/davidcosta.com.br/edit/master/content/blog/${justSlug}/index.${langKey}.md`;

  const { tDiscuss, tEdit, tRead } = useText(langKey);

  return (
    <Layout
      base={base}
      location={location}
      title={siteTitle}
      lang={langKey}
      langs={langs}
      slug={slug}
      breadcrumbs={[{ text: post.frontmatter.title }]}
    >
      <article>
        <header>
          <SEO
            lang={langKey}
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
          />
          <h1>{post.frontmatter.title}</h1>
        </header>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {formatPostDate(post.frontmatter.date, langKey)}
          {` • ${formatReadingTime(post.timeToRead, tRead)}`}
        </p>
        {tags}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <footer>
          <p>
            <a href={discussUrl} target="_blank" rel="noopener noreferrer" title={tDiscuss}>
              {tDiscuss}
            </a>
            {` • `}
            <a href={editUrl} target="_blank" rel="noopener noreferrer" title={tEdit}>
              {tEdit}
            </a>
          </p>
        </footer>
      </article>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Bio langKey={langKey} />

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
      <RelativePosts postNodes={[previousInSameTag, nextInSameTag]} lang={langKey} />
    </Layout>
  );
}

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default BlogPostTemplate;

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
      }
      fields {
        langKey
        slug
      }
    }
  }
`;
