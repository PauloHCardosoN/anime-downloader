import React from 'react';
import { View, Text, ViewStyle, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


// Estilos
import styles from './styles';

// Tipos
import { Anime } from '../../../../controllers/AnimesController';
import { AnimesScreenNavigationProp } from '../../../../routes';

// Componentes
import RemoveButton from './components/RemoveButton';

interface params extends Anime{
  style?: ViewStyle
}

const height = 250;

const AnimeItem: React.FC<params> = (props: params) => {
  const { id, title, description, imageUri, categories } = props;
  const navigation = useNavigation<AnimesScreenNavigationProp>();

  return (
    <RectButton
      style={[ styles.container, props.style, { height } ]}
      onPress={() => {
        navigation.navigate('AnimePage', {
          id,
          title,
          description,
          imageUri,
          categories
        })
      }}
    >
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <ImageBackground
          resizeMode="cover"
          height={height}
          source={{ uri: imageUri }}
          style={[ styles.backgroundImage ]}
        >
          <RemoveButton id={id}/>
        </ImageBackground>

        <View style={[ styles.textContainer ]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={3}>{description}</Text>
        </View>
      </View>
    </RectButton>
  )
}

export default AnimeItem;