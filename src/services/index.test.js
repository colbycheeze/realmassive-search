import test from 'ava';
import nock from 'nock';
import {
  getBuildings,
  listingsApi,
} from '../services';

test('(API) getBuildings', function *(t) {
  t.plan(2);

  const endpoint = '/buildings';
  const success = { id: 123, name: 'demo' };

  nock(listingsApi)
    .get(endpoint)
    .reply(200, success);

  const response = yield getBuildings();
  t.deepEqual(response, success);

  const fail = { message: 'Invalid email address' };
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
