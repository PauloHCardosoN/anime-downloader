import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Estilos
import styles from './styles';
import globalStyles from '../../global/styles';

// Componentes
import AnimesItem from './components/AnimeItem';

// Tipos
import { Anime } from '../../controllers/AnimesController';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../../store';

const FavoritesList: React.FC = () => {
  const animesList = useSelector<RootState, Anime[]>(state => state.favorites);
  const dispatch = useDispatch<typeof store.dispatch>();

  function removeAll(){
    animesList.map(({ id }) => {
      dispatch({
        type: 'UNFAVORITE_ANIME',
        payload: { id }
      })
    })
  }

  return (
    <SafeAreaView>
      <View style={[ globalStyles.horizontalPadding, styles.container ]}>
        <View style={styles.header}>
          <RectButton style={styles.clearListButton} onPress={removeAll}>
            <Icon name="delete" color="#FFF" size={16}/>
            <Text style={styles.clearListButtonText}>Limpar favoritos</Text>
          </RectButton>
        </View>
        
        
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
          style={styles.list}
          data={animesList}
          renderItem={(props) => <AnimesItem {...props.item} style={{ flex: 1 }}/>}
          keyExtractor={({ id }) => String(id)}
        />
      </View>
    </SafeAreaView>
  )
}

export default FavoritesList;