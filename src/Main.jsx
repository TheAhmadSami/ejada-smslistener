import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import SmsListener from 'react-native-android-sms-listener';
import SMSAndroid from 'react-native-get-sms-android';
import MessageCard from './MessageCard/MesaageCard';

import './firebase';
import firestore from '@react-native-firebase/firestore';

const Main = () => {
  const collectionName = 'messages';
  const [data, setData] = useState([]);

  const filterMessages = (phoneMessages, dbMessages) => {
    let newMessagesNotInDb = phoneMessages.filter(
      phoneMsg =>
        !dbMessages.some(
          dbMsg =>
            dbMsg.message === phoneMsg.body &&
            dbMsg.sender === phoneMsg.address,
        ),
    );

    return newMessagesNotInDb;
  };

  const addToDatabase = async phoneMessages => {
    if (phoneMessages?.length) {
      const messages = await firestore().collection(collectionName).get();
      const docs = [...messages?.docs];

      let dbMessages = docs?.map(doc => ({
        sender: doc?.data()?.sender,
        message: doc?.data()?.message,
      }));

      let filtredMessages = filterMessages(phoneMessages, dbMessages);

      if (filtredMessages?.length > 0) {
        let newMessages = filtredMessages?.map(item => {
          return {
            sender: item?.address,
            date: new Date(item?.date).toISOString().replace('T', ' '),
            message: item?.body,
          };
        });
        let batch = firestore().batch();
        newMessages.forEach(doc => {
          let docRef = firestore().collection(collectionName).doc(); //automatically generate unique id
          batch.set(docRef, doc);
        });
        batch.commit();
      }
    }
  };

  const getSmsList = () => {
    const filter = {
      box: 'inbox',
      indexFrom: 0,
      minDate: 1691940600,
      maxCount: 100,
    };
    SMSAndroid.list(
      JSON.stringify(filter),
      fail => console.log(fail),
      (count, smsList) => {
        addToDatabase(JSON.parse(smsList));
        setData(JSON.parse(smsList));
      },
    );
  };

  const getPermissions = async () => {
    return await request(
      PERMISSIONS.ANDROID.READ_SMS,
      PERMISSIONS.ANDROID.SEND_SMS,
      PERMISSIONS.ANDROID.RECEIVE_SMS,
    ).then(result => {
      if (result == 'granted') {
        return true;
      } else return false;
    });
  };

  const start = async () => {
    const status = await getPermissions();
    if (status) {
      getSmsList();
      setInterval(() => {
        getSmsList();
      }, 5000);
    } else {
      Alert.alert(
        'Warning!',
        'Please grant SMS permission for the app.',
      );
    }
  };

  useEffect(() => {
    setTimeout(() => {
      start();
    }, 2000);
  }, []);

  return (
    <View style={{flex: 1, padding: 15}}>
      <Text style={{marginBottom: 10, color: '#333'}}>
        Messages {`(${data?.length})`}
      </Text>
      {data?.length > 0 ? (
        <ScrollView style={{flex: 1}}>
          {data?.map((message, i) => (
            <MessageCard key={i} message={message} />
          ))}
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No Messages</Text>
        </View>
      )}
    </View>
  );
};

export default Main;
