import { StyleSheet } from 'react-native';

import { primaryColor } from '../../global/colors';

const styles = StyleSheet.create({
  title: {
    color: primaryColor,
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
  description: {
    color: 'rgba(0,0,0,0.3)',
    textAlign: 'justify',
    fontFamily: 'Poppins-Medium'
  }
});

export default styles;