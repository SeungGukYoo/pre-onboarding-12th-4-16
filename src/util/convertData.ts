import { TResponse } from '../..';

type DataObj = {
  id: string[];
  labels: string[];
  bar: number[];
  area: number[];
  barColor: string[];
};

type ParsedJson = {
  response: TResponse;
};

export class ConvertData {
  #defaultBarColor: string;

  constructor() {
    this.#defaultBarColor = 'rgba(255, 99, 132, 0.2)';
  }
  async getData(path: string) {
    const response = await fetch(`/data/${path}`);
    const json: ParsedJson = await response.json();

    const result = this.convertDataStructor(json.response);

    return result;
  }

  convertDataStructor(json: TResponse) {
    const DataObj: DataObj = {
      id: [],
      labels: [],
      bar: [],
      area: [],
      barColor: [],
    };
    for (const data in json) {
      DataObj.id.push(json[data].id);
      DataObj.labels.push(data.split(' ')[1]);
      DataObj.bar.push(json[data].value_bar);
      DataObj.barColor.push(this.#defaultBarColor);
      DataObj.area.push(json[data].value_area);
    }
    return DataObj;
  }
}
