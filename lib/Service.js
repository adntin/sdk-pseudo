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
    const { service: Creator, ...rest } =
      this.register.find((r) => r.service === this) || {};
    if (!Creator) {
      throw new Error(`Can not get ${this.name} Service`);
    }
    instance = new Creator(rest);
    this.services[this.name] = instance;
    return instance;
  }
}

export default Service;
