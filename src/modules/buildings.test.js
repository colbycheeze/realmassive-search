import test from 'ava';
import { reducerTest, actionTest } from 'redux-ava';
import { call, take, select, put } from 'redux-saga/effects';
import api from 'services';
import {
  GET_BUILDINGS,
  GET_BUILDINGS_SUCCESS,
  UPDATE_TYPE_FILTER,
  getBuildings,
  getBuildingsSuccess,
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
      page: {},
    },
    data: [],
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
