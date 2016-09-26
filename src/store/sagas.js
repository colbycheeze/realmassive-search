import { fork } from 'redux-saga/effects';

const buildingsSagas = require('modules/buildings').sagas;

export const makeRootSaga = (asyncSagas) => function *rootSaga() {
  yield [
    ...buildingsSagas,
    ...asyncSagas,
  ].map(saga => fork(saga));
};

export const injectSagas = (store, { key, sagas }) => {
  if (store.asyncSagas[key]) {
    return;
  }
  store.asyncSagas[key] = sagas; //eslint-disable-line
  store.runSaga(makeRootSaga(sagas));
};

export default makeRootSaga;
