import { race, call, take, put, select } from 'redux-saga/effects';
import api from 'services';
import _get from 'lodash/get';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_BUILDINGS = 'buildings/GET_BUILDINGS';
export const GET_BUILDINGS_SUCCESS = 'buildings/GET_BUILDINGS_SUCCESS';
export const GET_COVERS_SUCCESS = 'buildings/GET_COVERS_SUCCESS';
export const UPDATE_TYPE_FILTER = 'buildings/UPDATE_TYPE_FILTER';
export const UPDATE_SIZE_FILTER = 'buildings/UPDATE_SIZE_FILTER';

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

export const updateSizeFilter = (payload) => ({
  type: UPDATE_SIZE_FILTER,
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
    ids: action.payload.data.map(building => building.id),
    data: action.payload.data
      .map(building => ({
        id: building.id,
        title: _get(building, 'attributes.title', 'unknown'),
        street: _get(building, 'attributes.address.street', 'unknown'),
        type: _get(building, 'attributes.building_type', 'unknown'),
        size: Math.floor(_get(building, 'attributes.building_size.value', 'unknown')),
      }))
      .reduce((map, obj) => {
        map[obj.id] = obj; // eslint-disable-line
        return map;
      }, {}),
    count: action.payload.meta.count,
  }),
  [GET_COVERS_SUCCESS]: (state, action) => {
    const mappings = action.payload.data
      .map(attachment => ({
        building: _get(attachment, 'relationships.buildings.links.related').split('buildings/')[1],
        media: _get(attachment, 'relationships.media.data.id'),
      }))
      .reduce((map, obj) => {
        map[obj.media] = obj; // eslint-disable-line
        return map;
      }, {});

    const data = {};
    action.payload.included.forEach(media => {
      const id = mappings[media.id].building;

      data[id] = {
        ...state.data[id],
        cover: media.attributes.url,
      };
    });

    return {
      ...state,
      data: Object.assign({}, state.data, data),
    };
  },
  [UPDATE_TYPE_FILTER]: (state, action) => ({
    ...state,
    filters: {
      ...state.filters,
      types: [...action.payload],
    },
  }),
  [UPDATE_SIZE_FILTER]: (state, action) => ({
    ...state,
    filters: {
      ...state.filters,
      size: action.payload,
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
    page: {
      offset: 26,
      limit: 25,
    },
  },
  ids: [],
  data: {},
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
      yield put(getBuildingsSuccess(buildings));

      const ids = buildings.data
        .filter(building => _get(building, 'relationships.attachments', false))
        .map(building => building.relationships.attachments.data.map(attachment => attachment.id))
        .reduce((a, b) => a.concat(b)); // flatten array

      const covers = yield call(api.getCovers, ids, page.limit);
      yield put(getCoversSuccess(covers));
    }
    catch (error) {
      console.error('Get Buildings Failure');
      console.error(error);
    }
  }
}

export function *watchUpdateFilter() {
  while (true) {
    yield race({
      type: take(UPDATE_TYPE_FILTER),
      size: take(UPDATE_SIZE_FILTER),
    });

    yield put(getBuildings());
  }
}

export const sagas = [
  watchGetBuildings,
  watchUpdateFilter,
];
