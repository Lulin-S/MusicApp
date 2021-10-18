import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const Detail = (props) => {
  return (
    <View style={styles.container}>
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
export default Detail;
