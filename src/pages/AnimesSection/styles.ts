import { StyleSheet } from 'react-native';

import { primaryColor } from '../../global/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 20
  },
  title: {
    color: primaryColor,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20
  }
});

export default styles;