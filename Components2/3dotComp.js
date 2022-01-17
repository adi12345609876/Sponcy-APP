import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import { Card } from 'react-native-paper';

const DummyData = [
  {
    name: 'Settings',
    icon: 'settings-sharp',
    id: '1',
  },
  {
    name: 'Invite',
    icon: 'mail',
    id: '2',
  },
];


export default function AssetExample({ visibility,height,width }) {
  
  const [selectedId, setSelectedId] = useState(null);
  const [pressfunc, setpressfunc] = useState();
  const renderSeparator = () => (
    <View style={{ marginVertical: 3 }}>
      <Divider style={{ width: 1000 }} />
    </View>
  );
  const OnPressFunc = () => {
    selectedId == '1' ? setpressfunc(console.log('1pressed')) : null;
    selectedId == '2' ? setpressfunc(console.log('2pressed')) : null;
  };
  useEffect(() => {
    OnPressFunc();
  });
  const renderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => setSelectedId(item.id)}>
          <Ionicons name={item.icon} size={24} color="black" />
          <View style={{ marginLeft: 10 }}>
            <Text>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <>
      {visibility && (
        <Card style={[styles.Card,{height:height, width: width,}]}>
          <View style={styles.container}>
            <FlatList
              data={DummyData}
              renderItem={renderItem}
              ItemSeparatorComponent={renderSeparator}
            />
          </View>
        </Card>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  Card: {
   
   
    backgroundColor: '#e5e5e5',
    alignSelf: 'flex-start',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  
  },
});
