import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';

/**
 * Return message for HTTP status code
 * @param {number} status - HTTP status code
 * @returns {string} Message of network operation
 */
function _getStatusMessage(status) {
  switch (status) {
    case 200:
      return 'All done. Request successfully executed';
    case 201:
      return 'Data successfully created';
    case 400:
      return 'Bad Request';
    case 401:
      return 'Need auth';
    case 404:
      return 'Not found';
    case 503:
      return 'Service Unavailable';
    default:
      return 'Something wrong. Client default error message';
  }
}

function _getResponseErrorMessage(error) {
  if (error.response && error.response.data) return error.response.data.description;
  if (error.response && error.response.statusText) return error.response.statusText;
  if (error.message) return error.message;
  return '_getResponseErrorMessage can\'t handle error';
}

/**
 * Create instant, which represent response object
 * @param {Object} [data] - custom data
 * @param {Object} [response] - axios response object
 * @param {String} [message] - custom message to display
 */
export class ResponseWrapper {
  public data = {};
  public success: boolean;
  public status: string;
  public statusMessage: string;
  public message: string;

  constructor(response?, data?, message?) {
    this.data = data;
    this.success = response.data.success;
    this.status = response.status;
    this.statusMessage = _getStatusMessage(this.status);
    this.message = message || null;
  }
}

/**
 * Create instant, which represent error object
 * @param {Object} [error] - axios error object
 * @param {String} [message] - custom message to display
 */
export class ErrorWrapper extends Error {
  public success: boolean;
  public status: string;
  public statusMessage: string;

  constructor(error?, message?) {
    super();
    this.name = 'ErrorWrapper';
    this.stack = new Error().stack;
    this.success = error.response ? error.response.data.success : false;
    this.status = error.response ? error.response.status : false;
    this.statusMessage = _getStatusMessage(this.status);
    this.message = message || _getResponseErrorMessage(error);
  }
}

/**
 * Uses to clear request data before send it
 * Client shouldn't change entity id
 * @param data
 * @return {{}}
 */
export function clearData(data) {
  let result = {};
  forEach(data, (item, propName) => {
    if (isArray(item) && item.length) {
      result[propName] = item;
    }
    if (!isArray(item) && item && (propName !== 'id')) {
      result[propName] = item;
    }
  });
  return result;
}
