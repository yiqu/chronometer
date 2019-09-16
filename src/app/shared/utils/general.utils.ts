export function objectToArray<T>(obj: any) {
  let list: T[] = [];
  if (obj) {
    for (let key in obj) {
      let item = obj[key];
      item['hashKey'] = key;
      list.push(item);
    }
  }
  return list;
}

export function randomIntFromInterval(min: number, max: number) { 
  return Math.floor(Math.random() * (max - min + 1) + min);
}