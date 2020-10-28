import React from "react";
import { Text } from "react-native";
import { RectButton, RectButtonProperties } from "react-native-gesture-handler";

// Estilos
import styles from './styles';

interface props extends RectButtonProperties{};

const DownloadAll: React.FC<props> = (props) => {
  const opacity = props.enabled === false ? 0.25 : 1;

  return (
    <RectButton {...props} style={[ styles.button, props.style, { opacity } ]}>
      <Text style={[ styles.label ]}>Baixar todos</Text>
    </RectButton>
  )
}

export default DownloadAll;
