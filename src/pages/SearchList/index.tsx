import React, { useEffect, useState } from 'react';
import { View, FlatList, ListRenderItemInfo, Text, Animated, TouchableOpacity, Alert } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Searchbar } from 'react-native-paper';


// Estilos
import globalStyles from '../../global/styles';
import styles from './styles'

// Componentes
import GoBackButton from '../../components/GoBackButton';
import AnimeItem from '../../components/AnimeItem'
;import LoadingBall from '../../components/LoadingBall';

// Controllers
import AnimeController, { Anime } from '../../controllers/AnimesController';
import CategoriesController from '../../controllers/CategoriesController';

// Global
import { primaryColor } from '../../global/colors';



const SearchList: React.FC = () => {
  const [animeName, setAnimeName] = useState<string>('');
  const [animesList, setAnimesList] = useState<Anime[]>([]);
  const [timeOutToExec, setTimeOutToExec] = useState<null | NodeJS.Timeout>(null);
  const [isLoading, setLoadingState] = useState<boolean>(true);
  const [isFiltersOpen, setFiltersOpenState] = useState<boolean>(false);
  const [categoriesFilters, setCategoriesFilters] = useState<string[]>([]);
  const [selectedCategoryFilters, setSelectedCategoryFilter] = useState<string[]>([]);
  
  const filterHeight = useState(new Animated.Value(0))[0];


  useEffect(() => {
    loadAnimesList(animeName);
    loadCategoriesList();
  },[]);

  const loadAnimesList = async (animeName: string) => {
    try {
      setLoadingState(true);
      const queryParams = { $filter: `substringof('${animeName}', Nome)`, $orderby: 'Nome' };
      const animes = await AnimeController.index(`http://four.zetai.info/odata/Animesdb`, queryParams);
      setAnimesList(animes);
    } catch (error) {
      Alert.alert(`Ocorreu um erro\n${error}`)
    }
    
    setLoadingState(false);
  }

  const loadCategoriesList = () => {
    CategoriesController.index().then(categories => {
      setSelectedCategoryFilter(categories.map(category => category.Nome));
      setCategoriesFilters(categories.map(category => category.Nome));
    });
  }

  const loadMoreAnimes = () => {
    setLoadingState(true);

    AnimeController.index(`http://four.zetai.info/odata/Animesdb`, { $filter: `substringof('${animeName}', Nome)`, $skip: animesList.length, $orderby: 'Nome' })
      .then((animes) => {
        setLoadingState(false);
        setAnimesList([...animesList, ...animes])
      });
  }

  const handleTextChange = (text: string) => {
    setAnimeName(text);
    setAnimesList([]);
    setLoadingState(true);

    if(timeOutToExec){
      clearTimeout(timeOutToExec);
    }

    const timeOut = setTimeout(() => { loadAnimesList(text) }, 1000);
    setTimeOutToExec(timeOut);
  }

  const renderAnimeItem = (props: ListRenderItemInfo<Anime>) => {
    var hasSomeCategoryAvaliable = false;
    const { id, title, description, imageUri, categories } = props.item;

    for(const category of categories) {
      if(selectedCategoryFilters.includes(category)) {
        hasSomeCategoryAvaliable = true;
        break;
      }
    }

    return (
      <AnimeItem
        containerHeight={200}
        id={id}
        title={title}
        description={description}
        imageUri={imageUri}
        categories={categories}
        display={ hasSomeCategoryAvaliable ? 'flex' : 'none' }
      />
    )
  }

  const renderCategoryButton = (props: ListRenderItemInfo<string>) => {
    const { item: name, index } = props;
    
    const isSelected = selectedCategoryFilters.includes(name);

    const buttonStyle = isSelected ? styles.selectedCategoryButton : styles.notSelectedCategoryButton;
    const buttonTextStyle = isSelected ? styles.selectedCategoryButtonText : styles.notSelectedCategoryButtonText;

    const handlePress = () => {
      const categories = categoriesFilters.filter(category => {
        if(category === name){
          if(!isSelected){
            return category;
          }
        } else if(selectedCategoryFilters.includes(category)) {
          return category;
        }
      });

      setSelectedCategoryFilter(categories);
    }

    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
        style={[ styles.categoryButton, buttonStyle ]}
        onPress={handlePress}
      >
        <Text style={[ buttonTextStyle ]}>{name}</Text>
      </TouchableOpacity>
    )
  }

  const handleFiltersMenuAnimation = () => {
    if(isFiltersOpen) {
      Animated.timing(filterHeight, {
        duration: 500,
        toValue: 0,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(filterHeight, {
        duration: 500,
        toValue: 300,
        useNativeDriver: false
      }).start();
    }

    setFiltersOpenState(!isFiltersOpen);
  }

  return (
    <View style={{ height: '100%', paddingBottom: getBottomSpace() }}>
      <View style={[ globalStyles.horizontalPadding, styles.header ]}>
        <View style={[{ marginVertical: 20 }]}>
          <GoBackButton />
        </View>

      
        <Searchbar
          icon="filter"
          onIconPress={handleFiltersMenuAnimation}
          value={animeName}
          iconColor={primaryColor}
          placeholder="Digite o nome do anime"
          onChangeText={handleTextChange}
        />

        <Animated.FlatList
          style={[{ height: filterHeight }, isFiltersOpen ? { borderRadius: 20, marginVertical: 20 } : {} ]}
          showsVerticalScrollIndicator={false}
          data={categoriesFilters}
          renderItem={renderCategoryButton}
          ItemSeparatorComponent={() => <View style={{ margin: 5 }}/>}
          numColumns={3}
          contentContainerStyle={{ paddingVertical: 20 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          keyExtractor={(item, index) => String(index)}
        />
      </View>

      <FlatList
        ListEmptyComponent={() => (
          isLoading
          
          ? <LoadingBall size={20} animating={isLoading}/>
          : <Text style={{ fontFamily: 'Poppins-Light' }}>Nenhum anime encontrado</Text>
        )}
        ListFooterComponent={() => (
          <LoadingBall
            size={20}
            style={ animesList.length > 0 && isLoading ? { marginVertical: 20 } : { display: 'none' }}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
        onEndReached={() => { if(animesList.length > 5 && !isLoading) loadMoreAnimes() }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[ animesList.length === 0 ? { flexGrow: 1, justifyContent: 'center', alignItems: 'center' } : {} ]}
        style={[ styles.animesList, globalStyles.horizontalPadding ]}
        data={animesList}
        renderItem={renderAnimeItem}
        keyExtractor={({ id }) => String(id)}
      />
    </View>
  )
}

export default SearchList;