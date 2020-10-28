import React from 'react';
import { Alert, ToastAndroid, ViewStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


// Tipos
import { Anime } from '../../controllers/AnimesController';

// Estilos
import styles from './styles';

// Redux
import { RootState, store } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { DownloadDirectoryPath, writeFile } from 'react-native-fs';


interface props extends Anime{
  width?: number,
  style?: ViewStyle,
  iconSize?: number;
  color?: string
}

const { fs } = RNFetchBlob;

async function exportAnimes(){
  try{
    const path = `/storage/emulated/0/Android/data/com.animedownloader`;
    const isDir = await fs.isDir(path);

    if(isDir){
      writeFile(`${path}/favorites.json`, JSON.stringify(store.getState().favorites), 'utf8')
        .catch(Alert.alert);
    }
  } catch (err) {
    Alert.alert(err)
  }
}

const LikeButton: React.FC<props> = (props) => {
  const { id, title, description, imageUri, categories } = props;
  const width = props.width || 40;

  const favorites = useSelector<RootState, Anime[]>(state => state.favorites);
  const dispatch = useDispatch<typeof store.dispatch>();
  
  const hasLiked = Boolean(favorites.find(anime => anime.id === props.id));

  return (
    <RectButton
      style={[ styles.likeButton, props.style, { width, height: width, borderRadius: width / 2 } ]}
      onPress={() => {
        if(hasLiked){
          dispatch({
            type: 'UNFAVORITE_ANIME',
            payload: { id }
          })
        } else {
          dispatch({
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

        exportAnimes();
      }}
    >
      <Icon
        name={ hasLiked ? "heart" : "heart-outline"}
        size={props.iconSize || 40 - 15}
        style={{ color: props.color || '#FFF' }}
      />
    </RectButton>
  )
}

export default LikeButton;