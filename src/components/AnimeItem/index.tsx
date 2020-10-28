import React, { useState } from 'react';
import { View, Image, Text, ViewStyle, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Anime } from '../../controllers/AnimesController';

// Estilos
import styles from './styles';

// Tipos
import { AnimesScreenNavigationProp } from '../../routes';

// Componentes
import LikeButton from '../LikeAnimeButton';

// Global
import { netralColor, primaryColor } from '../../global/colors';

interface params extends Anime, ViewStyle{
  containerHeight: number;
}

const AnimeItem: React.FC<params> = (props: params) => {
  const { id, title, description, imageUri, categories, containerHeight } = props;
  const navigation = useNavigation<AnimesScreenNavigationProp>();

  return (
    <RectButton
      style={[ styles.container, props, { height: containerHeight } ]}
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
      <View style={{ flexDirection: 'row', height: containerHeight }}>
        <ImageBackground
          resizeMode="cover"
          height={containerHeight}
          source={{ uri: imageUri }}
          style={[ styles.backgroundImage ]}
        >
          <LikeButton
            id={id}
            title={title}
            description={description}
            categories={categories}
            imageUri={imageUri}
            width={45}
            color={primaryColor}
            style={{ margin: 5, backgroundColor: 'rgba(255,255,255, 0.75)' }}
          />
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