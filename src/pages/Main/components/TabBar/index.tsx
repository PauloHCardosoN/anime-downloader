import React from 'react';
import { TabBar, SceneRendererProps, Route } from 'react-native-tab-view';
import { Scene } from 'react-native-tab-view/src/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Estilos
import styles from './styles';

// Global
import { primaryColor, netralColor } from '../../../../global/colors';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Text, View } from 'react-native';
import { Props } from 'react-native-tab-view/lib/typescript/src/TabBarItem';


interface props extends Scene<Route>{
  focused: boolean;
  color: string;
}

const TabViewBar = (props: SceneRendererProps, index: number, routes: Route[]) => {
  const renderIcon = (props: props) => {
    const { route } = props;
    
    if(route.icon){
      if(props.focused){
        return (
          <Icon
            name={route.icon}
            size={24}
            color={primaryColor}
          />
        )
      }

      return (
        <Icon
          name={route.icon}
          size={24}
          color={netralColor}
        />
      )
    }
  }

  return (
    <TabBar
      {...props}
      bounces
      activeColor={primaryColor}
      inactiveColor={netralColor}
      renderIcon={renderIcon}
      navigationState={{ index, routes }}
      indicatorStyle={ styles.indicatorStyle }
      pressOpacity={0.6}
      style={{ backgroundColor: '#FFF', paddingBottom: getBottomSpace() / 2 }}
    />
  )
}

export default TabViewBar;