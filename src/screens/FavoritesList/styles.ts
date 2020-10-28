import { StyleSheet } from 'react-native';

import { correctColor, primaryColor, secundaryColor } from '../../global/colors';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  clearListButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: primaryColor
  },
  clearListButtonText: {
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 5,
    color: '#FFF',
  },
  exportButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: '#1da305'
  },
  importButton: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: primaryColor
  },
  list: {
    height: '90%',
    marginVertical: 10
  }
})

export default styles;