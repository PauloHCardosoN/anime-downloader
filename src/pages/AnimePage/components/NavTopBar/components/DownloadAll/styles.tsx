import { StyleSheet } from 'react-native';

import { primaryColor } from '../../../../../../global/colors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: primaryColor,
    alignSelf: "center",
    borderRadius: 32,
    justifyContent: "center",
  },
  label: {
    color: '#FFF',
    fontSize: 14,
    textAlign: "center",
    fontFamily: 'Poppins-SemiBold'
  },
});

export default styles;