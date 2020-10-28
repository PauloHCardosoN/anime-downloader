import { Dimensions, StyleSheet } from 'react-native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e3e3e3',
    paddingTop: getStatusBarHeight(),
    paddingBottom: getStatusBarHeight(),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  buttonsList: {
    maxHeight: Dimensions.get('screen').height / 4,
    borderRadius: 10
  }
});

export default styles;