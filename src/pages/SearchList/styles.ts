import { StyleSheet } from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

import globalStyles from '../../global/styles';
import { netralColor, primaryColor } from '../../global/colors';

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#e3e3e3',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  container: {
    height: '100%',
    paddingTop: 10
  },
  animesList: {
    marginVertical: 20,
    borderRadius: 120,
    overflow: 'hidden'
  },
 

  categoryButton: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  categoryButtonText: {
    fontFamily: 'Poppins-Medium'
  },
  selectedCategoryButton: {
    paddingVertical: 5 + 2,
    paddingHorizontal: 20 + 2,
    backgroundColor: primaryColor
  },
  selectedCategoryButtonText: {
    color: '#FFF'
  },
  notSelectedCategoryButton: {
    borderWidth: 2,
    borderColor: primaryColor
  },
  notSelectedCategoryButtonText: {
    color: primaryColor
  }
})

export default styles;