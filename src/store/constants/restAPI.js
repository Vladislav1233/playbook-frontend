const REST_API: string = 'REST_API';
const API_URL: string = process.env.REACT_APP_API_URL;

const GET: string = 'GET';
const PUT: string = 'PUT';
const POST: string = 'POST';
const DELETE: string = 'DELETE';
const REST_API_ERROR: string = 'REST_API_ERROR';

const CONTENT_TYPE = {
  FORM: 'multipart/form-data',
  JSON: 'application/json'
};

const ENVIRONMENT = {
  development: 'development',
  production: 'production'
};

type RequestDefaults = {
  mode: string,
  credentials: string
};

const requestDefaults: RequestDefaults = { mode: 'cors', credentials: 'include' };

export { REST_API, GET, POST, PUT, DELETE, REST_API_ERROR, requestDefaults, CONTENT_TYPE, API_URL, ENVIRONMENT };