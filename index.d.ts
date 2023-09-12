export interface Props {
  children: React.ReactNode;
  convertData: ConvertData;
}
export type FoucsLocation = 'none' | string;

export type TResponse = {
  [timestamp: string]: {
    id: string;
    value_area: number;
    value_bar: number;
  };
};

export interface IColorDatas {
  barColor: string[];
  lineColor: string[];
  borderColor: string[];
}

export interface contextType {
  areaData: convertData;
  changeColor: (areaName: string, colorData: IColorDatas) => void;
  currentFocusLocation: string;
  colorDatas: IColorDatas;
}
//

export type TDataObj = {
  id: string[];
  labels: string[];
  bar: number[];
  area: number[];
  barColor: string[];
  lineColor: string[];
  borderColor: string[];
};

export interface IConvertData {
  getData(path: string): Promise<TDataObj>;
}

export type TJson = {
  type: string;
  version: number;
  response: {
    TResponse;
  };
};

export type ParsedJson = {
  response: TResponse;
};

export interface convertData {
  id: string[];
  labels: string[];
  bar: number[];
  area: number[];
}

export interface IbarDefaultChart {
  type: string;
  label: string;
  data: number[];
  backgroundColor: string[];
  borderWidth: number;
  yAxisID: string;
  order: number;
}

export interface IlineDefaultChart {
  type: string;
  label: string;
  data: number[];
  backgroundColor: string[];
  pointBackgroundColor: string;
  pointBorderColor: string[];
  borderWidth: number;
  yAxisID: string;
  pointStyle: boolean | string;
  order: number;
  fill: boolean;
}
export type makeDataSets = (types: string[]) => Array<IbarDefaultChart | IlineDefaultChart>;
