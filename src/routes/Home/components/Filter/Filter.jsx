import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';
import { updateTypeFilter } from 'modules/buildings';

export class Filter extends React.PureComponent {
  updateTypeFilter = (event, isInputChecked) => {
    const types = this.props.types;
    const typeToUpdate = event.target.id;

    if (isInputChecked) {
      this.props.updateTypeFilter(types.concat(typeToUpdate));
    }
    else {
      this.props.updateTypeFilter(types.filter(type => type !== typeToUpdate));
    }
  }

  render() {
    const industrial = this.props.types.includes('industrial');
    const retail = this.props.types.includes('retail');
    const office = this.props.types.includes('office');

    return (
      <div>
        <h4>Type:</h4>
        <Checkbox
          id="industrial"
          label="Industrial"
          checked={industrial}
          onCheck={this.updateTypeFilter}
        />
        <Checkbox
          id="office"
          label="Office"
          checked={office}
          onCheck={this.updateTypeFilter}
        />
        <Checkbox
          id="retail"
          label="Retail"
          checked={retail}
          onCheck={this.updateTypeFilter}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  types: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  updateTypeFilter: React.PropTypes.func.isRequired,
};

const mapActionCreators = {
  updateTypeFilter,
};

const mapStateToProps = (state) => ({
  types: state.buildings.filters.types,
});

export default connect(mapStateToProps, mapActionCreators)(Filter);
