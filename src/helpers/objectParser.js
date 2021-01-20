import { forOwn, isObject, includes, replace } from 'lodash';

function replaceDashWithUnderscore(obj) {
  let result = {}
  forOwn(obj, (value, key) => {
    // if key has a period, replace all occurences with an underscore
    if (includes(key, '-')) {
      const cleanKey = replace(key, /-/g, '_');
      result[cleanKey] = value;
    } else {
      result[key] = value;
    }

    // continue recursively looping through if we have an object or array
    if (isObject(value)) {
      return replaceDashWithUnderscore(value);
    }
  });
  return result;
}

export { replaceDashWithUnderscore };
