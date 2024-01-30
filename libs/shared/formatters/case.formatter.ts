export function camelToSnakeCase(str: string) {
  return str?.replace(/[A-Z0-9]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function snakeToCamelCase(str: string) {
  return str
    .toLowerCase()
    .replace(/([-_][a-z0-9])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', '')
    );
}
