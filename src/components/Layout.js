/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import HeaderPage from './Header';
import Footer from './Footer';

import './Layout.css';

function Layout({ children, location, title, base, lang, langs, slug }) {
  return (
    <div className="layout">
      <HeaderPage
        base={base}
        location={location}
        title={title}
        lang={lang}
        langs={langs}
        slug={slug || location.pathname}
      />
      <div className="layout__container">
        {children}
        <Footer />
      </div>
    </div>
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

export default Layout;
