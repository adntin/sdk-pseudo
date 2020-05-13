import { createContext, useContext } from 'react';
import Service from '../lib/Service';
import register from './service.register';
// import network from '../lib/network';
// import database from '../lib/database';
// import logger from '../lib/logger';

const ContextGlobalStore = createContext({});

const service = new Service();
service.init({ register });

const App = () => {
  return <ContextGlobalStore.Provider value={{}}>App</ContextGlobalStore.Provider>;
};

export default App;
