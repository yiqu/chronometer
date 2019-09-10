export function objectToArray<T>(obj: any) {
  let list: T[] = [];
  if (obj) {
    for (let key in obj) {
      list.push(obj[key]);
    }
  }
  return list;
}