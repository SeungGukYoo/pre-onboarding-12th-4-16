import { createContext, useContext, useEffect, useState } from 'react';
import type { Props } from '../..';

interface convertData {
  id: string[] | [];
  labels: string[] | [];
  bar: number[] | [];
  area: number[] | [];
}

interface contextType {
  areaData: convertData;
}

export const AreaStoreContext = createContext<contextType | null>(null);

export const useAreaData = () => useContext(AreaStoreContext);

export function AreaStoreProvider({ children, convertData }: Props) {
  const [areaData, setAreaData] = useState<convertData>({
    id: [],
    labels: [],
    bar: [],
    area: [],
  });

  useEffect(() => {
    const callData = async () => {
      const result = await convertData.getData('mock.json');
      setAreaData(pre => ({
        id: [...pre.id, ...result.id],
        labels: [...pre.labels, ...result.labels],
        bar: [...pre.bar, ...result.bar],
        area: [...pre.area, ...result.area],
      }));
    };
    callData();
  }, [convertData]);
  console.log(areaData);

  return <AreaStoreContext.Provider value={{ areaData }}>{children}</AreaStoreContext.Provider>;
}
