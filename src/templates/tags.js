/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Utilities
import kebabCase from 'lodash/kebabCase';

// Components
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Tag from '../components/Tag';
import Bio from '../components/Bio';
import { useText } from '../context/TextContext';
import getBaseUrl from '../utils/getBaseUrl';

const styles = {
  tagListDiv: {},
};

const TagsPage = ({
  pageContext,
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title, lang, langs },
    },
  },
  location,
}) => {
  const { langKey } = pageContext;
  const { tTags } = useText(langKey);

  const base = getBaseUrl(lang, langKey);

  return (
    <Layout
      base={base}
      lang={langKey}
      langs={langs}
      location={location}
      title={title}
      breadcrumbs={[{ text: tTags }]}
    >
      <aside>
        <Bio langKey={langKey} />
      </aside>
      <Helmet title={tTags} />
      <div>
        <h1>{tTags}</h1>
        <TagList>
          {group.map(tag => (
            <Tag
              key={tag.fieldValue}
              text={tag.fieldValue}
              count={tag.totalCount}
              url={`${base}tags/${kebabCase(tag.fieldValue)}/`}
            />
          ))}
        </TagList>
      </div>
    </Layout>
  );
};

TagsPage.propTypes = {
  pageContext: PropTypes.object.isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired,
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        lang: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

export default TagsPage;

export const pageQuery = graphql`
  query TagsTotalPage($langKey: String) {
    site {
      siteMetadata {
        title
        lang
        langs
      }
    }
    sitePage {
      path
    }
    allMarkdownRemark(limit: 1000, filter: { fields: { langKey: { eq: $langKey } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

const TagList = styled.div`
  margin-left: 1.5rem;
  line-height: 3;
`;
