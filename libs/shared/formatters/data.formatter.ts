export const dataComparable = (
  arr: Array<any>,
  targetArray: Array<any>,
  targetKey: string
): Array<any> => {
  const newArr: Array<any> = Object.assign([], arr || []);
  const comparable: any = {};

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item) {
      const keyId = item[targetKey];
      comparable[keyId] = item;
    }
  }

  for (let i = 0; i < targetArray.length; i++) {
    const item = targetArray[i];
    if (item) {
      const keyId = item[targetKey];
      const comparableItem = comparable[keyId];
      if (!comparableItem) {
        newArr.push(item);
      }
    }
  }
  return newArr;
};
