import Service from './Service';

class HouseService extends Service {
  constructor({ strategy, timeout }) {
    this.strategy = strategy;
    this.timeout = timeout || 3000;
  }

  async find(params, done) {
    switch (this.strategy) {
      case 'CacheFirst':
        return findByCacheFirst(params, done);
      case 'NetworkFirst':
        return findByNetworkFirst(params);
      default:
        throw new Error(`${HouseService.name} strategy overflow`);
    }
  }

  // 本地优先
  async findByCacheFirst(params, done) {
    try {
      setTimeout(async () => {
        try {
          const remoteHouses = await this.findByRemote(params); // 获取云端数据(server)
          this.saveToLocal(remoteHouses); // 数据同步到硬盘(database)
          done && done(null, remoteHouses); // 数据同步到内存(store)
        } catch (err) {
          done && done(err, null);
        }
      }, 100);
      const localHouses = await this.findByLocal(params); // 获取本地数据(database)
      return localHouses;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 网络优先
  findByNetworkFirst(params) {
    return new Promise(async (resolve, reject) => {
      const timer = setTimeout(async () => {
        const houses = await this.findByLocal(params); // 获取本地数据(database)
        resolve(houses);
      }, this.timeout);
      try {
        const remoteHouses = await this.findByRemote(params); // 获取云端数据(server)
        clearTimeout(timer);
        resolve(remoteHouses);
        this.saveToLocal(remoteHouses); // 数据同步到硬盘(database)
      } catch (error) {
        reject(error);
      }
    });
  }

  // 远程获取
  findByRemote(params) {
    return this.http.get({ url: '/houses', params }); // 获取云端数据(server)
  }

  // 本地获取
  findByLocal(params) {
    return this.database.table('houses').find(params); // 获取本地数据(database)
  }

  // 保存到本地
  saveToLocal(houses) {
    return this.database.table('houses').insert(houses); // 数据同步到硬盘(database)
  }

  insert() {}
  update() {}
  remove() {}
}

export default HouseService;
