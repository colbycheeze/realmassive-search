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
    <pre>
      <h3>Buildings</h3>
      {JSON.stringify(props.rawB, null, 2)}
    </pre>
    <pre>
      <h3>Covers</h3>
      {JSON.stringify(props.rawC, null, 2)}
    </pre>
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
  rawB: state.buildings.buildingsPayload,
  rawC: state.buildings.coversPayload,
  buildings: state.buildings.data,
  count: state.buildings.count,
});

export default connect(mapStateToProps, mapActionCreators)(HomeView);
