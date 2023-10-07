import { useState } from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet } from "react-native";
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={styles.searchbar}
      inputStyle={{fontFamily: "Nunito_400Regular"}}
    />
  );
};

const styles = StyleSheet.create({
  searchbar: {
    borderRadius: 8,
    width: 300,
    backgroundColor: "rgba(39, 39, 39, 1)",
  },
});

export default SearchBar;
