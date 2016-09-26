import { call, take, put, select } from 'redux-saga/effects';
import api from 'services';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_BUILDINGS = 'buildings/GET_BUILDINGS';
export const GET_BUILDINGS_SUCCESS = 'buildings/GET_BUILDINGS_SUCCESS';
export const GET_COVERS_SUCCESS = 'buildings/GET_COVERS_SUCCESS';
export const TOGGLE_TYPE_FILTER = 'buildings/TOGGLE_TYPE_FILTER';

export const buildingsSelector = state => state.buildings;

// ------------------------------------
// Actions
// ------------------------------------
export const getBuildings = () => ({
  type: GET_BUILDINGS,
});

export const toggleTypeFilter = (payload) => ({
  type: TOGGLE_TYPE_FILTER,
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
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_BUILDINGS_SUCCESS]: (state, action) => ({
    ...state,
    data: action.payload.data.map(building => ({
      title: building.attributes.title,
      street: building.attributes.address.street,
      type: building.attributes.building_type,
      size: Math.floor(building.attributes.building_size.value),
    })),
    count: action.payload.meta.count,
  }),
  [GET_COVERS_SUCCESS]: (state, action) => ({
    ...state,
    covers: action.payload.included.map(media => media.attributes.url),
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  filters: {
    types: ['industrial', 'office', 'retail'],
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
    const { filters } = yield select(buildingsSelector);
    try {
      const buildings = yield call(api.getBuildings, { types: filters.types });
      yield put(getBuildingsSuccess(buildings));

      // const ids = buildings.included.map(attachment => attachment.id);
      // const covers = yield call(api.getCovers, ids);
      // yield put(getCoversSuccess(covers));
    }
    catch (error) {
      console.error('Get Buildings Failure');
      console.error(error);
    }
  }
}

export const sagas = [
  watchGetBuildings,
];
