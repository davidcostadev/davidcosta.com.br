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

import './Bio.css';
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
          <div className="bio">
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              className="pic"
              style={{
                marginRight: rhythm(1 / 2),
              }}
              imgStyle={{
                borderRadius: '50%',
              }}
            />
            <div className="description">
              <p>{tDescription}</p>
              <SocialBar langKey={langKey} />
            </div>
          </div>
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

export default Bio;
