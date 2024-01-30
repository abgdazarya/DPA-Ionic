import { camelToSnakeCase, snakeToCamelCase } from './case.formatter';

export function convertEntries(entries: any): any {
  if (typeof entries !== 'object' && entries !== null) {
    return entries;
  }

  let tempEntries: any = {};
  for (const [key, value] of Object.entries(entries)) {
    if (Array.isArray(value)) {
      const tempArr = value.map((valChild, index) => convertEntries(valChild));

      tempEntries[`${snakeToCamelCase(key)}`] = tempArr;
    } else if (typeof value === 'object' && value !== null) {
      tempEntries[`${snakeToCamelCase(key)}`] = convertEntries(value);
    } else {
      tempEntries[`${snakeToCamelCase(key)}`] = value;
    }
  }

  return tempEntries;
}

export function convertToParams(entries: any): any {
  if (typeof entries !== 'object' && entries !== null) {
    return entries;
  }

  let tempEntries: any = {};
  for (const [key, value] of Object.entries(entries)) {
    if (Array.isArray(value)) {
      const tempArr = value.map((valChild, index) => convertEntries(valChild));

      tempEntries[`${camelToSnakeCase(key).toUpperCase()}`] = tempArr;
    } else if (typeof value === 'object' && value !== null) {
      tempEntries[`${camelToSnakeCase(key).toUpperCase()}`] =
        convertEntries(value);
    } else {
      tempEntries[`${camelToSnakeCase(key).toUpperCase()}`] = value;
    }
  }

  return tempEntries;
}
