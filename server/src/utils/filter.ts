type ImportedObject = {
  [key: string]: any
}

/**
 * @param object
 * const inputObject = {
 *    name: 'John',
 *    age: 30,
 *    city: 'New York'
 * };
 *
 * @usage
 * const filteredObject = queryFilter(inputObject, ['name', 'age']);
 * console.log(filteredObject);
 *
 * @output { name: 'John', age: 30 }
 */

export const queryFilter = (object: ImportedObject, keys: string[] = []) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key]
    }
    return obj
  }, {})
}
