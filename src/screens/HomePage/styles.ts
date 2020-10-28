import { StyleSheet } from 'react-native';

import { primaryColor, secundaryColor } from '../../global/colors';

const styles = StyleSheet.create({
  buttonsList: {
    height: '100%'
  },
  button: {
    position: 'relative',
    flex: 1,
    height: 135,
    alignItems: "center",
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
    marginBottom: 40,
    backgroundColor: '#FFF'
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    width: 50,
    height: 50,
    transform: [
      {
        translateY: -25
      }
    ],
    backgroundColor: secundaryColor,
    borderRadius: 25,
    padding: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    color: '#FFF',
    fontSize: 25
  },
  buttonText: {
    textAlign: 'center',
    color: secundaryColor,
    fontSize: 18
  }
})

export default styles;