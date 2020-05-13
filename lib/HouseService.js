import Service from './Service';

class HouseService extends Service {
  async find(request, done) {
    // 本地优先
    const localHouses = await this.database.table('houses').find(request); // 获取本地数据(database)
    setTimeout(async () => {
      const remoteHouses = await this.http.get({ url: '/houses' }); // 获取云端数据(server)
      this.database.table('houses').insert(remoteHouses); // 数据同步到硬盘(database)
      done(remoteHouses); // 数据同步到内存(store)
    }, 0);
    return localHouses;
  }

  insert() {}
  update() {}
  remove() {}
}

export default HouseService;
