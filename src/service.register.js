import HouseService from "../lib/HouseService";
import RoomService from "../lib/RoomService";

const register = [HouseService, RoomService];
// 获取数据策略, DatabaseFirst || NetworkFirst || DeviceFirst
// const strategy = 'DatabaseFirst';

export default register;