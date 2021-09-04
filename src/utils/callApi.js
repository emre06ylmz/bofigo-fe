import 'whatwg-fetch';
import { message } from 'antd';

function sanitizeEndpoint(endpoint) {
  return endpoint.charAt(0) !== '/' ? '/' + endpoint : endpoint;
}

export default function callApi(params = {}) {
  let apiParams = {
    method: 'GET',
    body: undefined,
    url: '',
    notifyErrors: true,
    endpoint: null,
  };

  if (typeof params === 'string') {
    apiParams.url = params;
  } else {
    apiParams = { ...apiParams, ...params };
    if (typeof apiParams.endpoint === 'string') {
      apiParams.url = `${process.env.REACT_APP_API_ENDPOINT}${sanitizeEndpoint(apiParams.endpoint)}`;
    }
  }

  return fetch(apiParams.url, {
    method: apiParams.method,
    headers: {
      'Content-Type': 'application/json',
      ...apiParams.headers,
    },
    mode: 'cors',
    cache: 'no-cache',
    withCredentials: true,
    credentials: 'include',
    body: JSON.stringify(apiParams.body),
  })
    .then(response => {
      if (response.status !== 204) {
        return response.json().then(json => ({ json, response }));
      } else {
        return { json: [], response };
      }
    })
    .then(({ json = [], response }) => {
      if (!response.ok) {
        // if (response.status === 400 || apiParams.notifyErrors) {
        let title = json.error ? json.error : response.status;
        let contentText = json.message ? json.message : 'Bir hata oluştu, lütfen tekrar deneyiniz.';
        let status = json.status ? json.status : response.status;
        message.error(contentText);
        // }
        return Promise.reject(json);
      }
      return json;
    })
    .catch(error => {
      //message.error();
      return Promise.reject(error);
    });
}
