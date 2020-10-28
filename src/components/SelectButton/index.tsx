import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { netralColor, primaryColor } from '../../global/colors';

// Estilos
import styles from './styles';

interface props{
  selected?: boolean,
  text: string,
  onPress?: () => any
}

const SelectButton: React.FC<props> = (props) => {
  const { text, onPress } = props;
  const selected = Boolean(props.selected);

  const backgroundColor = selected ? primaryColor : 'transparent';
  const borderWidth = selected ? 0 : 2;
  const color = selected ? '#FFF' : primaryColor;
  
  const containerPadding: ViewStyle = selected
  ? { paddingVertical: 4.5, paddingHorizontal: 12.5 }
  : { paddingVertical: 2.5, paddingHorizontal: 10 };

  return (
    <RectButton onPress={onPress} style={[ styles.container, { backgroundColor }]}>
      <View style={[ styles.textContainer, containerPadding, { borderWidth } ]}>
        <Text style={[ styles.text, { color } ]}>{text}</Text>
      </View>
    </RectButton>
  )
}

export default SelectButton;