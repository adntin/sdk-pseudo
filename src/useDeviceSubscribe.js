import { useEffect } from 'react';
import DeviceService from '../lib/DeviceService';

const useDeviceSubscribe = () => {
  const { dispatch } = useGlobalStore();

  useEffect(() => {
    // 回调函数
    const handleChange = (data) => {
      dispatch({ type: 'SUBSCRIBE_DEVICE_CHANGE', payload: data }); // sync global store data
    };

    // 开始监听
    DeviceService.getInstance().subscribe(handleChange);

    return () => {
      // 停止监听
      DeviceService.getInstance().unsubscribe(handleChange);
    };
  }, []);
};

export default useDeviceSubscribe;
