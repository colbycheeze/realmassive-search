import React from 'react';
import { connect } from 'react-redux';
import { getBuildings } from 'modules/buildings';
import BuildingCard from './BuildingCard';
import Filter from './Filter';
import classes from './HomeView.scss'; // eslint-disable-line

export class HomeView extends React.PureComponent {
  constructor(props) {
    super(props);
    props.getBuildings();
  }

  render() {
    return (
      <div>
        <Filter />
        <h2>Displaying {this.props.offset} to {this.props.offset + this.props.limit} of {this.props.count}</h2>
        <ul>
          {this.props.buildings.map((building, i) => (
            <li key={i}>
              <BuildingCard building={building} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

HomeView.propTypes = {
  getBuildings: React.PropTypes.func.isRequired,
  buildings: React.PropTypes.array.isRequired,
  count: React.PropTypes.number.isRequired,
  offset: React.PropTypes.number.isRequired,
  limit: React.PropTypes.number.isRequired,
};

// ------------------------------------
// Connector
// ------------------------------------

const mapActionCreators = {
  getBuildings,
};

const mapStateToProps = (state) => ({
  buildings: state.buildings.ids.map(id => state.buildings.data[id]),
  count: state.buildings.count,
  offset: state.buildings.filters.page.offset || 0,
  limit: state.buildings.filters.page.limit || state.buildings.ids.length,
});

export default connect(mapStateToProps, mapActionCreators)(HomeView);
