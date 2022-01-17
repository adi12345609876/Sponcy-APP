import React, {  } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
//components
import AnimatedScroolView from '../components/AnimatedScroolTab';
import Nullprofile from '../Hooks/NullProfile';
import Name from '../components/Name';

//assets
import DummynullProfile from '../assets/Photos/Dummyicon/actualnullimage.png';
import DummyNetflixIcon from '../assets/Photos/Dummyicon/Netflix.png';
import DummyTeslaIcon from '../assets/Photos/Dummyicon/Tesla.png';
//feautures
let deviceWidth = Dimensions.get('screen').width;
let deviceHeight = Dimensions.get('screen').height;

//data
export const Netflixdata = [
  {
    id: 1,
    name: 'Netflix',
    image: DummyNetflixIcon,
    checked: true,
  },
];
export const Tesladata = [
  {
    id: 2,
    name: 'Tesla',
    image: DummyTeslaIcon,
    checked: true,
  },
];
export const Adinathdata = [
  {
    id: 3,
    name: 'Adinath',
    image: null,
    checked: false,
  },
];
const DummyData = [
  {
    title: 'Sponsorer',
    data: [...Netflixdata, ...Tesladata],
  },
  {
    title: 'Sponsoring',
    data: [],
  },
  {
    title: 'Followers',
    data: [...Adinathdata],
  },
  {
    title: 'Following',
    data: [...Tesladata, ...Adinathdata, ...Netflixdata],
  },
];
const Header = ({ heading }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.title}>{heading}</Text>
  </View>
);
const RenderItems = ({ name, image }) => (
  <TouchableOpacity>
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={image ? image : Nullprofile({ name })}
      />
      <Name name={name} />
    </View>
  </TouchableOpacity>
);
export default function AssetExample({ navigation }) {
  return (
    <AnimatedScroolView>
      <View style={styles.container}>
        <FlatList
          data={DummyData}
          renderItem={({ item }) => (
            <View>
              <View
                style={{
                  padding: 10,
                  backgroundColor: '#f1f3f4',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#b7b7b7',
                  }}>
                  {item.title}
                </Text>
              </View>
              <FlatList
                data={item.data}
                horizontal
                ListEmptyComponent={<View style={{ height: 100 }}></View>}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      margin: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 10,
                      marginHorizontal: 15,
                    }}
                    onPress={() => navigation.navigate('Portfolio')}>
                    <Image
                      style={styles.image}
                      source={item.image ? item.image : DummynullProfile}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        />
      </View>
    </AnimatedScroolView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'normal',
  },
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f1f1f1',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 200,
    borderColor: '#fff',
    borderWidth: 2,
  },
});
