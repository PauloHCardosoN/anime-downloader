import storage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore } from 'redux';
import rootReducer from './reducers';

const persistedReducer = persistReducer({
  key: 'root',
  storage: storage
}, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(<any>store);

export type RootState = ReturnType<typeof rootReducer>;
export { persistor, store };