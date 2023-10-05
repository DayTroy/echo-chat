import React from "react";
import Card from "../shared/Card";
import { FAB } from "react-native-paper";
import SearchBar from "../shared/SearchBar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  Alert,
} from "react-native";
const Chats = () => {
  const onPressFAB = () => {
    console.log("FAB Pressed");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <SearchBar />
      <View style={styles.cards}>
        <Card />
        <Card />
        <Card />
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={onPressFAB}
        color="black"
        animated={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    position: "relative",
  },
  title: {
    fontFamily: "Nunito_400Regular",
    fontSize: 32,
    fontWeight: "400",
    marginTop: 40,
    marginBottom: 20,
  },
  cards: {
    marginTop: 40,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
  },
});

export default Chats;
