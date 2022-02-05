/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import HeaderPage from './Header';
import Footer from './Footer';

function Layout({ children, location, title, base, lang, langs, slug }) {
  return (
    <Wrapper>
      <HeaderPage
        base={base}
        location={location}
        title={title}
        lang={lang}
        langs={langs}
        slug={slug || location.pathname}
      />
      <Container>
        {children}
        <Footer />
      </Container>
    </Wrapper>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  title: PropTypes.string,
  base: PropTypes.string,
  lang: PropTypes.string,
};

Layout.defaultProps = {
  children: null,
  title: null,
  base: '',
  lang: null,
};

const Wrapper = styled.div`
  min-height: 100vh;
  font-family: var(--base-font-family);
  background: var(--bg);
  transition: color 0.2s ease-out, background 0.2s ease-out;
`;

const Container = styled.div`
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  margin-right: auto;
  margin-left: auto;
  padding: 1em;
`;

export default Layout;
