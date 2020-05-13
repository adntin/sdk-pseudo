import Service from './Service';

class DeviceService extends Service {
  findOne() {}
  find() {
    // 自动添加符合条件的所有设备MQTT订阅
    // 自动建立符合条件的所有设备TCP连接
  }
  insert() {}
  update() {}
  remove() {}

  // 处理接收消息
  handleReceiveMessage(data) {
    // add tool 数据合并处理500ms
    (this.callbacks || []).forEach((cb) => {
      cb(data);
    });
  }

  // 添加监听
  subscribe(callback) {
    const callbacks = this.callbacks || [];
    const found = callbacks.find((cb) => cb === callback);
    if (!found) {
      this.callbacks.push(callback);
    }
    mqtt.onMessage(this.handleReceiveMessage); // 监听MQTT消息
    tcp.onMessage(this.handleReceiveMessage); // 监听TCP消息
  }

  // 移除监听
  unsubscribe(callback) {
    this.callbacks = (this.callbacks || []).filter((cb) => cb !== callback);
  }
}

export default DeviceService;
