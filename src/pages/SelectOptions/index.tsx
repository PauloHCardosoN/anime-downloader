import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ListRenderItemInfo, Alert, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

// Tipos
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes';

// Controllers
import AnimeController, { Anime } from '../../controllers/AnimesController';
import CategoriesController from '../../controllers/CategoriesController';

// Estilos
import globalStyles from '../../global/styles';
import styles from './styles';

// Componentes
import SelectButton from '../../components/SelectButton';
import GoBackButton from '../../components/GoBackButton';
import AnimesList from '../../components/AnimesList';

// Global
import { primaryColor } from '../../global/colors';
import { getBottomSpace } from 'react-native-iphone-x-helper';


export interface AnimesListProps{
  title: string,
  apiUrl: string,
  haveExtraContentToLoad: boolean,
  queryParams?: { [key: string]: any }
}

interface props{
  route: RouteProp<RootStackParamList, 'SelectOption'>
}

const SelectOptions: React.FC<props> = (props) => {
  const { title, key, haveExtraContentToLoad, queryParams } = props.route.params;  

  const [data, setData] = useState<string[]>([]);
  const [isLoading, setLoadingState] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<string>();
  const [animesList, setAnimesList] = useState<Anime[]>([]);
  

  useEffect(() => {
    setData([]);

    switch (key) {
      case 'Categoria': {
        CategoriesController.index().then(categories => {
          if(categories){
            setData(categories.map(category => category.Nome));
          }
        });
        break;
      }
      case 'Ano': {
        const years = [];

        for(let i = 1980;i <= 2020;i++){
          years.push(String(i));
        }

        setData(years);
        break;
      }
    }
  }, []);

  useEffect(() => {
    if(data.length > 0) {
      setSelectedButton(data[0]);
      loadAnimesList(data[0]);
    }
  }, [data])

  async function handleSelectButtonChange(category: string){
    setSelectedButton(category);
    setAnimesList([]);
    loadAnimesList(category);
  }

  async function loadAnimesList(category: string) {
    setLoadingState(true);

    try {
      const animes = await AnimeController.index(`http://four.zetai.info/odata/Animesdb`, {
        ...queryParams,
        $skip: animesList.length,
        $filter: `substringof('${category?.replace(/'/g,'"')}', ${key})`
      });

      setAnimesList(animes);
    } catch (err) {
      Alert.alert(err);
    }
    
    setLoadingState(false);
  }

  const renderItem: React.FC<ListRenderItemInfo<typeof data[number]>> = (props) => {
    const name = props.item;
    const isSelected = name === selectedButton;

    return (
      <SelectButton
        text={name}
        selected={isSelected}
        onPress={() => handleSelectButtonChange(name)}
      />
    )
  }

  return (
    <View style={{ paddingBottom: getBottomSpace(), height: '100%' }}>
      <View style={[ globalStyles.horizontalPadding, styles.header ]}>
        <View style={{ marginVertical: 20 }}>
          <GoBackButton />
        </View>

        <FlatList
          style={styles.buttonsList}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
          ItemSeparatorComponent={() => <View style={{ margin: 5 }}/>}
          data={data}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
      
      <AnimesList
        styles={{ marginHorizontal: globalStyles.horizontalPadding.paddingHorizontal, borderRadius: 10 }}
        animesList={animesList}
        haveExtraContentToLoad
        isLoading={isLoading}
      />
    </View>
  )
}

export default SelectOptions;