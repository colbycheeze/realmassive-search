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
  `filter[where]${type}=${filters.reduce((str, value) => `${str},${value}`)}`;

const paginateBy = (limit, offset) =>
 `page[offset]=${offset || 1000}&page[limit]=${limit || 10}`;

const joinFilters = (filters) => filters.reduce((str, filter) => `${str}&${filter}`);

export const getBuildings = (size, types, paginate) => {
  let filters = [];
  if (types && types.length > 0) filters.push(filterBy('[building_type]', types));
  if (size && size.min) filters.push(filterBy('[building_size.value][gt]', [size.min]));
  if (size && size.max) filters.push(filterBy('[building_size.value][lt]', [size.max]));
  if (paginate) filters.push(paginateBy(paginate.limit, paginate.offset));

  filters = filters.length > 0 ? `${joinFilters(filters)}&` : '';

  return callApi(`buildings?${filters}include=attachments`);
};

export const getCovers = (ids) => {
  const filters = joinFilters([
    filterBy('[id]', ids),
    filterBy('[category]', ['exterior']),
  ]);

  // return callApi(`attachments?${filters}&include=media`);
  return callApi(`attachments?${filters}&page[limit]=10&include=media`);
};

export const api = {
  getBuildings,
  getCovers,
};

export default api;
