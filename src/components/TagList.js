import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import Tag from './Tag';

function TagList({ tags, baseUrl, ...restProps }) {
  return (
    <Tags className="tag-ul" {...restProps}>
      {tags.map(text => (
        <TagItem key={text}>
          <Tag text={text} url={`${baseUrl}/${text}`} />
        </TagItem>
      ))}
    </Tags>
  );
}

TagList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  tags: PropTypes.array.isRequired,
  baseUrl: PropTypes.string,
};

TagList.defaultProps = {
  baseUrl: '',
};

const Tags = styled.ul`
  margin: 0 0 0.5rem -0.5rem;
  padding: 0;
  list-style: none;
`;

const TagItem = styled.li`
  display: inline-block;
  margin: 0 0 0.3em 1.5em;
  padding: 0;
`;

export default TagList;
