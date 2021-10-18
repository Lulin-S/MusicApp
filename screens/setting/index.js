import React, { useContext } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Switch } from "react-native";
import { ThemeContext } from "../theme/theme-context";

const Setting = (props) => {
  const { navigation } = props;
  const { dark, theme, toggle } = useContext(ThemeContext);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.infoMainContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.personContainer}>
            <Ionicons name="person-outline" size={24} color="white" />
          </View>
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
                fontFamily: "Helvetica Neue",
              }}
            >
              Lulin
            </Text>
            <Text style={{ color: "gray" }}>View Profile</Text>
          </View>
        </View>
        <FontAwesome name="angle-right" size={24} color="white" />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textContainer}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "#ccc", true: "#767577" }}
          thumbColor={dark ? "#f4f3f4" : "#fff"}
          onChange={toggle}
          value={dark}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textContainer}>Data Saver</Text>
        <FontAwesome
          name="angle-right"
          size={24}
          color="white"
          onPress={() => navigation.navigate("Data")}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textContainer}>Account</Text>
        <FontAwesome name="angle-right" size={24} color="white" />
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.textContainer}>Playback</Text>
        <FontAwesome name="angle-right" size={24} color="white" />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textContainer}>Explicit Count</Text>
        <FontAwesome name="angle-right" size={24} color="white" />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textContainer}>Devices</Text>
        <FontAwesome name="angle-right" size={24} color="white" />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textContainer}>Car</Text>
        <FontAwesome name="angle-right" size={24} color="white" />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textContainer}>Social</Text>
        <FontAwesome name="angle-right" size={24} color="white" />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.textContainer}>Connect to Apps</Text>
        <FontAwesome name="angle-right" size={24} color="white" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 18,
    flex: 1,
  },
  infoMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  personContainer: {
    height: 50,
    width: 50,
    borderRadius: 80,
    marginRight: 20,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    lineHeight: 50,
    color: "white",
    fontSize: 15,
    fontFamily: "Helvetica Neue",
  },
});
export default Setting;
