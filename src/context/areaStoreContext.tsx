import { createContext, useContext, useEffect, useState } from 'react';
import type { Props, TResponse } from '../..';

export const AreaStoreContext = createContext<TResponse | null>(null);

export const useAreaData = () => useContext(AreaStoreContext);

export function AreaStoreProvider({ children, convertData }: Props) {
  const [areaDatas] = useState({});

  useEffect(() => {
    const callData = async () => {
      const result = await convertData.getAreaData('mock.json');
      console.info(result);
    };
    callData();
  }, [convertData]);

  return <AreaStoreContext.Provider value={areaDatas}>{children}</AreaStoreContext.Provider>;
}
