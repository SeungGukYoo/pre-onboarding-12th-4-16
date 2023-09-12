import { createContext, useContext, useEffect, useState } from 'react';
import type { FoucsLocation, IColorDatas, Props, contextType, convertData } from '../..';

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
  });
  const [colorDatas, setColorDatas] = useState<IColorDatas>({
    barColor: [],
    lineColor: [],
    borderColor: [],
  });
  const changeColor = (areaName: string, colorData: IColorDatas) => {
    setColorDatas(prev => ({
      ...prev,
      barColor: [...colorData.barColor],
      borderColor: [...colorData.borderColor],
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
      }));
      setColorDatas(pre => ({
        barColor: [...pre.barColor, ...result.barColor],
        lineColor: [...pre.barColor, ...result.lineColor],
        borderColor: [...pre.barColor, ...result.lineColor],
      }));
    };
    callData();
  }, [convertData]);

  return (
    <AreaStoreContext.Provider value={{ areaData, changeColor, currentFocusLocation, colorDatas }}>
      {children}
    </AreaStoreContext.Provider>
  );
}
