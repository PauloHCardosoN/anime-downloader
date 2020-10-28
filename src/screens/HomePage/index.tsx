import React from 'react';
import { View, FlatList, ListRenderItemInfo, Text, SafeAreaView, StatusBar } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Estilos
import globalStyles from '../../global/styles';
import styles from './styles';

// Tipos
import { AnimesScreenNavigationProp, SearchScreenNavigationProp, MainScreenNavigationProp, SelectOptionNavigationProp } from '../../routes';

export type HomeSections = 'Mais recentes'| 'Mais assistidos' | 'Nova temporada' | 'Categorias' | 'Por ano' | 'Ordem Alfabetica';
export type FilterKeys = 'Categoria' | 'Ano';

interface AnimesSectionProps{
  icon: string,
  text: string,
  moveTo: 'AnimesSection',
  title: HomeSections,
  apiUrl: string,
  haveExtraContentToLoad: boolean,
  queryParams?: { [key: string]: any }
}

interface SearchListProps{
  icon: string,
  text: string,
  moveTo: 'SearchList',
}

interface SelectOptionsProps{
  icon: string,
  text: string,
  title: HomeSections,
  moveTo: 'SelectOption',
  key: FilterKeys,
  haveExtraContentToLoad: boolean,
  queryParams?: { [key: string]: any }
}

type buttonProps = AnimesSectionProps | SearchListProps | SelectOptionsProps;

const buttons: buttonProps[] = [
  {
    icon: 'magnify',
    text: 'Pesquisar',
    moveTo: 'SearchList',
  },
  {
    icon: 'eye-plus',
    text: 'Mais\nassistidos',
    title: 'Mais assistidos',
    moveTo: 'AnimesSection',
    apiUrl: 'http://four.zetai.info/odata/Animesdb',
    haveExtraContentToLoad: true,
    queryParams: {
      $orderby: 'Rank desc'
    }
  },
  {
    icon: 'shape',
    text: 'Por categoria',
    title: 'Categorias',
    key: 'Categoria',
    moveTo: 'SelectOption',
    haveExtraContentToLoad: true
  },
  {
    icon: 'calendar-search',
    text: 'Por ano',
    title: 'Por ano',
    key: 'Ano',
    moveTo: 'SelectOption',
    haveExtraContentToLoad: true
  },
  {
    icon: 'sort-alphabetical-descending-variant',
    text: 'Ordem Alfabetica',
    title: 'Ordem Alfabetica',
    moveTo: 'AnimesSection',
    apiUrl: 'http://four.zetai.info/odata/Animesdb',
    haveExtraContentToLoad: true
  }
];

const isButtonsOdd = buttons.length % 2 === 1;

const HomePage: React.FC = () => {
  const navigation = useNavigation<MainScreenNavigationProp | AnimesScreenNavigationProp | SearchScreenNavigationProp | SelectOptionNavigationProp>();

  const handleNavigation = (props: buttonProps) => {
    if(props.moveTo === 'AnimesSection'){
      const { title, apiUrl, haveExtraContentToLoad, queryParams } = props;

      navigation.navigate('AnimesSection', {
        title,
        apiUrl,
        haveExtraContentToLoad,
        queryParams
      })
    } else if(props.moveTo === 'SearchList'){
      navigation.navigate('SearchList');
    } else if(props.moveTo === 'SelectOption'){
      const { title, key, haveExtraContentToLoad, queryParams } = props;

      navigation.navigate('SelectOption', {
        title,
        key,
        haveExtraContentToLoad,
        queryParams
      })
    }
  }

  const renderButton = (props: ListRenderItemInfo<buttonProps>) => {
    const { index, item } = props;
    const { icon, text } = item;

    const isTheLastOfTheRow = index % 2 === 1;
    const isTheLastItem = index === buttons.length - 1;

    if(isButtonsOdd && isTheLastItem){
      return (
        <RectButton
          style={[ styles.button ]}
          onPress={() => { handleNavigation(item) }}
        >
          <View style={styles.iconContainer}>
            <Icon
              name={icon}
              style={styles.buttonIcon}
            />
          </View>
  
          <Text style={styles.buttonText}>{text}</Text>
        </RectButton>
      )
    }

    return (
      <RectButton
        style={[ styles.button, isTheLastOfTheRow ? { marginRight: 0 } : { marginRight: 10 } ]}
        onPress={() => { handleNavigation(item) }}
      >
        <View style={styles.iconContainer}>
          <Icon
            name={icon}
            style={styles.buttonIcon}
          />
        </View>

        <Text style={styles.buttonText}>{text}</Text>
      </RectButton>
    )
  }

  return (
    <SafeAreaView>
      <View style={[ globalStyles.horizontalPadding ]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.buttonsList}
          contentContainerStyle={{ paddingVertical: 50 }}
          data={buttons}
          numColumns={2}
          renderItem={renderButton}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    </SafeAreaView>
  )
}

export default HomePage;