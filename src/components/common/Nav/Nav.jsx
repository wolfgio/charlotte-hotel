import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.scss';

export default () => (
  <nav className="top-nav">
    <Link to='/'>The Queen City</Link>
    <Link to='/'>My Reservations</Link>
    <Link to='/'>Guide</Link>
  </nav>
);