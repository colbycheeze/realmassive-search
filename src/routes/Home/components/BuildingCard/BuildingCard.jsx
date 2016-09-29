import React from 'react';
import { Card, CardHeader, CardMedia, CardTitle } from 'material-ui/Card';
import Placeholder from '../../assets/placeholder-building.png';

export const BuildingCard = (props) => {
  const { title, street, cover, size } = props.building;

  return (
    <Card>
      <CardHeader
        title={title}
        subtitle={street}
      />
      <CardMedia overlay={<CardTitle title={`${size} Square Feet`} />} >
        <img src={cover || Placeholder} alt="cover" />
      </CardMedia>
    </Card>
  );
};

BuildingCard.propTypes = {
  building: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    street: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    size: React.PropTypes.number.isRequired,
    cover: React.PropTypes.string,
  }).isRequired,
};

export default BuildingCard;
