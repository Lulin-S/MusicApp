import React, { useContext } from "react";
import { Buffer } from "buffer";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { ThemeContext } from "../theme/theme-context";
const audioBookPlaylist = [
  {
    title: "Por una cabeza",
    author: "Carlos Gardel",
    source: "Librivox",
    uri: "https://www.free-scores.com/MP3T/gardel-carlos-por-una-cabeza-17772.mp3",
    imageSource:
      "https://149562642.v2.pressablecdn.com/wp-content/uploads/scent-of-a-woman.jpg",
  },

  {
    title: "Piano Sonata No.14",
    author: "Ludwig van Beethoven",
    source: "Librivox",
    uri: "https://www.free-scores.com/MP3SUPT/uianoui-oniiusan-iyiui-20121110081852.mp3",
    imageSource: "https://f4.bcbits.com/img/a2095919061_16.jpg",
  },
  {
    title: "DRAGONICE",
    author: "Sylvain Guinet",
    source: "Librivox",
    uri: "https://www.free-scores.com/MP3SUPT/leonard-anderson-plays-dragonice-from-guinet-sylvain-780.mp3",
    imageSource:
      "https://images.squarespace-cdn.com/content/v1/5ffd8b856fdcad54337d4c9e/1610572656298-9LRRSCN7QDEE81NQA98M/BABY+ITS+OKAY+ARTWORK+final.jpg?format=2500w",
  },
];
const Home = (props) => {
  const { navigation, route } = props;
  const { theme } = useContext(ThemeContext);
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState("[]");
  const [newRelease, setNewRelease] = useState([
    { name: "", images: '{ url: "" }' },
  ]);
  const [chill, setChill] = useState([
    {
      album: { name: "", images: '{ url: "" }' },
    },
  ]);

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer(
            "4c4f14340ca54b229b12333b68d6cf0f" +
              ":" +
              "6ec8343d56984cd6af58b6d1b7757b5c"
          ).toString("base64"),
      },
      data: "grant_type=client_credentials",
    })
      .then((tokenresponse) => {
        console.log(tokenresponse.data.access_token);
        setToken(tokenresponse.data.access_token);

        axios("https://api.spotify.com/v1/browse/new-releases", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + tokenresponse.data.access_token,
          },
        }).then((trackresponse) => {
          console.log(trackresponse.data.albums.items[0].name);
          setNewRelease(trackresponse.data.albums.items);
        });

        axios(
          "https://api.spotify.com/v1/recommendations?limit=10&market=SE&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + tokenresponse.data.access_token,
            },
          }
        )
          .then((trackresponse) => {
            //console.log(trackresponse.data.tracks[0].album.images);
            setChill(trackresponse.data.tracks);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <ScrollView style={styles.scrollView}>
        <SimpleLineIcons
          style={{ position: "absolute", top: 20, right: 20, zIndex: 1 }}
          name="settings"
          size={22}
          color="white"
          onPress={() => navigation.navigate("Setting")}
        />
        <View
          style={{
            height: 100,
          }}
        >
          <Text style={styles.headerContainer}>New Releases</Text>
        </View>
        <View
          style={{
            height: 180,
          }}
        >
          <FlatList
            numColumns={0}
            data={newRelease}
            keyExtractor={(item, index) => "item" + index}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View>
                <Image
                  style={styles.imgContainer}
                  source={{
                    uri: item.images[1].url,
                  }}
                />

                <Text numberOfLines={1} style={styles.innerText}>
                  {item.name}
                </Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            height: 220,
          }}
        >
          <Text style={styles.headersContainer}>Recently Played</Text>
          <View style={styles.PlayContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PlayBar", audioBookPlaylist[0])
              }
            >
              <Image
                style={styles.imgContainer}
                source={{ uri: audioBookPlaylist[0].imageSource }}
              />
              <Text style={styles.innerText}>{audioBookPlaylist[0].title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PlayBar", audioBookPlaylist[1])
              }
            >
              <Image
                style={styles.imgContainer}
                source={{
                  uri: audioBookPlaylist[1].imageSource,
                }}
              />
              <Text style={styles.innerText}>{audioBookPlaylist[1].title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PlayBar", audioBookPlaylist[2])
              }
            >
              <Image
                style={styles.imgContainer}
                source={{
                  uri: audioBookPlaylist[2].imageSource,
                }}
              />
              <Text style={styles.innerText}>{audioBookPlaylist[2].title}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 220,
          }}
        >
          <Text style={styles.headersContainer}>Featured Lists</Text>
          <View
            style={{
              height: 180,
            }}
          >
            <FlatList
              numColumns={0}
              data={chill}
              keyExtractor={(item, index) => "item" + index}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View>
                  <Image
                    style={styles.imgContainer}
                    source={{
                      uri: item.album.images[1].url,
                    }}
                  />

                  <Text numberOfLines={1} style={styles.innerText}>
                    {item.album.name}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollView: {
    marginHorizontal: 10,
  },

  headerContainer: {
    lineHeight: 130,
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Helvetica",
  },
  headersContainer: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Helvetica",
    marginBottom: 18,
  },
  imgContainer: {
    height: 110,
    width: 110,
    borderRadius: 6,
    marginBottom: 10,
  },
  innerText: {
    width: 120,
    textAlign: "center",
    color: "white",
    fontFamily: "Helvetica",
    fontSize: 12,
  },
  PlayContainer: {
    flexDirection: "row",
  },
});
export default Home;
