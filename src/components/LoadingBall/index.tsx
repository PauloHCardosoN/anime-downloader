import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

// Global
import { primaryColor } from '../../global/colors';

declare type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Whether to show the indicator or hide it.
   */
  animating?: boolean;
  /**
   * The color of the spinner.
   */
  color?: string;
  /**
   * Size of the indicator.
   */
  size?: 'small' | 'large' | number;
  /**
   * Whether the indicator should hide when not animating.
   */
  hidesWhenStopped?: boolean;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme?: ReactNativePaper.Theme;
};

const LoadingBall: React.FC<Props> = (props: Props) => {
  const color = props.color || primaryColor;

  return (
    <ActivityIndicator
      {...props}
      color={color}
    />
  )
}

export default LoadingBall;