import useDeviceList from './useDeviceList';

const DeviceList = () => {
  const devices = useDeviceList();

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
