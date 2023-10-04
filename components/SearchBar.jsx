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
    />
  );
};

const styles = StyleSheet.create({
  searchbar: {
    borderRadius: 8,
    width: 300,
  },
});

export default SearchBar;
