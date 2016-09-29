import faker from 'faker';

export const getBuildings = ({
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

const getCovers = ({
  id = faker.random.number(),
  buildingId = faker.random.number(),
  mediaId = faker.random.number(),
  cover = `https://www.realmassive.com/media/${faker.random.number()}`,
} = {}) => ({
  data: [
    {
      attributes: {
        category: 'exterior',
        created: '2016-07-16T02:27:31.941263+00:00',
        deleted: false,
        updated: '2016-07-16T02:27:31.941263+00:00',
      },
      id,
      relationships: {
        buildings: {
          links: {
            related: `/attachments/${id}/buildings/${buildingId}`,
          },
        },
        media: {
          data: {
            id: mediaId,
            type: 'media',
          },
          links: {
            related: `/attachments/${id}/media/${mediaId}`,
          },
        },
      },
      type: 'attachments',
    },
  ],
  included: [
    {
      attributes: {
        created: '2016-06-22T18:54:38.208250+00:00',
        deleted: false,
        file_size: '294791',
        height: 349,
        ip_status: 'APPROVED',
        mime_type: 'image/png',
        updated: '2016-06-22T18:54:49.704910+00:00',
        url: cover,
        video_tag: '[]',
        width: 685,
      },
      id: mediaId,
      type: 'media',
    },
  ],
  meta: {
    count: 1,
  },
});

const mockApi = {
  getBuildings,
  getCovers,
};
export default mockApi;
