import React from 'react';
import PropTypes from 'prop-types';

import { partial } from '../../lib/utils';

export const TodoItem = props => {
  const handleRemove = partial(props.handleRemove, props.id);
  return (
    <li>
      <span onClick={handleRemove}>&#128465;</span>
      {props.title}
    </li>
  )
}

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  id: PropTypes.string.isRequired
}
