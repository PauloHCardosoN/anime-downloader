import React, { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { Route, TabView, SceneMap } from 'react-native-tab-view';

// Telas
import HomePage from '../../screens/HomePage';
import FavoritesPage from '../../screens/FavoritesList';

// Componentes
import TabViewBar from './components/TabBar';
import { RootState, store } from '../../store';
import { Anime } from '../../controllers/AnimesController';
import { useSelector } from 'react-redux';


const HomeRoute = () => <HomePage />;
const FavoritesRoute = () => <FavoritesPage />;

const { fs } = RNFetchBlob;

async function verifyFavorites(){
  try {
    const path = `/storage/emulated/0/Android/data/com.animedownloader/favorites.json`;
    const fileExists = await fs.exists(path);

    const favorites = store.getState().favorites;

    if(fileExists){
      const animes = JSON.parse(await fs.readFile(path, 'utf8'));

      if(Array.isArray(animes)){
        animes.map(anime => {
          if(
            (anime.id && typeof anime.id === 'string') &&
            (anime.title && typeof anime.title === 'string') &&
            (anime.description && typeof anime.description === 'string') &&
            (anime.imageUri && typeof anime.imageUri === 'string') &&
            (anime.categories && Array.isArray(anime.categories) && anime.categories.every((category: any) => typeof category === 'string'))
          ){
            const { id, title, description, imageUri, categories }: Anime = anime;
            
            store.dispatch({
              type: 'FAVORITE_ANIME',
              payload: {
                anime: {
                  id,
                  title,
                  description,
                  imageUri,
                  categories
                }
              }
            })
          }
        })
      }
    } else {
      favorites.map(({ id }) => {
        store.dispatch({
          type: 'UNFAVORITE_ANIME',
          payload: { id }
        })
      })
      fs.writeFile(path, `[]`, 'utf8');
    }
  } catch(err){
    Alert.alert(err);
  }
}

const Main: React.FC = () => {
  const [index, setIndex] = useState(0);
  const routes: Route[] = [
    { key: 'home', icon: 'home' },
    { key: 'favorites', icon: 'heart' },
  ];

  const renderScene = SceneMap({
    home: HomeRoute,
    favorites: FavoritesRoute,
  });

  useEffect(() => {
    verifyFavorites();

    PermissionsAndroid.requestMultiple([
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.READ_EXTERNAL_STORAGE'
    ]);
  }, []);

  return (
    <TabView
      style={{ flex: 1 }}
      renderTabBar={(props) => TabViewBar(props, index, routes)}
      tabBarPosition="bottom"
      sceneContainerStyle={{ height: '100%', backgroundColor: '#e8e8e8',  }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
    />
  );
}

export default Main;