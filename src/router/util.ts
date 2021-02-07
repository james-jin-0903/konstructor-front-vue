/**
 * get query params from URL(via default vue query object)
 * and pass it to component props
 */
import { Route } from 'vue-router';

export function routePropResolver(routeOptions: Route) {
  let { query } = routeOptions;
  let resultQuery: any = {};

  Object.keys(query).forEach((key: string) => {
    const value: any = query[key];
    if (value.length && !['0', 'null', 'undefined', 'NaN'].includes(value)) {
      resultQuery[key] = value;
    }
    if (parseInt(value)) {
      resultQuery[key] = +value;
    }
  });
  return resultQuery;
}

/**
 * validate route limit
 * API have default limit equals to 10, so we don't need send it
 * @param {int} limit
 * @return {boolean}
 */
export function isValidLimitQuery(limit: string) {
  return [20, 30, 40, 50, 100].includes(+limit);
}

/**
 * validate route page
 * API have default page equals to 0, so we don't need send it
 * @param {int} page
 * @return {boolean}
 */
export function isValidPageQuery(page: string) {
  return +page >= 1;
}


export function scrollBehavior() {
  setTimeout(() => {
    const main = document.querySelector('.layoutMain__main');
    if (main) {
      main.scrollTo(0, 0);
    }
  }, 100);
}
