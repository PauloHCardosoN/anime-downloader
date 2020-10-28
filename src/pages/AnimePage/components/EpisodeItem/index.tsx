import React from 'react';
import { View, Text, ImageBackground, ToastAndroid, Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Tipos
import { EpisodeInterface } from '../../index';

// Estilos
import styles from './styles';

// Global
import { RectButton } from 'react-native-gesture-handler';

export type props = EpisodeInterface;

const { config, fs } = RNFetchBlob;

const EpisodeItem: React.FC<props> = (props) => {
  if(props.isValid){
    const { id, title, date, url, background } = props;

    function downloadEpisode(){
      ToastAndroid.show(`Download de ${title} iniciado`, 3000);

      config({
        fileCache: true,
        addAndroidDownloads : {
          useDownloadManager : true,
          notification : true,
          title: title,
          path: `${fs.dirs.DownloadDir}/${title.replace(/\./g,'')}.mp4`,
        }
      }).fetch('GET', url).then((res) => {
        ToastAndroid.show('Download de ${title} completo', 5000);
      });
    }

    return (
      <ImageBackground source={{ uri: background }} style={{ flex: 1 }} key={id}>
        <View style={styles.item}>
          <View style={{ flex: 0.95 }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={{ color: '#c9c9c9' }}><Icon name="calendar-today"/> {date}</Text>
          </View>
        </View>
        
        <RectButton style={styles.downloadButton} onPress={downloadEpisode}>
          <Text style={{ color: '#FFF' }}>Baixar episódio</Text>
        </RectButton>
      </ImageBackground>
    )
  } else {
    const { id, title, date, background } = props;

    return (
      <ImageBackground source={{ uri: background }} style={{ flex: 1 }} key={id}>
        <View style={styles.item}>
          <View style={{ flex: 0.95 }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={{ color: '#c9c9c9' }}><Icon name="calendar-today"/> {date}</Text>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

export default EpisodeItem;