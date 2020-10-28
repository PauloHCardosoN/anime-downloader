import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

// Páginas
import Main from '../pages/Main';
import AnimesSection from '../pages/AnimesSection';
import SearchList from '../pages/SearchList';
import AnimePage from '../pages/AnimePage';
import SelectOptionPage from '../pages/SelectOptions';

// Props
import { Anime } from '../controllers/AnimesController';
import { AnimesListProps } from '../pages/AnimesSection';

// Tipos
import { HomeSections, FilterKeys } from '../screens/HomePage';


export type RootStackParamList = {
  Main: undefined,
  AnimesSection: AnimesListProps,
  AnimePage: Anime,
  SearchList: undefined,
  SelectOption: {
    title: HomeSections,
    key: FilterKeys,
    haveExtraContentToLoad: boolean,
    queryParams?: { [key: string]: any }
  }
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export type MainScreenNavigationProp = StackNavigationProp<RootStackParamList,'Main'>;
export type AnimesScreenNavigationProp = StackNavigationProp<RootStackParamList,'AnimesSection'>;
export type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList,'SearchList'>;
export type SelectOptionNavigationProp = StackNavigationProp<RootStackParamList,'SelectOption'>;
export type AnimePageScreenNavigationProp = StackNavigationProp<RootStackParamList,'AnimePage'>;



const AppRoutes: React.FC = () => (
  <Navigator
    initialRouteName="Main"
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
      
    }}
  >
    <Screen name="Main" component={Main}/>
    <Screen name="AnimesSection" component={AnimesSection}/>
    <Screen name="AnimePage" component={AnimePage}/>
    <Screen name="SearchList" component={SearchList}/>
    <Screen name="SelectOption" component={SelectOptionPage}/>
  </Navigator>
)

export default AppRoutes;