import {StyleSheet} from 'react-native';
import Shadow from './../Shadow';

export default StyleSheet.create({
  messageCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    ...Shadow(),
    marginBottom: 10,
  },

  sender: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },

});
