/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from 'gatsby';

import { rhythm } from '../utils/typography';
import { useText } from '../context/TextContext';
import { formatPostDate, formatReadingTime } from '../utils/helpers';

import TagList from './TagList';

function PostAbbrev({ slug, title, date, timeToRead, excerpt, tags, lang, base }) {
  let excerptPart;
  if (excerpt) {
    excerptPart = (
      <p
        dangerouslySetInnerHTML={{
          __html: excerpt,
        }}
      />
    );
  }

  let tagsPart;
  if (tags) {
    tagsPart = <TagList tags={tags} baseUrl={`${base}tags`} />;
  }

  const { tRead } = useText(lang);

  return (
    <article>
      <header>
        <Title>
          <StyledLink to={slug} rel="bookmark">
            {title}
          </StyledLink>
        </Title>
        {tagsPart}
        <small>{`${formatPostDate(date, lang)} • ${formatReadingTime(timeToRead, tRead)}`}</small>
        {excerptPart}
      </header>
    </article>
  );
}

PostAbbrev.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string,
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  excerpt: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  tags: PropTypes.array,
  lang: PropTypes.string,
  base: PropTypes.string,
};

PostAbbrev.defaultProps = {
  title: null,
  excerpt: null,
  tags: null,
  lang: 'en',
  base: '',
};

const Title = styled.h3`
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 1.75rem;
  margin-bottom: 0.4375rem;
`;

const StyledLink = styled(Link)`
  boxshadow: 'none';
`;

export default PostAbbrev;
