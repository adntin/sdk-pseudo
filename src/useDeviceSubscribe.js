import { useEffect } from 'react';
import DeviceService from '../lib/DeviceService';

const useDeviceSubscribe = () => {
  useEffect(() => {
    const handleChange = () => {
      // dispatch()
    };

    DeviceService.getInstance().subscribe(handleChange);

    return () => {
      DeviceService.getInstance().unsubscribe(handleChange);
    };
  }, []);
};

export default useDeviceSubscribe;
