import network from '../lib/network';
import database from '../lib/database';
import logger from '../lib/logger';

class Service {
  constructor() {
    if (Service.instance instanceof Service) {
      return Service.instance; // Ensure sub class extend a parent instance
    }
    Service.instance = this;
    return this;
  }

  // 初始化`父类`配置
  init(options) {
    this.network = options.network || network;
    this.database = options.database || database;
    this.logger = options.logger || logger;
    this.register = options.register || [];
    this.services = {}; // caches {service_name: instance}
  }

  // 获取`子类`实例
  getInstance() {
    let instance = this.services[this.name];
    if (instance) {
      return instance;
    }
    const Creator = this.register.find((S) => S === this);
    if (!Creator) {
      throw new Error(`Can not get ${this.name} Service`);
    }
    instance = new Creator();
    this.services[this.name] = instance;
    return instance;
  }

  // // 策略处理器
  // strategyHandler({local, remote, syncDatabase, syncStore}){
  //     let result = null;
  //     if(this.strategy === 'DatabaseFirst'){
  //         try {
  //             result = await local(); // 获取本地数据(database)
  //             setTimeout(()=>{
  //                 newData = await remote(); // 获取云端数据(server)
  //                 syncDatabase(newData); // 数据同步到硬盘(database)
  //                 syncStore(newData); // 数据同步到内存(store)
  //             }, 0);
  //         } catch(error){

  //         }
  //         return result;
  //     }

  //     result = await remote(); // 获取云端数据(server)

  // }
}

export default Service;
