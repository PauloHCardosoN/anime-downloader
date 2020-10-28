import React from 'react';
import { ToastAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Tipos
import { Anime } from '../../../../controllers/AnimesController';

// Estilos
import globalStyles from '../../../../global/styles';
import styles from './styles';

// Componentes
import DownloadAll from './components/DownloadAll';
import LikeButton from '../../../../components/LikeAnimeButton';

// Global
import { primaryColor } from '../../../../global/colors';
import { EpisodeInterface } from '../../index';

interface props extends Anime{
  episodes: EpisodeInterface[]
}

const { config, fs } = RNFetchBlob;

const NavTopBar: React.FC<props> = (props) => {
  const { episodes } = props;
  const enabled = episodes.length > 0;
  
  function downloadAll(){
    episodes.map(episode => {
      if(episode.isValid){
        const { title, url } = episode;

        config({
          fileCache: true,
          addAndroidDownloads : {
            useDownloadManager : true,
            notification : true,
            title: 'Baixando episódio',
            path: `${fs.dirs.DownloadDir}/${title.replace(/\./g,'')}.mp4`,
          }
        }).fetch('GET', url).then((res) => {
          ToastAndroid.show('Download de ${title} completo', 5000);
        });
      }
    })
  }

  return (
    <View style={[ globalStyles.horizontalPadding, styles.topMenuBar ]}>
      <RectButton
        style={{ backgroundColor: '#FFF', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}
        onPress={useNavigation().goBack}
      >
        <Icon name="chevron-left" size={35} color={primaryColor} style={{ paddingRight: 2.5 }}/>
      </RectButton>

      <DownloadAll style={{ flex: 0.9, paddingVertical: 10 }} enabled={enabled} onPress={downloadAll}/>

      <LikeButton
        style={{ backgroundColor: '#FFF' }}
        color={primaryColor}
        {...props}
      />
    </View>
  )
}

export default NavTopBar;