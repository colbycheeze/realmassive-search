import test from 'ava';
import { reducerTest, actionTest } from 'redux-ava';
import { call, take, select, put } from 'redux-saga/effects';
import api from 'services';
import mockApi from 'services/mockApi';
import {
  GET_BUILDINGS,
  GET_BUILDINGS_SUCCESS,
  UPDATE_TYPE_FILTER,
  getBuildings,
  getBuildingsSuccess,
  getCoversSuccess,
  updateTypeFilter,
  buildingsReducer,
  buildingsSelector,
  watchGetBuildings,
} from './buildings';


test('(Selector) returns the slice of state for buildings.', t => {
  t.deepEqual(buildingsSelector({ buildings: { mock: true } }), { mock: true });
});


test('(Constant) GET_BUILDINGS === "buildings/GET_BUILDINGS"', t => {
  t.is(GET_BUILDINGS, 'buildings/GET_BUILDINGS');
});

test('(Constant) GET_BUILDINGS_SUCCESS === "buildings/GET_BUILDINGS_SUCCESS"', t => {
  t.is(GET_BUILDINGS_SUCCESS, 'buildings/GET_BUILDINGS_SUCCESS');
});

test('(Constant) UPDATE_TYPE_FILTER === "buildings/UPDATE_TYPE_FILTER"', t => {
  t.is(UPDATE_TYPE_FILTER, 'buildings/UPDATE_TYPE_FILTER');
});

test('(Action) getBuildings',
  actionTest(
    getBuildings,
    undefined,
    { type: GET_BUILDINGS })
  );

test('(Action) getBuildingsSuccess',
  actionTest(
    getBuildingsSuccess,
    { data: 'mock' },
    { type: GET_BUILDINGS_SUCCESS, payload: { data: 'mock' } })
  );

test('(Action) updateTypeFilter',
  actionTest(
    updateTypeFilter,
    ['retail'],
    { type: UPDATE_TYPE_FILTER, payload: ['retail'] })
  );

test('(Reducer) initializes with default state', t => {
  const initial = {
    filters: {
      types: [],
      size: {},
      page: {
        offset: 26,
        limit: 25,
      },
    },
    ids: [],
    data: {},
    count: 0,
  };

  t.deepEqual(buildingsReducer(undefined, initial), initial);
});

test('(Reducer) return previous state when no action is matched', reducerTest(
  buildingsReducer,
  {},
  { type: '@@@@@@@' },
  {},
));

test('(Reducer) doesnt try to handle getBuildings Saga', reducerTest(
  buildingsReducer,
  {},
  getBuildings(),
  {},
));


test('(Reducer) GET_BUILDINGS_SUCCESS - maps api payload to state', reducerTest(
  buildingsReducer,
  {},
  getBuildingsSuccess(mockApi.getBuildings({
    street: '123 street',
    size: '5000',
    id: '123456',
  })),
  {
    ids: ['123456'],
    data: {
      123456: {
        id: '123456',
        title: 'Generic Building Title',
        street: '123 street',
        type: 'office',
        size: 5000,
      },
    },
    count: 1,
  },
));

test('(Reducer) GET_COVERS_SUCCESS - matches and adds covers to building data object', reducerTest(
  buildingsReducer,
  {
    data: {
      buildingId: {
        id: 'buildingId',
        title: 'Generic Building Title',
        street: '123 street',
        type: 'office',
        size: 5000,
      },
      anotherId: {
        id: 'anotherId',
        title: 'Generic Building Title',
        street: '123 street',
        type: 'office',
        size: 5000,
      },
    },
  },
  getCoversSuccess(mockApi.getCovers({
    id: 'attachmentId',
    buildingId: 'buildingId',
    mediaId: 'mediaId',
    cover: 'http://cover.com',
  })),
  {
    data: {
      buildingId: {
        id: 'buildingId',
        title: 'Generic Building Title',
        street: '123 street',
        type: 'office',
        size: 5000,
        cover: 'http://cover.com',
      },
      anotherId: {
        id: 'anotherId',
        title: 'Generic Building Title',
        street: '123 street',
        type: 'office',
        size: 5000,
      },
    },
  },
));

test('(Reducer) UPDATE_TYPE_FILTER - adds type to state if it doesnt exist', reducerTest(
  buildingsReducer,
  {
    filters: {
      types: ['office'],
      size: {},
      page: {},
    },
  },
  updateTypeFilter(['retail', 'industrial']),
  {
    filters: {
      types: ['retail', 'industrial'],
      size: {},
      page: {},
    },
  },
));

/*
test('Mapping', t => {
const payload = mockApi.getBuildings();
const ids = payload.data
.filter(building => building.relationships.attachments)
.map(building => building.relationships.attachments.data.map(attachment => attachment.id))
.reduce((a, b) => a.concat(b)); // flatten array

console.log('IDS: ');
console.log(ids);
t.pass();
});
*/
