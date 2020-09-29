import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

function Tag({ url, text, count = null, ...restProps }) {
  let countPart;
  if (count != null) {
    countPart = `  (${count})`;
  }
  return (
    <Round {...restProps}>
      <StyledLink to={url}>
        <Text>
          {text}
          {countPart}
        </Text>
      </StyledLink>
    </Round>
  );
}

Tag.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  count: PropTypes.number,
};

Tag.defaultProps = {
  count: null,
};

const Round = styled.div``;

const StyledLink = styled(Link)`
  position: relative;
  display: inline-block;
  height: 30px;
  padding: 0 1em 0 0.75em;
  color: var(--tag-color, #ffffff);
  font-size: 13px;
  line-height: 30px;
  text-decoration: none;
  background-color: var(--tag-bg, #3498db);
  border-radius: 0 5px 5px 0;
  transition: 0.2s;

  &::before {
    position: absolute;
    top: 0;
    left: -15px;
    width: 15px;
    height: 30px;
    background-color: var(--tag-bg, #3498db);
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    transition: 0.2s;
    content: '';
  }

  &::after {
    position: absolute;
    top: 50%;
    left: -6px;
    z-index: 2;
    display: block;
    width: 6px;
    height: 6px;
    margin-top: -3px;
    background-color: var(--bg, #ffffff);
    border-radius: 100%;
    content: '';
  }

  &:hover {
    color: var(--tag-color, #ffffff);
    background-color: #555555;
  }

  &:hover::before {
    background-color: #555555;
  }
`;

const Text = styled.span`
  display: block;
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default Tag;
