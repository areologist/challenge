import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import noop from 'lodash/noop';
import './loader.css';
import './styles.css';
import searchIcon from './crosshairs.svg';
import { cancel, search } from '../../../actions';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.search = debounce(props.onSearch, 240);
    this.onEnter = throttle(props.onSearch, 300);
  }

  keypress(e) {
    if (e.key === 'Enter') {
      this.onEnter(e.target.value);
    }
  }

  render() {
    const { busy, ready } = this.props;
    return (
      <div className={`search-box ${ready ? '' : 'disabled'}`}>
        <div className="loader" style={{ display: busy ? '' : 'none' }} />
        <div className="icon" style={{ display: busy ? 'none' : '' }}>
          <img src={searchIcon} alt="icon" />
        </div>
        <input
          disabled={!ready}
          type="search"
          placeholder="Search"
          onChange={e => this.search(e.target.value)}
          onKeyPress={e => this.keypress(e)}
        />
      </div>
    );
  }
}

SearchInput.propTypes = {
  busy: PropTypes.bool,
  ready: PropTypes.bool,
  onSearch: PropTypes.func,
};

SearchInput.defaultProps = {
  busy: false,
  ready: false,
  onSearch: noop,
};

const mapStateToProps = ({ ready, searching }) => ({
  busy: searching,
  ready,
});

const mapDispatchToProps = dispatch => ({
  onSearch(query) {
    dispatch(query ? search(query) : cancel());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
