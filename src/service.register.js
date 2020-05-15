import UserService from '../lib/UserService';
import HouseService from '../lib/HouseService';
import RoomService from '../lib/RoomService';
import DeviceService from '../lib/DeviceService';

// 获取数据策略: CacheFirst || CacheOnly || NetworkFirst || NetworkOnly || StaleWhileRevalidate
const register = [
  {
    service: UserService,
    strategy: 'NetworkOnly',
  },
  {
    service: HouseService,
    strategy: 'NetworkFirst',
    timeout: 3000,
  },
  {
    service: RoomService,
    strategy: 'CacheFirst',
  },
  {
    service: DeviceService,
    strategy: 'CacheFirst',
  },
];

export default register;
