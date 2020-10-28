import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, ListRenderItemInfo } from 'react-native';
import { RouteProp } from '@react-navigation/native';

// Tipos
import { HomeSections } from '../../screens/HomePage';
import { Anime } from '../../controllers/AnimesController';
import { RootStackParamList } from '../../routes';

// Controller
import AnimesController from '../../controllers/AnimesController';

// Estilos
import globalStyles from '../../global/styles';
import styles from './styles';

// Componentes
import AnimeItem from '../../components/AnimeItem';
import LoadingBall from '../../components/LoadingBall';
import GoBackButton from '../../components/GoBackButton';

export interface AnimesListProps{
  title: HomeSections,
  apiUrl: string,
  haveExtraContentToLoad: boolean,
  queryParams?: { [key: string]: any }
}

interface props{
  route: RouteProp<RootStackParamList, 'AnimesSection'>
}

const AnimesSection: React.FC<props> = (props) => {
  const { title, apiUrl, haveExtraContentToLoad, queryParams } = props.route.params;

  const [animesList, setAnimesList] = useState<Anime[]>([]);
  const [isLoading, setLoadingState] = useState<boolean>(false);

  useEffect(() => {
    loadAnimes();
  }, []);


  const loadAnimes = async () => {
    setLoadingState(true);

    AnimesController.index(apiUrl, { ...queryParams, $skip: animesList.length })
      .then(animes => {
        setLoadingState(false);

        if(animes) {
          setAnimesList([...animesList, ...animes]);
        }
      });
  }

  const renderAnimeItem = (props: ListRenderItemInfo<Anime>) => {
    const { item } = props;
    const { id, title, description, imageUri, categories } = item;

    return (
      <AnimeItem
        key={id}
        containerHeight={200}
        id={id}
        title={title}
        description={description}
        imageUri={imageUri}
        categories={categories}
      />
    )
  }


  return (
    <SafeAreaView>
      <View style={[ globalStyles.horizontalPadding, styles.container ]}>
        <View style={[{ marginBottom: 20 }]}>
          <GoBackButton />
        </View>

        <Text style={styles.title}>{title}</Text>
        
        {
          haveExtraContentToLoad

          ?
          <FlatList
            style={{ marginTop: 20, borderRadius: 10 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={ isLoading ? { flexGrow: 1, justifyContent: 'center' } : {} }
            ListEmptyComponent={() => <LoadingBall size={30} animating={true}/>}
            data={animesList}
            renderItem={renderAnimeItem}
            ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }}/>}
            keyExtractor={({ id }) => String(id)}
            ListFooterComponent={() => <LoadingBall size={20} animating={isLoading && animesList.length > 0} style={{ marginVertical: 20 }}/>}
            onEndReached={() => { if(!isLoading) { loadAnimes() } }}
          />

          :
          <FlatList
            style={{ marginTop: 20, borderRadius: 10 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={ isLoading ? { flexGrow: 1, justifyContent: 'center' } : {} }
            ListEmptyComponent={() => <LoadingBall size={30} animating={isLoading}/>}
            data={animesList}
            renderItem={renderAnimeItem}
            ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }}/>}
            keyExtractor={({ id }) => String(id)}
          />
        }
      </View>
    </SafeAreaView>
  )
}

export default AnimesSection;