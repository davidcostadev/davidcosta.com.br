/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

import { rhythm } from '../utils/typography';
import { useText } from '../context/TextContext';

import SocialBar from './SocialBar';

function Bio({ langKey }) {
  const { tDescription } = useText(langKey);

  return (
    <StaticQuery
      // eslint-disable-next-line no-use-before-define
      query={bioQuery}
      render={data => {
        const { author } = data.site.siteMetadata;
        return (
          <Wrapper>
            <Picture
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
              }}
              imgStyle={{
                borderRadius: '50%',
              }}
            />
            <Description>
              <p>{tDescription}</p>
              <SocialBar langKey={langKey} />
            </Description>
          </Wrapper>
        );
      }}
    />
  );
}

Bio.propTypes = {
  langKey: PropTypes.string.isRequired,
};

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 70, height: 70) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        description
      }
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
`;

const Picture = styled(Image)`
  min-width: 70px;
  margin-bottom: 0;
  border-radius: 100%;
`;

const Description = styled.div`
  width: 100%;

  p {
    margin-bottom: 1rem;
  }
`;

export default Bio;
