import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


// Global
import { wrongColor } from '../../../../../../global/colors';

// Estilos
import styles from './styles';

// Redux
import { store } from '../../../../../../store';
import { useDispatch } from 'react-redux';

interface props{
  id: string
}

const RemoveButton: React.FC<props> = (props) => {
  const { id } = props;
  const width = 40;

  const dispatch = useDispatch<typeof store.dispatch>();

  return (
    <RectButton
      style={[ styles.likeButton, { width, height: width, borderRadius: width / 2 } ]}
      onPress={() => {
        dispatch({
          type: 'UNFAVORITE_ANIME',
          payload: {
            id
          }
        })
      }}
    >
      <Icon
        name="delete"
        size={width - 15}
        color={wrongColor}
      />
    </RectButton>
  )
}

export default RemoveButton;