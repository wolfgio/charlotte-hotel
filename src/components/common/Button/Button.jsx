import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = props => (
  <button
    className={`default-button ${props.bsclass} ${props.small ? 'btn-small' : ' '} ${props.secondary ? 'btn-secondary' : ' '}`}
    {...props}
  >
    {props.title}
  </button>
);

Button.propTypes = {
  bsclass: PropTypes.string,
  title: PropTypes.string,
  small: PropTypes.bool,
  secondary: PropTypes.bool,
};

Button.defaultProps = {
  bsclass: '',
  title: '',
  small: false,
  secondary: false,
};

export default Button;
