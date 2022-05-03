export const GET_CONSENTS = 'GET_CONSENTS';
export const GET_CONSENTS_DONE = 'GET_CONSENTS_DONE';
export const GET_CONSENTS_ERROR = 'GET_CONSENTS_ERROR';

export const POST_CONSENT = 'POST_CONSENT';
export const POST_CONSENT_DONE = 'POST_CONSENT_DONE';
export const POST_CONSENT_ERROR = 'POST_CONSENT_ERROR';

export const CLEAR_BEHAVIOR = 'CLEAR_BEHAVIOR';

const apiDomain = `${process.env.REACT_APP_APIDOMAIN || ''}/api`;
const queryString = obj =>
  Object.keys(obj).reduce(
    (res, key, index) => `${res}${index === 0 ? '?' : '&'}${key}=${obj[key]}`, 
    ''
  )

export const clearBehavior = () => ({ type: CLEAR_BEHAVIOR });

export const getConsents = options => async dispatch => {
  dispatch({ type: GET_CONSENTS });
  try {
    let _request = await fetch(`${apiDomain}/consents${queryString(options)}`);
    _request = await _request.json();
    const { data, error, status } = _request;
    if (status === 200) {
      return dispatch({ type: GET_CONSENTS_DONE, data });
    }
    return dispatch({ type: GET_CONSENTS_ERROR, error })
  } catch (error) {
    dispatch({ type: GET_CONSENTS_ERROR, error: JSON.stringify(error) });
  }
}

export const postConsent = body => async dispatch => {
  dispatch({ type: POST_CONSENT });
  try {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    let _request = await fetch(`${apiDomain}/consents`, { 
      method: 'POST',
      headers, body
    });
    _request = await _request.json();
    const { data, error, status } = _request;
    if (status === 200) {
      return dispatch({ type: POST_CONSENT_DONE, data });
    }
    return dispatch({ type: POST_CONSENT_ERROR, error })
  } catch (error) {
    dispatch({ type: POST_CONSENT_ERROR, error: JSON.stringify(error) });
  }
}
