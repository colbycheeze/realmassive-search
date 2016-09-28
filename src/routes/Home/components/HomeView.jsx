import React from 'react';
import { connect } from 'react-redux';
import { getBuildings } from 'modules/buildings';
import RaisedButton from 'material-ui/RaisedButton';
import BuildingCard from './BuildingCard';
import Filter from './Filter';
import classes from './HomeView.scss'; // eslint-disable-line

export const HomeView = (props) => (
  <div>
    <h1>Count: {props.count}</h1>
    <RaisedButton label="Get Buildings" onTouchTap={props.getBuildings} />
    <Filter />
    <ul>
      {props.buildings.map((building, i) => (
        <li key={i}>
          <BuildingCard building={building} />
        </li>
      ))}
    </ul>
  </div>
);

HomeView.propTypes = {
  getBuildings: React.PropTypes.func.isRequired,
  buildings: React.PropTypes.array.isRequired,
  count: React.PropTypes.number.isRequired,
};

// ------------------------------------
// Connector
// ------------------------------------

const mapActionCreators = {
  getBuildings,
};

const mapStateToProps = (state) => ({
  buildings: state.buildings.ids.map(id => state.buildings.data[id]),
  // buildings: Object.keys(state.buildings.data).map(key => state.buildings.data[key]),
  count: state.buildings.count,
});

export default connect(mapStateToProps, mapActionCreators)(HomeView);
