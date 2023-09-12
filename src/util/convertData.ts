import { IConvertData, ParsedJson, TDataObj, TResponse } from '../..';

export class ConvertData implements IConvertData {
  #defaultBarColor: string;
  #defaultLineColor: string;
  #defaultLineBorderColor: string;
  constructor() {
    this.#defaultBarColor = 'rgba(255, 99, 132, 0.2)';
    this.#defaultLineColor = 'rgba(75, 192, 192, 0.7)';
    this.#defaultLineBorderColor = 'rgba(75, 192, 192, 0.7)';
  }
  async getData(path: string) {
    const response = await fetch(`/data/${path}`);
    const json: ParsedJson = await response.json();

    const result = this.convertDataStructor(json.response);

    return result;
  }

  private convertDataStructor(json: TResponse) {
    const DataObj: TDataObj = {
      id: [],
      labels: [],
      bar: [],
      area: [],
      barColor: [],
      lineColor: [],
      borderColor: [],
    };
    for (const data in json) {
      DataObj.id.push(json[data].id);
      DataObj.labels.push(data.split(' ')[1]);
      DataObj.bar.push(json[data].value_bar);
      DataObj.barColor.push(this.#defaultBarColor);
      DataObj.lineColor.push(this.#defaultLineColor);
      DataObj.area.push(json[data].value_area);
      DataObj.borderColor.push(this.#defaultLineBorderColor);
    }
    return DataObj;
  }
}
