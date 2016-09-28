import faker from 'faker';

export const getBuilding = ({
  type = 'office',
  street = faker.address.streetAddress(),
  id = faker.random.number(),
  size = Math.floor((Math.random() * ((10000 - 500) + 1)) + 500),
} = {}) => (
  {
    data: [
      {
        attributes: {
          address: {
            city: faker.address.city(),
            county: faker.address.county(),
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude(),
            state: faker.address.state(),
            street,
            zipcode: faker.address.zipCode(),
          },
          building_class: 'A',
          building_size: {
            units: 'sqft',
            value: `${size}.000000`,
          },
          building_type: type,
          created: faker.date.past(),
          deleted: false,
          title: 'Generic Building Title',
          updated: faker.date.recent(),
        },
        id,
        relationships: {
          spaces: {
            links: {
              related: `/buildings/${id}/spaces`,
            },
          },
          attachments: {
            data: [
              {
                id: faker.random.number(),
                type: 'attachments',
              },
            ],
          },
        },
        type: 'buildings',
      },
    ],
    included: [],
    meta: {
      count: 1,
    },
  }
);

const mockApi = {
  getBuilding,
};
export default mockApi;
