import { useState, useEffect } from 'react';
import DeviceService from '../lib/DeviceService';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // todo service.house.find
      const localDevices = await DeviceService.getInstance().find({}, (remoteDevices) => {
        setDevices(remoteDevices);
        // sync global store data, e.g. dispatch()
      });
      setDevices(localDevices);
    };
    fetchData();
  }, []);

  return devices.length === 0 ? (
    <div>loading...</div>
  ) : (
    <ul>
      {devices.map((h) => (
        <li key={h.id}>{h.name}</li>
      ))}
    </ul>
  );
};

export default DeviceList;
