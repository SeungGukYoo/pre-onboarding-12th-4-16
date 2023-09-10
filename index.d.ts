import { ConvertData } from './src/util/covertData';

export type TResponse = {
  [timestamp: string]: IData;
};

export type TJson = {
  type: string;
  version: number;
  response: {
    TResponse;
  };
};

export interface Props {
  children: React.ReactNode;
  convertData: ConvertData;
}
export interface IData {
  id: string;
  value_area: number;
  value_bar: number;
}
