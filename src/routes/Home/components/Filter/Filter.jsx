import React from 'react';
import Checkbox from 'material-ui/Checkbox';

export default class Filter extends React.PureComponent {
  updateTypeFilter = (event, isInputChecked) => {
  }

  render() {
    const { industrial, office, retail } = this.props.filters;

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
  filters: React.PropTypes.shape({
    industrial: React.PropTypes.bool.isRequired,
    office: React.PropTypes.bool.isRequired,
    retail: React.PropTypes.bool.isRequired,
  }).isRequired,
};
