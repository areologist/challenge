import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import logo from './logo.svg';
import SearchInput from './SearchInput';
import ViewButtons from './ViewButtons';

const Header = ({ onViewChange, view }) => (
  <header>
    <div className="flex row justify-between content">
      <div className="flex-3">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1>Challenge</h1>
        </div>
      </div>
      <div className="flex row flex-6 justify-center align-center">
        <SearchInput />
        <div className="search-pane">
          Results pane
        </div>
      </div>
      <div className="flex row justify-end flex-3 align-center">
        <ViewButtons onViewChange={onViewChange} view={view} />
      </div>
    </div>
  </header>
);

Header.propTypes = {
  onViewChange: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
};

export default Header;
