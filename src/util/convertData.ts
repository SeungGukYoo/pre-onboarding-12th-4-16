import { TResponse } from '../..';

type DataObj = {
  id: string[];
  labels: string[];
  bar: number[];
  area: number[];
};

type ParsedJson = {
  response: TResponse;
};

export class ConvertData {
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
    };

    for (const data in json) {
      DataObj.id.push(json[data].id);
      DataObj.labels.push(data.split(' ')[1]);
      DataObj.bar.push(json[data].value_bar);
      DataObj.area.push(json[data].value_area);
    }
    return DataObj;
  }
}
