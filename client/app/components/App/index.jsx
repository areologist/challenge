import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import './styles.css';
import CardList from '../CardList';
import Header from '../Header';
import Map from '../Map';
import { changeView, open } from '../../actions';
import { Location } from '../types';

const Error = () => (
  <div className="error">
    <h4>Something went wrong</h4>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.connectWebsocket(this.props.url);
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Error />;
    }
    const {
      error,
      locations,
      onViewChange,
      searching,
      view,
    } = this.props;

    return (
      <div className="flex column app">
        <Header
          onViewChange={onViewChange}
          view={view}
        />

        {error ? <Error /> : null}

        <div className="flex row content">
          <div
            className="flex-8 content-col card"
            style={{ display: view === 'map' || view === 'both' ? '' : 'none' }}
          >
            <Map
              locations={locations}
            />
          </div>

          <div
            className={`flex-4 content-col ${view}`}
            style={{ display: view === 'list' || view === 'both' ? '' : 'none' }}
          >
            <CardList
              locations={locations}
              searching={searching}
              view={view}
            />
          </div>
        </div>

      </div>
    );
  }
}

App.propTypes = {
  connectWebsocket: PropTypes.func,
  error: PropTypes.bool,
  locations: PropTypes.arrayOf(Location),
  onViewChange: PropTypes.func,
  searching: PropTypes.bool,
  url: PropTypes.string.isRequired,
  view: PropTypes.string,
};

App.defaultProps = {
  connectWebsocket: noop,
  error: false,
  locations: [],
  onViewChange: noop,
  searching: false,
  view: '',
};

const mapStateToProps = ({
  error, results, searching, view,
}) => ({
  error: !searching && !!error,
  locations: results,
  searching,
  view,
});

const mapDispatchToProps = dispatch => ({
  connectWebsocket(url) {
    dispatch(open(url));
  },
  onViewChange(view) {
    dispatch(changeView(view));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
