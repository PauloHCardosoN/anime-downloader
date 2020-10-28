import { StyleSheet } from 'react-native';

import { primaryColor } from '../../global/colors';

const borderRadius = 25;

const styles = StyleSheet.create({
  container: {
    borderRadius,
  },
  textContainer: {
    borderColor: primaryColor,
    borderStyle: 'solid',

    borderRadius,
  },
  text: {
    fontFamily: 'Poppins-SemiBold'
  }
});

export default styles;