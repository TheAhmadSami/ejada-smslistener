import {View, Text} from 'react-native';
import React from 'react';

import styles from './MesaageCard.styles';

const MessageCard = ({message}) => {
  const getData = () => {
    const formattedDate = new Date(message?.date)
      .toISOString()
      .replace('T', ' ');

    return formattedDate;
  };

  return (
    <View style={styles.messageCard}>
      <Text style={styles.sender}>{message?.address}</Text>
      <Text style={styles.data}>{getData()}</Text>
      <Text style={styles.message}>{message?.body}</Text>
    </View>
  );
};

export default MessageCard;
