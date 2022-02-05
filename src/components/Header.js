/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components/macro';
import ReadModeToggle from './ReadModeToggle';
import LanguageSelector from './LanguageSelector';

const Header = ({ location, title, base, lang, slug, langs }) => {
  const rootPath = `${__PATH_PREFIX__}${base}`;

  let brand;
  if (location.pathname === rootPath) {
    brand = (
      <Brand as="h1">
        <Link to={base}>{title}</Link>
      </Brand>
    );
  } else {
    brand = (
      <Brand>
        <Link to={base}>{title}</Link>
      </Brand>
    );
  }

  return (
    <Wrapper>
      <Container>
        {brand}
        <Menu>
          <LanguageSwitch>
            <LanguageSelector langKey={lang} slug={slug} langs={langs} />
          </LanguageSwitch>
          <Theme>
            <ReadModeToggle />
          </Theme>
        </Menu>
      </Container>
    </Wrapper>
  );
};

const Brand = styled.div`
  margin-top: 0;
  margin-bottom: 0;
  font-weight: normal;
  font-size: 1.5em;
  font-family: var(--sansbase-font-family);
  line-height: 1.5em;

  a {
    color: #ffffff;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
`;

const LanguageSwitch = styled.div`
  margin-right: 15px;
`;

const Theme = styled.div`
  display: flex;
`;

const Wrapper = styled.header`
  padding-top: 10px;
  padding-bottom: 10px;
  color: #ffffff;
  background-color: var(--purple);
`;

export default Header;
