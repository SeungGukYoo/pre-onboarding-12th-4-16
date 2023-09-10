import { TResponse } from '../..';

export class ConvertData {
  #areaNames: Array<string>;
  #areaDatas: Array<number>;
  #barDatas: Array<number>;
  #jsonData: TResponse;
  constructor() {
    this.#areaDatas = [];
    this.#areaNames = [];
    this.#barDatas = [];
    this.#jsonData = {};
  }

  async getAreaData(path: string) {
    console.log(path);
    const response = await fetch(`/data/${path}`);
    const json = await response.json();
    return json.response;
  }
}
