import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const Data = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.offSetContainer}>
        <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>
          {isEnabled ? "On" : "Off"}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <Text style={{ color: "gray", marginTop: 20 }}>
        Sets your music quality to low and disables Canvas
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },

  offSetContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default Data;
