/* eslint-disable no-underscore-dangle */
import { NavigationContainer, useNavigation,useLinkTo } from '@react-navigation/native';
import i18n from 'i18n-js';
import React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { connect, Provider, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import checkModel from './checkModel';
import getReducer from './getReducer';
import getSaga from './getSaga';
import createLoading from './loading';
import prefixNamespace from './prefixNamespace';
// eslint-disable-next-line import/no-mutable-exports
let dispatch;

const localeModel = {
  namespace: 'locale',
  state: {
    locale: 'en',
  },
  effects: {
    * setLocale({ lang }, { put }) {
      i18n.locale(lang);
      yield put({
        type: 'saveLocale',
        locale: lang,
      });
    },
  },
  reducers: {
    saveLocale(state, { locale }) {
      return {
        ...state,
        locale,
      };
    },
  },
};
const navigationRef = React.createRef();

export function coreApp() {
  const app = {
    _store: null,
    _models: [prefixNamespace({ ...localeModel })],
    _router: View,
    _linking: {
      prefixes: ['https://app.example.com'],
    },
    model,
    start,
    router,
    locales,
    linking,
  };

  return app;

  function model(m) {
    if (process.env.NODE_ENV !== 'production') {
      checkModel(m, app._models);
    }
    const prefixedModel = prefixNamespace({ ...m });
    app._models.push(prefixedModel);
    return prefixedModel;
  }

  function router(r) {
    app._router = r;
  }

  function locales(newLocales) {
    i18n.translations = { ...newLocales };
    i18n.locale = 'en';
    i18n.fallbacks = true;
  }

  function linking(linkingConfigure) {
    app._linking = {
      ...app._linking,
      ...linkingConfigure,
    };
    console.log('linking-linking-84:', app._linking);
  }

  function start() {
    // Global error handler
    const onError = (err) => {
      if (err) {
        if (typeof err === 'string') err = new Error(err);
        err.preventDefault = () => {
          err._dontReject = true;
        };
      }
    };
    const loading = createLoading();
    const reducers = {};
    const sagas = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const m of app._models) {
      reducers[m.namespace] = getReducer(m.reducers, m.state || null);
      if (m.effects) {
        sagas.push(getSaga(m.effects, m, onError, [loading.onEffect]));
      }
    }
    const sagaMiddleware = createSagaMiddleware();

    app._store = createStore(
      combineReducers({
        ...reducers,
        ...loading.extraReducers,
      }),
      applyMiddleware(sagaMiddleware),
    );
    const store = app._store;

    // Run sagas
    sagas.forEach(sagaMiddleware.run);

    dispatch = store.dispatch;
    const Router = app._router;

    const CoreRoot = ({ ...props }) => (
      <Provider store={store}>
        <NavigationContainer ref={navigationRef} linking={app._linking}>
          <Router />
          {props.children}
        </NavigationContainer>
      </Provider>
    );
    return CoreRoot;
  }
}

const trans = i18n.t;
const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};
export { connect, dispatch, trans, navigate, useSelector, useNavigation,useLinkTo };
