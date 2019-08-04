import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import { Github, Twitter } from './icons';

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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              margin: 'auto',
            }}
          >
            {twitter && <Twitter username={twitter} />}
            {github && <Github username={github} />}
          </div>
        );
      }}
    />
  );
}
export default SocialBar;
