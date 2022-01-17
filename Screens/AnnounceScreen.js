import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
//components
import AnimatedScroolView from '../components/AnimatedScroolTab';
import renderSeparator from '../components/Separator';
//assets
import DummyNetflixIcon from '../assets/Photos/Dummyicon/Netflix.png';
import DummyTeslaIcon from '../assets/Photos/Dummyicon/Tesla.png';
import photo1 from '../assets/Photos/Dummyphotos/photo1.png';
import photo2 from '../assets/Photos/Dummyphotos/photo2.png';
import photo3 from '../assets/Photos/Dummyphotos/Drone.png';
import { Colors } from '../Features/Features';

//screen
import AnnounceItem from '../FlatlistItem/AnnounceItem';
//data
const Netflixdata = {
  id: 1,
  name: 'Netflix',
  image: DummyNetflixIcon,
  checked: true,
};

const Tesladata = {
  id: 2,
  name: 'Tesla',
  image: DummyTeslaIcon,
  checked: true,
};

const Adinathdata = {
  id: 3,
  name: 'Adinath',
  image: null,
  checked: false,
};

const DummyData = [
  {
    ...Tesladata,
    message:
      'Instead of buying the Apple Cloth, Musk recommends getting the Tesla Cyberwhistle!',
    photo: photo1,
    time: '1:01',
  },
  {
    ...Adinathdata,
    message: 'our new app is launchin next month',
    photo: photo2,
    time: '1:02',
  },
  {
    ...Netflixdata,
    message: 'we are interested to support new directors',
    photo: null,
    time: '2 days',
  },
  {
    ...Tesladata,
    message: null,
    photo: photo3,
    time: '3 days',
  },
];
//render

export default function AssetExample() {
  const renderItem = ({ item }) => {
    return (
      <>
        <AnnounceItem
          message={item.message}
          photo={item.photo}
          name={item.name}
          icon={item.image}
          checked={item.checked}
          time={item.time}
          id={item.id}
        />
        
      </>
    );
  };

  return (
    <AnimatedScroolView>
      <View style={styles.container}>
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
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.normalwhite,
    marginBottom: 100,
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});
