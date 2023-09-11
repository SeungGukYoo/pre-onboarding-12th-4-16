import { createContext, useContext, useEffect, useState } from 'react';
import type { Props } from '../..';

interface convertData {
  id: string[] | [];
  labels: string[] | [];
  bar: number[] | [];
  area: number[] | [];
  barColor: string[] | [];
}

interface contextType {
  areaData: convertData;
  changeColor: (areaName: string, colorData: string[]) => void;
  currentFocusLocation: string;
}

type FoucsLocation = 'none' | string;

export const AreaStoreContext = createContext<contextType | null>(null);

export const useAreaData = () => {
  const context = useContext(AreaStoreContext);
  if (!context) throw new Error('useContext must be a provider');
  return context;
};

export function AreaStoreProvider({ children, convertData }: Props) {
  const [currentFocusLocation, setCurrentFocusLocation] = useState<FoucsLocation>('none');
  const [areaData, setAreaData] = useState<convertData>({
    id: [],
    labels: [],
    bar: [],
    area: [],
    barColor: [],
  });

  const changeColor = (areaName: string, colorData: string[]) => {
    setAreaData(prev => ({
      ...prev,
      barColor: [...prev.barColor, ...colorData],
    }));
    setCurrentFocusLocation(areaName);
  };
  useEffect(() => {
    const callData = async () => {
      const result = await convertData.getData('mock.json');
      setAreaData(pre => ({
        id: [...pre.id, ...result.id],
        labels: [...pre.labels, ...result.labels],
        bar: [...pre.bar, ...result.bar],
        area: [...pre.area, ...result.area],
        barColor: [...pre.barColor, ...result.barColor],
      }));
    };
    callData();
  }, [convertData]);

  return (
    <AreaStoreContext.Provider value={{ areaData, changeColor, currentFocusLocation }}>
      {children}
    </AreaStoreContext.Provider>
  );
}
