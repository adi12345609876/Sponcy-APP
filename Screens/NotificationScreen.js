import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
//components
import AnimatedScroolView from '../components/AnimatedScroolTab';
import NotifyItem from '../FlatlistItem/NotifyItem';
import renderSeparator from "../components/Separator"
//assets

import DummyNetflixIcon from '../assets/Photos/Dummyicon/Netflix.png';
//features
let deviceWidth = Dimensions.get('screen').width;
let deviceHeight = Dimensions.get('screen').height;

//data
const DummyData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    person: 'Adinath',
    profile: null,
    checked: true,
    notifications: '1',
    previousmessage: 'good morning',
    time:"12:01",
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-5af53fgvb234a',
    person: 'Netflix',
    profile: DummyNetflixIcon,
    checked: false,
    notifications: null,
    previousmessage: 'this screen only contain ',
    time:"1:01",
  },
    {
    id: 'bd7acbea-c1b1-46c2-aed5-5af53fgvb234a',
    person: 'Netflix',
    profile: DummyNetflixIcon,
    checked: false,
    notifications: "21",
    previousmessage: 'announce notifcation',
    time:"2 days",
  },
];
//render
  const renderItem = ({ item }) => (
    <NotifyItem
      name={item.person}
      checked={item.checked}
      icon={item.profile}
      notifications={item.notifications}
      previousmessage={item.previousmessage}
    />
  );
export default function AssetExample({navigation}) {

  return (
    <AnimatedScroolView>
    <View style={{
    marginBottom:100

    }}>
      <FlatList
        data={DummyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
      />
      </View>
    </AnimatedScroolView>
  );
}

const styles = StyleSheet.create({
  
});
