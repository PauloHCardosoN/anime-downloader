import { StyleSheet } from 'react-native';

import { primaryColor } from '../../../../global/colors';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderRadius: 5
  },

  backgroundImage: {
    width: 120,
    backgroundColor: '#e3e3e3',
  },

  textContainer: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'stretch',
    justifyContent: 'center'
  },

  title: {
    fontFamily: "Poppins-Medium",
    fontSize: 18
  },

  description: {
    fontFamily: "Poppins-Regular",
    marginTop: 5,
    opacity: 0.5,
    fontSize: 14
  },

  readButton: {
    fontFamily: 'Poppins-SemiBold',
    color: primaryColor
  }
})

export default styles;