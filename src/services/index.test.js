import test from 'ava';
import nock from 'nock';
import {
  getBuildings,
  getCovers,
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

test('(API) getBuildings - size filter', function *(t) {
  const endpoint = '/buildings?filter[where][building_size.value][lt]=5000&include=attachments';
  const success = { success: true };

  nock(listingsApi)
    .get(endpoint)
    .reply(200, success);

  const response = yield getBuildings({ max: 5000 });
  t.deepEqual(response, success);
});

test('(API) getBuildings - type filter', function *(t) {
  const endpoint = '/buildings?filter[where][building_type]=retail&include=attachments';
  const success = { success: true };

  nock(listingsApi)
    .get(endpoint)
    .reply(200, success);

  const response = yield getBuildings({}, ['retail']);
  t.deepEqual(response, success);
});

test('(API) getBuildings - pagination', function *(t) {
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

test('(API) getCovers - no limit', function *(t) {
  const endpoint = '/attachments?filter[where][id]=123,456&filter[where][category]=exterior&include=media';
  const success = { success: true };

  nock(listingsApi)
    .get(endpoint)
    .reply(200, success);

  const response = yield getCovers(['123', '456']);
  t.deepEqual(response, success);
});

test('(API) getCovers - limit passed', function *(t) {
  const endpoint = '/attachments?filter[where][id]=123,456&filter[where][category]=exterior&page[limit]=50&include=media';
  const success = { success: true };

  nock(listingsApi)
    .get(endpoint)
    .reply(200, success);

  const response = yield getCovers(['123', '456'], 50);
  t.deepEqual(response, success);
});
