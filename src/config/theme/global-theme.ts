import {StyleSheet} from 'react-native';

export const globalTheme = StyleSheet.create({
  globalMargin: {
    marginHorizontal: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    position: 'absolute',
    bottom: 0,
    right: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  searchButtonIcon: {
    borderRadius: 10,
    padding: 5,
  },
});
