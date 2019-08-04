import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import './SocialBar.css';

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

function SocialBar() {
  return (
    <StaticQuery
      query={socialQuery}
      render={data => {
        const { twitter, github } = data.site.siteMetadata.social;
        return (
          <div className="social-bar">
            <span>Follow me on: </span>
            <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer">
              Github
            </a>
          </div>
        );
      }}
    />
  );
}
export default SocialBar;
