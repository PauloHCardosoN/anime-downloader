import React from 'react';
import { View, FlatList, ListRenderItemInfo, ViewStyle } from 'react-native';

// Tipos
import { Anime } from '../../controllers/AnimesController';

// Estilos
import styles from './styles';

// Componentes
import AnimeItem from '../AnimeItem';
import LoadingBall from '../LoadingBall';

export interface AnimesListProps{
  title: string,
  apiUrl: string,
  haveExtraContentToLoad: boolean,
  queryParams?: { [key: string]: any }
}

interface props{
  animesList: Anime[],
  styles?: ViewStyle,
  haveExtraContentToLoad?: boolean,
  isLoading: boolean,
  onEndReached?(): any
}

const AnimesList: React.FC<props> = (props) => {
  const { styles: ListStyle, animesList, haveExtraContentToLoad, isLoading, onEndReached } = props;

  const renderAnimeItem = (props: ListRenderItemInfo<Anime>) => {
    const { item } = props;

    return (
      <AnimeItem
        key={item.id}
        containerHeight={200}
        {...item}
      />
    )
  }

  if(haveExtraContentToLoad) {
    return (
      <FlatList
        style={[ styles.list, ListStyle ]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[ isLoading ? { flexGrow: 1, justifyContent: 'center' } : {} ]}
        ListEmptyComponent={() => <LoadingBall size={30} animating={isLoading}/>}
        data={animesList}
        renderItem={renderAnimeItem}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }}/>}
        keyExtractor={({ id }) => String(id)}
        ListFooterComponent={() => <LoadingBall size={20} animating={isLoading && animesList.length > 0} style={{ marginVertical: 20 }}/>}
        onEndReached={onEndReached}
      />
    )
  } else {
    return (
      <FlatList
        style={[ styles.list, ListStyle ]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[ isLoading ? { flexGrow: 1, justifyContent: 'center' } : {} ]}
        ListEmptyComponent={() => <LoadingBall size={30} animating={isLoading}/>}
        data={animesList}
        renderItem={renderAnimeItem}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }}/>}
        keyExtractor={({ id }) => String(id)}
      />
    )
  }
}

export default AnimesList;