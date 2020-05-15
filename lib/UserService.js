import Service from './Service';
import { http } from './network';

class UserService extends Service {
  constructor({ strategy }) {
    this.strategy = strategy;
  }
  async login() {
    const result = await http.post({ url: '/login' });
    // accessToken, refreshToken
    http.setConfig(result);
  }
  logout() {}
  register() {}
}

export default UserService;
