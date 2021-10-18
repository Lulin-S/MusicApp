import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";

function PlayBar({ route }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();

  async function playandpauseSound() {
    if (isPlaying == false) {
      if (sound == null) {
        const { sound } = await Audio.Sound.createAsync({
          uri: route.params.uri,
        });
        setSound(sound);
        await sound.playAsync();
        setIsPlaying(true);
      }
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  //this function is to unload music
  React.useEffect(() => {
    return sound
      ? () => {
          //console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: route.params.imageSource,
        }}
      />

      <View style={styles.TextContainer}>
        <Text
          style={{
            color: "white",
            fontFamily: "Helvetica",
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {route.params.title}
        </Text>
        <Text
          style={{
            color: "white",
            fontFamily: "Helvetica",
            fontSize: 12,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          {route.params.author}
        </Text>
        {/* <Text
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          {route.params.uri}
        </Text> */}
      </View>
      <View style={styles.controls}>
        <TouchableOpacity
          style={{
            marginRight: 60,
          }}
        >
          <FontAwesome5 name="step-backward" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => playandpauseSound()}>
          {isPlaying ? (
            <Ionicons name="ios-pause" size={80} color="white" />
          ) : (
            <Ionicons name="ios-play-circle" size={80} color="white" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 60,
          }}
          onPress={() => alert("")}
        >
          <FontAwesome5 name="step-forward" size={24} color="white" />
        </TouchableOpacity>
        {/* <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={340}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  tinyLogo: {
    width: "100%",
    height: 360,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default PlayBar;
