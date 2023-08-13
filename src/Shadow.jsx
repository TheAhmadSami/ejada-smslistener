import {Platform} from 'react-native';

const Shadow = () => {
  return Platform.select({
    ios: {
      shadowColor: 'rgba(0, 0, 0, 0.4)',
      shadowRadius: 2,
      shadowOpacity: 0.4,
      shadowOffset: {width: 0, height: 2},
    },
    android: {
      elevation: 4,
      shadowColor: 'rgba(0, 0, 0, 0.2)',
    },
  });
};

export default Shadow;
