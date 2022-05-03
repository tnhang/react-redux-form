import { combineReducers } from 'redux';
import get from 'lodash/get';

import {
  GET_CONSENTS, GET_CONSENTS_DONE, GET_CONSENTS_ERROR,
  POST_CONSENT, POST_CONSENT_DONE, POST_CONSENT_ERROR,
  CLEAR_BEHAVIOR
} from './actions';

const listReducer = (state = {
  fetching: false,
  list: [],
  meta: null,
  error: null
}, action) => {
  switch (action.type) {
    case GET_CONSENTS:
      return {
        ...state,
        fetching: true
      }
    case GET_CONSENTS_DONE:
      return {
        ...state,
        fetching: false,
        list: get(action, 'data.list', []),
        meta: get(action, 'data.meta', null)
      }
    case GET_CONSENTS_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case CLEAR_BEHAVIOR:
      return {
        ...state,
        fetching: false,
        error: null
      }
    default: return state;
  }
}

const formReducer = (state = {
  fetching: false,
  message: null,
  error: false
}, action) => {
  switch (action.type) {
    case POST_CONSENT:
      return {
        ...state,
        fetching: true
      }
    case POST_CONSENT_DONE:
      return {
        ...state,
        fetching: false,
        error: false,
        message: 'Successfuly submit'
      }
    case POST_CONSENT_ERROR:
      return {
        ...state,
        fetching: false,
        error: true,
        message: action.error
      }
    case CLEAR_BEHAVIOR:
      return {
        ...state,
        fetching: false,
        message: null,
        error: false
      }
    default: return state;
  }
}

const rootReducer = combineReducers({
  listReducer,
  formReducer
});

export default rootReducer;