import { StyleSheet } from 'react-native';

import { primaryColor } from '../../../../global/colors';

const styles = StyleSheet.create({
  item: {
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.45)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 20
  },
  title: {
    color: '#FFF',
    fontFamily: 'Poppins-Bold'
  },
  downloadButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: primaryColor
  }
});

export default styles;