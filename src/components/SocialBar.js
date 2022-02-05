import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { useText } from '../context/TextContext';

const socialQuery = graphql`
  query SocialQuery {
    site {
      siteMetadata {
        social {
          twitter
          github
        }
      }
    }
  }
`;

function SocialBar({ langKey }) {
  const { tFollow } = useText(langKey);

  return (
    <StaticQuery
      query={socialQuery}
      render={data => {
        const { twitter, github } = data.site.siteMetadata.social;
        return (
          <Wrapper>
            <span>
              {tFollow}
              {': '}
            </span>
            <StaticLink
              href={`https://twitter.com/${twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </StaticLink>
            <StaticLink
              href={`https://github.com/${github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </StaticLink>
          </Wrapper>
        );
      }}
    />
  );
}

SocialBar.propTypes = {
  langKey: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  display: flex;
`;

const StaticLink = styled.a`
  margin-left: 15px;
`;

export default SocialBar;
