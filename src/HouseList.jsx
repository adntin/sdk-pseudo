import useHouseList from './useHouseList';

const HouseList = () => {
  const houses = useHouseList();
  return houses.length === 0 || remote === false ? (
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
