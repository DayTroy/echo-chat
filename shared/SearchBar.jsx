import { useState } from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
const SearchBar = ({ setSearchQuery }) => {
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        style={styles.searchbar}
        inputStyle={{ fontFamily: "Nunito_400Regular", color: "black" }}
        placeholderTextColor={"black"}
        iconColor="black"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 10,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#52006A",
  },
  searchbar: {
    width: 300,
    backgroundColor: "white",
    boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 3px",
  },
});

export default SearchBar;
