/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components/macro';
import { site } from '../../config';

const getLink = (lang, slug) => {
  if ((slug === '/' || slug.includes('/tags/')) && lang === site.lang) {
    return slug;
  }

  return `/${lang}${slug}`;
};

const LanguageSelector = ({ langKey, slug, langs }) => {
  const newSlug = slug.replace(`/${langKey}`, '');
  if (!langs.length) {
    return null;
  }

  const [selected] = langs.filter(lang => lang[0] === langKey);

  const list = langs
    .filter(lang => lang[0] !== langKey)
    .map(lang => ({
      link: getLink(lang[0], newSlug),
      lang: lang[0],
      label: lang[1],
    }));

  return (
    <Wrapper>
      <CurrentLanguage>{selected[1]}</CurrentLanguage>
      <Dropdown>
        {list.map(item => (
          <Item key={item.lang}>
            <LinkStyled to={item.link}>{item.label}</LinkStyled>
          </Item>
        ))}
      </Dropdown>
    </Wrapper>
  );
};

LanguageSelector.defaultProps = {
  langs: [],
};

const Dropdown = styled.ul`
  position: absolute;
  right: 0;
  display: none;
  min-width: 150px;
  margin: 0;
  padding-top: 5px;
  padding-bottom: 5px;
  list-style: none;
  background-color: #ffffff;
  border: 1px solid var(--purple);
`;

const Wrapper = styled.div`
  position: relative;

  &:hover ${Dropdown} {
    display: flex;
  }
`;

const CurrentLanguage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 100px;
  padding: 4px 12px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }

  &:after {
    display: flex;
    width: 16px;
    height: 16px;
    margin-left: 5px;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjBxwANivRS5+OAAAAd0lEQVQoz62RKw6AMBAFX7kJGBICB6ji/hYMAoEiFNcEPxh+bQmKdbsz+0lW+iXIPqrkDDhsgi2OgUJ0APhQweIB6MUIsXJhGEXJfCQbbYRXGilSEixJVCzXohM76udR95S4+1VJcaC84+OWiSnYnSgG88/77tgB1LWvQiuLy6YAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDctMjdUMjI6NTQ6NDMrMDI6MDBRzF/EAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA3LTI3VDIyOjU0OjQzKzAyOjAwIJHneAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=');
    content: ' ';
  }
`;

const Item = styled.li`
  display: flex;
  flex: 1;
  margin: 0;
  white-space: nowrap;
`;

const LinkStyled = styled(Link)`
  flex: 1;
  padding: 4px 12px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export default LanguageSelector;
