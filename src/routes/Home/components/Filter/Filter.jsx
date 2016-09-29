import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { updateTypeFilter, updateSizeFilter } from 'modules/buildings';

export class Filter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      min: '',
      max: '',
    };
  }

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

  updateSizeFilter = () => {
    const { min, max } = this.state;

    this.props.updateSizeFilter({ min, max });
  }

  updateInput = (event) => {
    this.setState({ [event.target.id]: event.target.value });
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
        <h4>Size:</h4>
        <TextField
          id="min"
          style={{ width: '100px', marginRight: '1rem' }}
          hintText="Min"
          value={this.state.min}
          onBlur={this.updateSizeFilter}
          onChange={this.updateInput}
        />
        <TextField
          id="max"
          style={{ width: '100px' }}
          hintText="Max"
          value={this.state.max}
          onBlur={this.updateSizeFilter}
          onChange={this.updateInput}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  types: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  updateTypeFilter: React.PropTypes.func.isRequired,
  updateSizeFilter: React.PropTypes.func.isRequired,
};

const mapActionCreators = {
  updateTypeFilter,
  updateSizeFilter,
};

const mapStateToProps = (state) => ({
  types: state.buildings.filters.types,
});

export default connect(mapStateToProps, mapActionCreators)(Filter);
