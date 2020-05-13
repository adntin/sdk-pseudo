import { useState, useEffect } from 'react';
import HouseService from '../lib/HouseService';
// import Service from '../lib/Service';

const HouseList = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // todo service.house.find
      const localHouses = await HouseService.getInstance().find({}, (remoteHouses) => {
        setHouses(remoteHouses);
        // sync global store data, e.g. dispatch()
      });
      setHouses(localHouses);
    };
    fetchData();
  }, []);

  return houses.length === 0 ? (
    <div>loading...</div>
  ) : (
    <ul>
      {houses.map((h) => (
        <li key={h.id}>{h.name}</li>
      ))}
    </ul>
  );
};

export default HouseList;
