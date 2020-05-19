import { createContext, useContext } from 'react';
import Service from '../lib/Service';
import register from './service.register';
// import network from '../lib/network';
// import database from '../lib/database';
// import logger from '../lib/logger';

const service = new Service();
service.init({ register });

const App = () => {
  return <div>App</div>;
};

export default App;
