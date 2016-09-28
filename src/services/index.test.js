import test from 'ava';
import nock from 'nock';
import {
  getBuildings,
  listingsApi,
} from '../services';

// ------------------------------------
// getBuildings
// ------------------------------------

test('(API) getBuildings - default', function *(t) {
  const endpoint = '/buildings?include=attachments';
  const success = { success: true };

  nock(listingsApi)
    .get(endpoint)
    .reply(200, success);

  const response = yield getBuildings();
  t.deepEqual(response, success);
});

test('(API) getBuildings - custom size filter', function *(t) {
  const endpoint = '/buildings?filter[where][building_size.value][lt]=5000&include=attachments';
  const success = { success: true };

  nock(listingsApi)
    .get(endpoint)
    .reply(200, success);

  const response = yield getBuildings({ max: 5000 });
  t.deepEqual(response, success);
});

test('(API) getBuildings - custom type filter', function *(t) {
  const endpoint = '/buildings?filter[where][building_type]=retail&include=attachments';
  const success = { success: true };

  nock(listingsApi)
    .get(endpoint)
    .reply(200, success);

  const response = yield getBuildings({}, ['retail']);
  t.deepEqual(response, success);
});

test('(API) getBuildings - custom type filter', function *(t) {
  const endpoint = '/buildings?page[offset]=100&page[limit]=100&include=attachments';
  const success = { success: true };

  nock(listingsApi)
    .get(endpoint)
    .reply(200, success);

  const response = yield getBuildings(null, null, { limit: 100, offset: 100 });
  t.deepEqual(response, success);
});

test('(API) getBuildings - fail', function *(t) {
  t.plan(1);

  const endpoint = '/buildings?include=attachments';
  const fail = { success: false };

  nock(listingsApi)
    .get(endpoint)
    .reply(422, fail);

  try {
    yield getBuildings();
  }
  catch (error) {
    t.deepEqual(error, fail);
  }
});

// ------------------------------------
// getCovers
// ------------------------------------
