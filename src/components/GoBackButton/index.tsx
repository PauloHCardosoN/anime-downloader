import React from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import styles from './styles';

import { primaryColor } from '../../global/colors';

interface props{
  color?: string,
}

const GoBackButton: React.FC<props> = (props) => {
  const { goBack } = useNavigation();

  return (
    <View style={{ flexDirection: 'row' }}>
      <RectButton onPress={goBack} style={[ styles.button ]}>
        <Icon name="chevron-left" style={{ fontSize: 30 }} color={props.color || primaryColor}/>
        <Text style={{ fontSize: 20, color: props.color || primaryColor }}>Voltar</Text>
      </RectButton>
    </View>
  )
}

export default GoBackButton;