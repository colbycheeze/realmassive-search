export const listingsApi = 'https://api.realmassive.com';

export const callApi = (endpoint, {
  apiUrl = listingsApi,
  headers = { 'Content-Type': 'application/json' },
  method = 'GET',
  body,
} = {}) =>
  fetch(`${apiUrl}/${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) throw json;

    return json;
  });

const filterBy = (type, filters) =>
  `filter[where][${type}]=${filters.reduce((str, value) => `${str},${value}`)}`;

const joinFilters = (filters) => filters.reduce((str, filter) => `${str}&${filter}`);

export const getBuildings = ({
  size = { min: 0, max: -1 },
  types = ['industrial', 'office', 'retail'],
} = {}) => {
  const filters = joinFilters([
    filterBy('building_type', types),
  ]);

  return callApi(`buildings?${filters}&include=attachments`);
};
export const getCovers = (ids) => {
  // const idString = ids.reduce((str, id) => `${str},${id}`);
  // return callApi(`attachments?filter[where][id]=${idString}&filter[where][category]=exterior&include=media`);
  const filters = joinFilters([
    filterBy('id', ids),
    filterBy('category', ['exterior']),
  ]);

  return callApi(`attachments?${filters}&include=media`);
};

export const api = {
  getBuildings,
  getCovers,
};

export default api;
