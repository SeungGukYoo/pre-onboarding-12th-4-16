import { ConvertData } from './src/util/convertData';

export type TResponse = {
  [timestamp: string]: {
    id: string;
    value_area: number;
    value_bar: number;
  };
};

type AreaDateResponse = Array<string | []>;

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
