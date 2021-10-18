import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { AntDesign, Feather } from "@expo/vector-icons";
import { ThemeContext } from "../theme/theme-context";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from "react-native";

const Search = (props) => {
  const { navigation, route } = props;
  const { theme } = useContext(ThemeContext);
  const [value, onChangeText] = useState();
  const [search, setSearch] = useState({
    name: "",
    followers: { total: "" },
    images: [{ url: "1" }, { url: "2" }],
  });
  const [token, setToken] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const getSearchData = () => {
    setIsSearched(true);
    const query = value;
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

        axios(
          "https://api.spotify.com/v1/search?q=" +
            query +
            "&type=track%2Cartist",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + tokenresponse.data.access_token,
            },
          }
        )
          .then((response) => {
            console.log(response.data.artists.items[0].name);
            setSearch(response.data.artists.items);
            //console.log(search);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.searchContainer}>
        <View>
          <Image
            style={styles.imgContainer}
            source={{
              uri: item.images[1].url,
            }}
          />
        </View>
        <View>
          <Text
            key={item.id}
            style={{
              width: 120,
              textAlign: "center",
              color: "white",
              fontFamily: "Helvetica",
              fontSize: 16,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              width: 120,
              textAlign: "center",
              color: "black",
              fontFamily: "Helvetica",
              fontSize: 12,
            }}
          >
            Followers: {item.followers.total}
          </Text>
        </View>

        <View>
          <AntDesign
            name="right"
            size={24}
            color="black"
            onPress={() => navigation.navigate("Detail")}
          />
        </View>
      </View>
    );
  };
  console.log(theme);
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.mainSearchContainer}>
        <Text style={styles.textContainer}>Search</Text>
        <View style={styles.searchSection}>
          <TextInput
            style={{
              height: 40,
              width: 280,
              backgroundColor: "white",
              borderTopLeftRadius: 6,
              borderBottomStartRadius: 6,
            }}
            onChangeText={(text) => onChangeText(text)}
            value={value}
          />
          <View style={styles.iconContainer}>
            <Feather
              name="search"
              size={24}
              color="black"
              onPress={getSearchData}
            />
          </View>
        </View>
      </View>
      <View>
        <FlatList
          //numColumns={0}
          data={search}
          keyExtractor={(item) => item.id}
          //horizontal={false}
          //showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainSearchContainer: {
    padding: 20,
  },
  searchSection: { flexDirection: "row" },
  iconContainer: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderTopEndRadius: 6,
    borderBottomRightRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Helvetica",

    marginBottom: 10,
  },
  imgContainer: {
    height: 60,
    width: 80,
    borderRadius: 3,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    width: 320,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: "#727272",
    marginLeft: 20,
    padding: 20,
  },
});

export default Search;
