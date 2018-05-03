import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
import './styles.css';
import Card from '../Card';
import { Location } from '../types';

const CardList = ({ locations, searching, view }) => (
  <div className="flex">
    <h4>Locations</h4>
    <Transition
      in={!searching && !locations.length}
      timeout={200}
      unmountOnExit
    >
      {status => (
        <h3 className={`no-results fade fade-${status}`}>No Results</h3>
      )}
    </Transition>
    <TransitionGroup className={`card-list ${view}`} exit={false}>
      {locations.map(location => (
        <CSSTransition
          key={location.placeId}
          timeout={{ enter: 200 }}
          classNames="fade"
        >
          <Card
            location={location}
          />
        </CSSTransition>
      ))}
      <Card hidden />
    </TransitionGroup>
  </div>
);

CardList.propTypes = {
  locations: PropTypes.arrayOf(Location),
  searching: PropTypes.bool,
  view: PropTypes.string,
};

CardList.defaultProps = {
  locations: [],
  searching: false,
  view: '',
};

export default CardList;
