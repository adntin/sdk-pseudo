import { useEffect } from 'react';
import HouseService from '../lib/HouseService';

const useHouseList = () => {
  const { houses, dispatch } = useGlobalStore();

  useEffect(() => {
    const fetchData = async () => {
      const localHouses = await HouseService.getInstance().find({}, (error, data) => {
        // 注意: 缓存优先此回调函数才有意义
        if (!error) {
          dispatch({ type: 'FRESH_HOUSE_LIST_SUCCESS', payload: data }); // sync global store data
        }
      });
      dispatch({ type: 'FETCH_HOUSE_LIST_SUCCESS', payload: localHouses }); // sync global store data
    };
    fetchData();
  }, []);

  return houses;
};

export default useHouseList;
