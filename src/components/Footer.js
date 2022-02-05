import React from 'react';
import styled from 'styled-components/macro';
import { rhythm } from '../utils/typography';

function Footer() {
  return (
    <Wrapper>
      <span>Made of</span>
      <a
        href="https://github.com/thundermiracle/gatsby-simple-blog"
        target="_blank"
        rel="noopener noreferrer"
      >
        gatsby-simple-blog
      </a>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  margin-top: ${rhythm(2.5)};
  padding-top: ${rhythm(1)};
  text-align: center;

  span {
    margin-right: 5px;
  }
`;

export default Footer;
