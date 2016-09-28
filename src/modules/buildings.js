import { call, take, put, select } from 'redux-saga/effects';
import api from 'services';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_BUILDINGS = 'buildings/GET_BUILDINGS';
export const GET_BUILDINGS_SUCCESS = 'buildings/GET_BUILDINGS_SUCCESS';
export const GET_COVERS_SUCCESS = 'buildings/GET_COVERS_SUCCESS';
export const UPDATE_TYPE_FILTER = 'buildings/UPDATE_TYPE_FILTER';

export const buildingsSelector = state => state.buildings;

// ------------------------------------
// Actions
// ------------------------------------
export const getBuildings = () => ({
  type: GET_BUILDINGS,
});

export const updateTypeFilter = (payload) => ({
  type: UPDATE_TYPE_FILTER,
  payload,
});

export const getBuildingsSuccess = (payload) => ({
  type: GET_BUILDINGS_SUCCESS,
  payload,
});

export const getCoversSuccess = (payload) => ({
  type: GET_COVERS_SUCCESS,
  payload,
});

export const actions = {
  getBuildings,
  getBuildingsSuccess,
  getCoversSuccess,
  updateTypeFilter,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_BUILDINGS_SUCCESS]: (state, action) => ({
    ...state,
    buildingsPayload: action.payload,
    data: action.payload.data.map(building => ({
      title: building.attributes.title,
      street: building.attributes.address.street,
      type: building.attributes.building_type || 'unknown',
      size: Math.floor(building.attributes.building_size.value),
    })),
    count: action.payload.meta.count,
  }),
  [GET_COVERS_SUCCESS]: (state, action) => ({
    ...state,
    coversPayload: action.payload,
    covers: action.payload.included.map(media => media.attributes.url),
  }),
  [UPDATE_TYPE_FILTER]: (state, action) => ({
    ...state,
    filters: {
      ...state.filters,
      types: [...action.payload],
    },
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  filters: {
    types: [],
    size: {},
    page: {},
  },
  data: [],
  count: 0,
};
export const buildingsReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
export default buildingsReducer;

// ------------------------------------
// Sagas
// ------------------------------------
export function *watchGetBuildings() {
  while (true) {
    yield take(GET_BUILDINGS);
    const state = yield select(buildingsSelector);
    const { types, size, page } = state.filters;

    try {
      const buildings = yield call(api.getBuildings, size, types, page);
      console.log('Buildings payload:');
      console.log(buildings);
      yield put(getBuildingsSuccess(buildings));

      const ids = buildings.included.map(attachment => attachment.id);
      const covers = yield call(api.getCovers, ids);
      console.log('Covers payload:');
      console.log(covers);
      yield put(getCoversSuccess(covers));
    }
    catch (error) {
      console.error('Get Buildings Failure');
      console.error(error);
    }
  }
}

export function *watchUpdateTypeFilter() {
  while (true) {
    yield take(UPDATE_TYPE_FILTER);
    yield put(getBuildings());
  }
}

export const sagas = [
  watchGetBuildings,
  watchUpdateTypeFilter,
];
