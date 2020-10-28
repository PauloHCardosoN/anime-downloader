import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';

// Tipos
import { RootStackParamList } from '../../routes';

// Estilos
import globalStyles from '../../global/styles';
import styles from './styles';

// Controllers
import EpisodesController from '../../controllers/EpisodesController';

// Componentes
import EpisodeItem from './components/EpisodeItem';
import NavTopBar from './components/NavTopBar';

export type EpisodeInterface = {
  isValid: true
  id: string,
  title: string,
  date: string,
  url: string,
  background: string,
} | {
  isValid: false,
  id: string,
  title: string,
  date: string,
  background: string,
}

interface props{
  route: RouteProp<RootStackParamList, 'AnimePage'>
}

const SCREEN_HEIGHT = Dimensions.get('screen').height;

const AnimePage: React.FC<props> = (props) => {
  const { id, title, description, categories, imageUri } = props.route.params;

  const [episodesList, setEpisodesList] = useState<EpisodeInterface[]>([]);
  const [isLoading, setLoadingState] = useState<boolean>(false);

  useEffect(() => { loadEpisodes() }, []);

  const loadEpisodes = async () => {
    try {
      setLoadingState(true);
      
      const episodes = (await EpisodesController.index(id)).reverse();
      const episodesList = await Promise.all(episodes.map<Promise<EpisodeInterface>>(async (episode) => {
        const options = await EpisodesController.show(episode.Id);
        const validOption = options.find(option => option.Endereco.includes('.mp4'));

        if(validOption){
          const { Endereco } = validOption;

          return {
            id: String(episode.Id),
            title: episode.Nome,
            date: episode.Data.substring(0, 10).split('-').reverse().join('/'),
            url: Endereco,
            background: `http://thumb.zetai.info/${episode.Id}.jpg`,
            isValid: true
          }
        } else {
          return {
            id: String(episode.Id),
            title: episode.Nome,
            date: episode.Data.substring(0, 10).split('-').reverse().join('/'),
            background: `http://thumb.zetai.info/${episode.Id}.jpg`,
            isValid: false
          }
        }
      }));

      setEpisodesList(episodesList);
    } catch (error) {
      Alert.alert(`Ocorreu um erro\n${error}`);
    }

    setLoadingState(false);
  }

  return (
    <>
      <HeaderImageScrollView
        maxHeight={SCREEN_HEIGHT / 1.25}
        minHeight={100}
        headerImage={{ uri: imageUri }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[ globalStyles.horizontalPadding, { paddingVertical: 20 }]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          
          <Text style={[ styles.title, { marginTop: 30 }]}>Episódios</Text>

          { episodesList.map((value, index) => <EpisodeItem key={index} {...value} />) }

          {
            isLoading
            
            ? <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold' }}>Carregando, aguarde...</Text>
            : <></>
          }
        </View>
      </HeaderImageScrollView>

      <NavTopBar {...props.route.params} episodes={episodesList}/>
    </>
  )
}

export default AnimePage;