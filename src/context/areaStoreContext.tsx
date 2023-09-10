import { createContext, useContext, useEffect, useState } from 'react';
import type { IData, Props, TResponse } from '../..';

interface remakeData {
  [name: string]: IData;
}

export const AreaStoreContext = createContext<TResponse | null>(null);

export const useAreaData = () => useContext(AreaStoreContext);

export function AreaStoreProvider({ children, convertData }: Props) {
  const [areaDate, setAreaDate] = useState<remakeData>({});

  useEffect(() => {
    const callData = async () => {
      const result = await convertData.getAreaData('mock.json');
      setAreaDate(pre => {
        pre = result;
        return pre;
      });
    };
    callData();
  }, [convertData]);

  return <AreaStoreContext.Provider value={{ areaDate }}>{children}</AreaStoreContext.Provider>;
}
